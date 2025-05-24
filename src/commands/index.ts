// Точка входа для всех команд расширения Mode-Manager.
// Здесь можно будет регистрировать и экспортировать команды.

// import { MyNewCommand } from './my-new-command'; // Пример импорта команды

/**
 * Массив для хранения всех зарегистрированных команд.
 * Это может быть полезно для управления командами централизованно.
 */
// const allCommands = [
//   new MyNewCommand(),
//   // ...другие команды
// ];

/**
 * Функция для регистрации всех команд в VS Code.
 * Эту функцию можно вызвать при активации расширения.
 * @param context - Контекст расширения VS Code.
 */
// export function registerCommands(context: vscode.ExtensionContext) {
//   allCommands.forEach(command => {
//     const disposable = vscode.commands.registerCommand(command.id, async (...args: any[]) => {
//       try {
//         return await command.execute(...args);
//       } catch (error) {
//         console.error(`Ошибка при выполнении команды "${command.id}":`, error);
//         vscode.window.showErrorMessage(`Ошибка команды ${command.name}: ${error.message}`);
//       }
//     });
//     context.subscriptions.push(disposable);
//   });
//   console.log('Mode-Manager-Extension: Команды зарегистрированы.');
// }

// На данном этапе это просто заглушка.
// Потребуется импорт `vscode` и определение команд.
console.log('Mode-Manager-Extension: commands/index.ts loaded');