import React, { useState, useEffect, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy, // Используем горизонтальную стратегию для плашек
} from '@dnd-kit/sortable';
import { SortableModeChip } from './components/SortableModeChip'; // Импортируем наш новый компонент

// --- Типы ---
interface Mode {
    id: string;
    slug: string;
    fullText: string;
    nameWithIcon: string;
    description: string;
    icon?: string;
    name: string;
}

interface VSCodeApi {
    postMessage(message: any): void;
    getState(): any;
    setState(newState: any): void;
}

// @ts-ignore
const vscode: VSCodeApi = acquireVsCodeApi();

// --- Вспомогательные функции ---
function parseModes(listContent: string): Mode[] {
    if (!listContent || typeof listContent !== 'string') {
        console.warn('parseModes: listContent is null, undefined, or not a string. Returning empty array.');
        return [];
    }
    const modes: Mode[] = [];
    const lines = listContent.split('\n');
    /*
     * Учитываем все варианты дефиса: обычный '-', en-dash '–', em-dash '—'.
     * Это гарантирует корректный парсинг строк в разных локализациях.
     */
    const modeRegex = /^\s*(\d+)\.\s*(?:([\u2000-\u3300\uE000-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\s]+?)\s+)?(.+?)\s+\(([^)]+)\)\s*[-–—]\s*(.+)/;

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        const match = line.match(modeRegex);
        const id = `mode-line-${index}`;
        if (match) {
            const icon = match[2] ? match[2].trim() : undefined;
            const name = match[3].trim();
            const slug = match[4].trim();
            const description = match[5].trim();
            const nameWithIcon = icon ? `${icon} ${name}` : name;
            modes.push({ id, slug, fullText: line, nameWithIcon, description, icon, name });
        } else {
            console.warn(`Line did not match regex for slug extraction: "${line}". Creating a basic entry without slug.`);
            const fallbackSlug = `unknown-slug-${index}`;
            // Упрощённый регекс тоже расширяем
            const simpleModeRegex = /^\s*(\d+)\.\s*(?:([\u2000-\u3300\uE000-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\s]+?)\s+)?(.+?)\s*[-–—]\s*(.+)/;
            const simpleMatch = line.match(simpleModeRegex);
            if (simpleMatch) {
                const icon = simpleMatch[2] ? simpleMatch[2].trim() : undefined;
                const name = simpleMatch[3].trim();
                const description = simpleMatch[4].trim();
                const nameWithIcon = icon ? `${icon} ${name}` : name;
                modes.push({ id, slug: fallbackSlug, fullText: line, nameWithIcon, description, icon, name });
            } else {
                modes.push({ id, slug: fallbackSlug, fullText: line, nameWithIcon: line, description: '', name: line });
            }
        }
    });
    return modes;
}


