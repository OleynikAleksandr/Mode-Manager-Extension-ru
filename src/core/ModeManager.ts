import { IMode, IModeManager } from './interfaces';

/**
 * Базовая реализация менеджера режимов.
 * В данном файле будет содержаться основная логика управления режимами.
 * Пока что это только заготовка.
 */
export class ModeManager implements IModeManager {
    private modes: IMode[] = [];
    private activeMode: IMode | undefined;

    constructor() {
        // В конструкторе может быть инициализация,
        // например, загрузка режимов по умолчанию или из конфигурации.
    }

    /**
     * Загружает доступные режимы.
     * На данном этапе это заглушка.
     */
    async loadModes(): Promise<IMode[]> {
        // Здесь будет логика загрузки режимов (например, из файлов конфигурации).
        // Пока возвращаем пустой массив.
        this.modes = []; // Пример
        console.log('ModeManager: Загрузка режимов...');
        return this.modes;
    }

    /**
     * Получает список всех доступных режимов.
     */
    getModes(): IMode[] {
        return this.modes;
    }

    /**
     * Получает режим по его slug.
     */
    getModeBySlug(slug: string): IMode | undefined {
        return this.modes.find(mode => mode.slug === slug);
    }

    /**
     * Устанавливает активный режим.
     * На данном этапе это заглушка.
     */
    async setActiveMode(slug: string): Promise<void> {
        const modeToActivate = this.getModeBySlug(slug);
        if (modeToActivate) {
            this.activeMode = modeToActivate;
            console.log(`ModeManager: Активный режим изменен на "${slug}"`);
        } else {
            console.warn(`ModeManager: Режим с slug "${slug}" не найден.`);
            // Можно выбросить ошибку или обработать иначе
        }
    }

    /**
     * Получает текущий активный режим.
     */
    getActiveMode(): IMode | undefined {
        return this.activeMode;
    }

    // Другие методы, необходимые для управления режимами,
    // могут быть добавлены здесь. Например, методы для регистрации
    // новых режимов, удаления режимов и т.д.
}