// Заготовка для вспомогательных функций (утилит) расширения Mode-Manager.

/**
 * Пример простой утилиты.
 * @param text Входная строка.
 * @returns Строка в верхнем регистре.
 */
export function toUpperCaseUtility(text: string): string {
    return text.toUpperCase();
}

/**
 * Еще одна примерная утилита для логирования.
 * @param level Уровень логирования ('info', 'warn', 'error').
 * @param message Сообщение для логирования.
 */
export function logUtility(level: 'info' | 'warn' | 'error', message: string): void {
    const prefix = `[Mode-Manager-Extension Utils] [${level.toUpperCase()}]`;
    if (level === 'error') {
        console.error(`${prefix}: ${message}`);
    } else if (level === 'warn') {
        console.warn(`${prefix}: ${message}`);
    } else {
        console.log(`${prefix}: ${message}`);
    }
}

// Другие полезные утилиты могут быть добавлены сюда:
// - Работа с файловой системой (чтение/запись JSON, проверка путей и т.д.)
// - Валидация данных
// - Форматирование строк
// - и т.п.

console.log('Mode-Manager-Extension: utils/index.ts loaded');