import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Mode {
    id: string;
    slug: string;
    nameWithIcon: string;
    icon?: string;
    name: string;
}

interface SortableModeChipProps {
    mode: Mode;
}

export function SortableModeChip({ mode }: SortableModeChipProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging, // Добавим isDragging для стилизации
    } = useSortable({ id: mode.id }); // Используем mode.id, так как он уникален для UI

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1, // Делаем перетаскиваемый элемент полупрозрачным
        cursor: 'grab',
        // Дополнительные стили можно добавить здесь или через CSS классы
    };

    return (
        <span
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="selected-mode-chip" // Используем существующий класс для базовых стилей
            data-slug={mode.slug}
        >
            {mode.icon ? `${mode.icon} ` : ''}{mode.name}
        </span>
    );
}