function App() {
    const [modesData, setModesData] = useState<Mode[]>([]);
    const [currentSelectedModeIds, setCurrentSelectedModeIds] = useState<Set<string>>(new Set());
    const [orderedSelectedModeObjects, setOrderedSelectedModeObjects] = useState<Mode[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [initialSelectedModeIds, setInitialSelectedModeIds] = useState<Set<string>>(new Set());
    const [initialOrderedSelectedModeObjects, setInitialOrderedSelectedModeObjects] = useState<Mode[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);


    const MOCK_MODES_DATA_FALLBACK = `
# Roo Modes List (Fallback)

## Roo Modes

1. **👑 Roo Commander (roo-commander)** - Fallback description.
2. **💻 Code (code)** - Fallback description.
`;

    const updateButtonStates = useCallback(() => {
        // Логика сравнения initial и current состояний для активности кнопок
        // Для простоты пока всегда активны, если есть изменения
        const selectionChanged = initialSelectedModeIds.size !== currentSelectedModeIds.size ||
            ![...initialSelectedModeIds].every(id => currentSelectedModeIds.has(id));

        const orderChanged = initialOrderedSelectedModeObjects.length !== orderedSelectedModeObjects.length ||
            !initialOrderedSelectedModeObjects.every((mode, index) => orderedSelectedModeObjects[index]?.slug === mode.slug);

        return selectionChanged || orderChanged;
    }, [initialSelectedModeIds, currentSelectedModeIds, initialOrderedSelectedModeObjects, orderedSelectedModeObjects]);


    useEffect(() => {
        vscode.postMessage({ command: 'webviewReady' });
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            console.log('React App: Received message:', message);
            switch (message.command) {
                case 'loadModes':
                    setIsLoading(false);
                    setError(null);
                    const parsed = parseModes(message.data);
                    console.log('React App: Parsed modes data:', parsed); // <-- Новый лог
                    setModesData(parsed);
                    setCurrentLanguage(message.language || 'en');

                    if (firstLoad) {
                        console.log('React App: First load, processing selectedModesOrdered:', message.selectedModesOrdered);
                        const initialIds = new Set<string>();
                        const tempOrderedObjects: Array<{ mode: Mode, order: number }> = [];

                        (message.selectedModesOrdered || []).forEach((item: { slug: string, order: number }) => {
                            const mode = parsed.find(m => m.slug === item.slug);
                            if (mode) {
                                initialIds.add(mode.id);
                                tempOrderedObjects.push({ mode, order: item.order });
                            }
                        });

                        // Sort by the 'order' received from backend (which is the physical file order)
                        tempOrderedObjects.sort((a, b) => a.order - b.order);
                        const initialOrderedObjects = tempOrderedObjects.map(item => item.mode);

                        console.log('React App: Initial IDs for selection:', initialIds);
                        console.log('React App: Initial ordered objects for chips:', initialOrderedObjects);
                        setCurrentSelectedModeIds(new Set(initialIds));
                        setOrderedSelectedModeObjects([...initialOrderedObjects]);
                        setInitialSelectedModeIds(new Set(initialIds));
                        setInitialOrderedSelectedModeObjects([...initialOrderedObjects]);
                        setFirstLoad(false);
                        console.log('React App: First load processed.');
                    } else if (message.language !== currentLanguage) {
                        console.log('React App: Language changed, re-applying selection.'); // <-- Новый лог
                        // Re-apply selection based on slugs if language changes
                        const previouslySelectedOrderedSlugs = orderedSelectedModeObjects.map(m => m.slug);
                        const newCurrentIds = new Set<string>();
                        const newOrderedObjects: Mode[] = [];
                        previouslySelectedOrderedSlugs.forEach(slug => {
                            const mode = parsed.find(m => m.slug === slug);
                            if (mode) {
                                newCurrentIds.add(mode.id);
                                if (!newOrderedObjects.find(m => m.id === mode.id)) {
                                    newOrderedObjects.push(mode);
                                }
                            }
                        });
                        setCurrentSelectedModeIds(newCurrentIds);
                        setOrderedSelectedModeObjects(newOrderedObjects);
                    }
                    break;
                case 'loadModesError':
                    setIsLoading(false);
                    setError(message.message || 'Unknown error loading modes.');
                    setModesData(parseModes(MOCK_MODES_DATA_FALLBACK)); // Load fallback
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [firstLoad, currentLanguage, orderedSelectedModeObjects]); // Убрал MOCK_MODES_DATA_FALLBACK из зависимостей

    const handleSelectionChange = (modeId: string, isSelected: boolean) => {
        const modeObject = modesData.find(m => m.id === modeId);
        if (!modeObject) return;

        setCurrentSelectedModeIds(prev => {
            const newSet = new Set(prev);
            if (isSelected) {
                newSet.add(modeId);
            } else {
                newSet.delete(modeId);
            }
            return newSet;
        });

        setOrderedSelectedModeObjects(prevOrdered => {
            if (isSelected) {
                if (!prevOrdered.find(m => m.id === modeId)) {
                    return [...prevOrdered, modeObject];
                }
                return prevOrdered;
            } else {
                return prevOrdered.filter(m => m.id !== modeId);
            }
        });
    };

    const handleApply = () => {
        const selectedModesWithOrder = orderedSelectedModeObjects.map((mode, index) => ({
            slug: mode.slug,
            order: index // Порядок теперь определяется индексом в orderedSelectedModeObjects
        }));
        vscode.postMessage({
            command: 'applyModeChanges',
            selectedModes: selectedModesWithOrder
        });
        setInitialSelectedModeIds(new Set(currentSelectedModeIds));
        setInitialOrderedSelectedModeObjects([...orderedSelectedModeObjects]);
    };

    const handleCancel = () => {
        setCurrentSelectedModeIds(new Set(initialSelectedModeIds));
        setOrderedSelectedModeObjects([...initialOrderedSelectedModeObjects]);
        vscode.postMessage({ command: 'cancelModeChanges' });
    };

    const handleLanguageChange = (lang: 'en' | 'ru') => {
        if (currentLanguage !== lang) {
            const currentSlugsOrder = orderedSelectedModeObjects.map(m => m.slug);
            vscode.postMessage({ command: 'requestModeList', lang: lang, currentOrder: currentSlugsOrder });
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setOrderedSelectedModeObjects((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }, []);

    const canApplyOrCancel = updateButtonStates();

    if (isLoading) {
        return <div>Loading modes...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="container">
            <header>
                <h1>Roo Code Custom Modes</h1>
                <div className="selection-summary">
                    <p>Selected: <span id="selected-count">{orderedSelectedModeObjects.length}</span> Modes:</p>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={orderedSelectedModeObjects.map(mode => mode.id)} // Передаем массив ID
                            strategy={horizontalListSortingStrategy}
                        >
                            <div id="selected-names-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '2px' }}> {/* Уменьшил marginTop для компактности */}
                                {orderedSelectedModeObjects.map(mode => (
                                    <SortableModeChip key={mode.id} mode={mode} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
                {/* Language switcher will be moved to footer */}
            </header>
            <main>
                <div id="modes-list" className="modes-list">
                    {modesData.map(mode => (
                        <div
                            key={mode.id}
                            className={`mode-item ${currentSelectedModeIds.has(mode.id) ? 'selected' : ''}`}
                            onClick={() => handleSelectionChange(mode.id, !currentSelectedModeIds.has(mode.id))}
                        >
                            <input
                                type="checkbox"
                                id={`chk-${mode.id}`}
                                checked={currentSelectedModeIds.has(mode.id)}
                                onChange={(e) => handleSelectionChange(mode.id, e.target.checked)}
                                onClick={(e) => e.stopPropagation()} // Предотвращаем двойное срабатывание от div
                                aria-label={`Select mode ${mode.nameWithIcon}`} // Добавляем aria-label
                            />
                            <div className="mode-content">
                                <span className="mode-name-display">{mode.nameWithIcon}</span>
                                <span className="mode-description-display"> - {mode.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer>
                <div className="language-switcher">
                    <label htmlFor="lang-toggle">Language:</label>
                    <button onClick={() => handleLanguageChange('en')} className={currentLanguage === 'en' ? 'active lang-button' : 'lang-button'}>EN</button>
                    <button onClick={() => handleLanguageChange('ru')} className={currentLanguage === 'ru' ? 'active lang-button' : 'lang-button'}>RU</button>
                </div>
                <div className="action-buttons">
                    <button id="apply-button" onClick={handleApply} disabled={!canApplyOrCancel}>Apply</button>
                    <button id="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </footer>
        </div>
    );
}

export default App;