// Главный файл экспорта для модуля Mode-Manager в расширении.
// Отсюда будут экспортироваться основные классы, интерфейсы и функции.

import { ModeManager } from './core/ModeManager'; // Явный импорт для использования внутри файла

export * from './core/interfaces';
export * from './core/ModeManager';

// По мере развития здесь могут появиться экспорты для команд, UI компонентов и утилит.
// Например:
// export * from './commands';
// export * from './ui';
// export * from './utils';

console.log('Mode-Manager-Extension: module loaded'); // Для отладки при инициализации

/**
 * Функция для инициализации и конфигурации ModeManager в контексте расширения.
 * Может быть вызвана при активации расширения.
 */
export async function initializeModeManagerLogic(): Promise<ModeManager> {
    // Здесь может быть логика создания экземпляра ModeManager,
    // загрузки режимов и другой начальной настройки.
    const modeManager = new ModeManager();
    await modeManager.loadModes();
    // Дальнейшие действия с modeManager, если необходимо
    console.log('Mode-Manager-Extension: ModeManager initialized and modes loaded.');
    return modeManager;
}