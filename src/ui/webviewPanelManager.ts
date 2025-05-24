import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
// Roo: Removed ArchiveLoader import as it's no longer used
import { handleApplyModeChanges } from '../core/workspaceModifier'; // Adjusted import path
import { generateRooModesListFile } from '../core/modeListGenerator'; // Roo: Added import

// Roo: Removed HandleLoadRooCommanderArchiveFunction type
// Roo: Removed GenerateRooModesListFileFunction type

let currentWebviewPanel: vscode.WebviewPanel | undefined;

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview): string {
    const htmlFilePath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui_dist', 'index.html');
    let htmlContent = fs.readFileSync(htmlFilePath.fsPath, 'utf8');
    const nonce = getNonce();

    // CSP: разрешаем стили и скрипты из webview.cspSource (что включает наши localResourceRoots),
    // а также 'unsafe-inline' для стилей, если они будут инлайновыми (Vite может так делать для мелких стилей).
    // Для скриптов используем nonce для основного бандла Vite.
    const csp = `default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource} 'nonce-${nonce}'; font-src ${webview.cspSource}; connect-src ${webview.cspSource};`;
    console.log("Generated CSP for Vite:", csp);

    htmlContent = htmlContent.replace(
        '<head>',
        `<head>
    <meta http-equiv="Content-Security-Policy" content="${csp}">`
    );

    // Vite генерирует пути к ресурсам относительно index.html.
    // Мы должны преобразовать их в webview URI.
    // Пример: <script type="module" crossorigin src="/assets/index-CD74b8Vz.js"></script>
    //         <link rel="stylesheet" crossorigin href="/assets/index-D_UVv7S-.css">
    // Обработаем <script> и <link> теги, которые Vite вставляет.

    // Обновленное регулярное выражение для обработки путей, начинающихся с / или ./
    htmlContent = htmlContent.replace(/(src|href)="(\.?\/assets\/[^"]+)"/g, (match, attr, assetPathWithDot) => {
        // Удаляем начальную точку, если она есть, чтобы получить чистый путь относительно ui_dist
        const cleanAssetPath = assetPathWithDot.startsWith('./') ? assetPathWithDot.substring(2) : assetPathWithDot;
        const assetDiskPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui_dist', cleanAssetPath);
        const assetWebviewUri = webview.asWebviewUri(assetDiskPath);
        console.log(`Replacing asset path: Original: ${assetPathWithDot}, Cleaned: ${cleanAssetPath}, Webview URI: ${assetWebviewUri.toString()}`); // Добавим лог
        return `${attr}="${assetWebviewUri.toString()}"`;
    });

    // Добавляем nonce к главному скрипту Vite (который обычно имеет type="module")
    // Ищем <script type="module" src="..."></script>
    htmlContent = htmlContent.replace(
        /(<script type="module"[^>]*src="[^"]*")>/g,
        `$1 nonce="${nonce}">`
    );

    return htmlContent;
}

export async function createAndShowWebviewPanel(
    context: vscode.ExtensionContext
    // Roo: Removed archiveLoaderInstance parameter
    // Roo: Removed handleLoadRooCommanderArchive parameter
    // generateRooModesListFile is now imported directly
    // handleApplyModeChanges is imported directly
) {
    console.log('Mode-Manager-Extension (webviewPanelManager): createAndShowWebviewPanel called.');
    const storagePath = context.globalStorageUri.fsPath;
    // Roo: Paths to components in globalStorage, should always exist due to new logic in extension.ts activate
    // Roo: Default to English mode list. Language switching will be handled later.
    const defaultModesListFileName = 'roo_modes_list_en.md';
    const modesListFilePath = path.join(storagePath, defaultModesListFileName);

    // Roo: Logic for generating 'roo_modes_list New.md' is removed.
    // The new files are copied during extension activation.
    // We now just check if the default English list file exists.
    const modesListExists = await fs.pathExists(modesListFilePath);

    if (!modesListExists) {
        vscode.window.showErrorMessage(`Mode Manager: '${defaultModesListFileName}' not found in ${storagePath}. Cannot display modes. Please ensure the extension installed correctly.`);
        console.error(`Mode-Manager-Extension (webviewPanelManager): File ${defaultModesListFileName} not found at path: ${modesListFilePath}`);
        return; // Critical if list cannot be found
    }

    const column = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    if (currentWebviewPanel) {
        currentWebviewPanel.reveal(column);
        return;
    }

    currentWebviewPanel = vscode.window.createWebviewPanel(
        'modeManagerView',
        'Roo Code Mode Management',
        column || vscode.ViewColumn.One,
        {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(context.extensionUri, 'out', 'ui_dist')
            ]
        }
    );

    currentWebviewPanel.webview.html = getWebviewContent(context, currentWebviewPanel.webview);

    // Load initial data
    await loadAndSendData(currentWebviewPanel, context, 'en');

    // Handle messages from the webview
    currentWebviewPanel.webview.onDidReceiveMessage(
        async message => {
            switch (message.command) {
                case 'applyModeChanges':
                    console.log('Mode-Manager-Extension (webviewPanelManager): Received mode changes:', message.selectedModes);
                    await handleApplyModeChanges(context, message.selectedModes, currentWebviewPanel);
                    return;
                case 'cancelModeChanges':
                    console.log('Mode-Manager-Extension (webviewPanelManager): Mode changes cancelled. Closing panel.');
                    if (currentWebviewPanel) {
                        currentWebviewPanel.dispose();
                    }
                    return;
                case 'webviewReady':
                    console.log('Mode-Manager-Extension (webviewPanelManager): Webview is ready to receive data.');
                    // Initial load is handled after panel creation, this confirms webview is listening.
                    return;
                case 'requestModeList':
                    console.log(`Mode-Manager-Extension (webviewPanelManager): Received request for mode list in language: ${message.lang}`);
                    try {
                        const lang = message.lang === 'ru' ? 'ru' : 'en'; // Sanitize lang
                        const requestedModesListFileName = `roo_modes_list_${lang}.md`;
                        // Retrieve path from globalState, falling back to constructing it if not found (though it should be there)
                        let requestedModesListFilePath = context.globalState.get<string>(`roo_modes_list_${lang}_path`);
                        if (!requestedModesListFilePath) {
                            console.warn(`Path for roo_modes_list_${lang}.md not found in globalState, constructing from globalStorageUri.`);
                            requestedModesListFilePath = path.join(context.globalStorageUri.fsPath, requestedModesListFileName);
                        }

                        if (await fs.pathExists(requestedModesListFilePath)) {
                            const modesContent = await fs.readFile(requestedModesListFilePath, 'utf-8');
                            currentWebviewPanel?.webview.postMessage({
                                command: 'loadModes',
                                data: modesContent,
                                // For language switch, we might want to re-evaluate selected modes
                                // or just refresh the list and let the UI handle selection state.
                                // For now, sending empty to force UI to re-evaluate based on current workspace .roomodes if needed,
                                // or the UI will parse 'data' and determine available modes.
                                // The primary 'selectedModesOrdered' is sent on initial load.
                                selectedModesOrdered: [], // This might need adjustment based on how UI handles lang switch + selection
                                language: lang
                            });
                        } else {
                            console.error(`Mode-Manager-Extension (webviewPanelManager): File ${requestedModesListFileName} not found at path: ${requestedModesListFilePath}`);
                            currentWebviewPanel?.webview.postMessage({
                                command: 'loadModesError',
                                message: `Failed to load mode list (${requestedModesListFileName} not found).`
                            });
                        }
                    } catch (e: any) {
                        console.error(`Mode-Manager-Extension (webviewPanelManager): Error reading ${message.lang} mode list file:`, e);
                        currentWebviewPanel?.webview.postMessage({
                            command: 'loadModesError',
                            message: `Error reading mode list file for language ${message.lang}.`
                        });
                    }
                    return;
                // Roo: Removed 'loadRooCommanderArchive' case, as this functionality is being removed.
            }
        },
        undefined,
        context.subscriptions
    );

    // Handle panel visibility changes
    currentWebviewPanel.onDidChangeViewState(
        async e => {
            const panel = e.webviewPanel;
            if (panel.visible) {
                console.log('Mode-Manager-Extension (webviewPanelManager): Panel became visible. Reloading data.');
                // Reload data, defaulting to 'en'. UI can request specific lang if needed.
                await loadAndSendData(panel, context, 'en');
            }
        },
        null,
        context.subscriptions
    );

    currentWebviewPanel.onDidDispose(
        () => {
            currentWebviewPanel = undefined;
        },
        null,
        context.subscriptions
    );
}

// Helper function to load and send data to the webview
async function loadAndSendData(panel: vscode.WebviewPanel, context: vscode.ExtensionContext, language: 'en' | 'ru') {
    const storagePath = context.globalStorageUri.fsPath;
    const modesListFileName = `roo_modes_list_${language}.md`;
    const modesListFilePath = path.join(storagePath, modesListFileName);

    console.log(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Attempting to load mode list for webview from: ${modesListFilePath}`);

    try {
        if (await fs.pathExists(modesListFilePath)) {
            const modesContent = await fs.readFile(modesListFilePath, 'utf-8');
            let initiallySelectedModesOrdered: Array<{ slug: string, order: number }> = [];

            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
                const workspaceRoomodesPath = path.join(workspaceRoot, '.roomodes');
                console.log(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Checking for .roomodes at ${workspaceRoomodesPath}`);
                if (await fs.pathExists(workspaceRoomodesPath)) {
                    try {
                        const roomodesFileContent = await fs.readFile(workspaceRoomodesPath, 'utf-8');
                        const parsedRoomodes = JSON.parse(roomodesFileContent);
                        if (parsedRoomodes && Array.isArray(parsedRoomodes.customModes)) {
                            initiallySelectedModesOrdered = parsedRoomodes.customModes
                                .map((mode: any, index: number) => {
                                    if (mode && typeof mode.slug === 'string') {
                                        return { slug: mode.slug, order: index };
                                    }
                                    return null;
                                })
                                .filter((item: { slug: string, order: number } | null): item is { slug: string, order: number } => item !== null);
                            console.log(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Loaded modes with order from ${workspaceRoomodesPath}:`, initiallySelectedModesOrdered);
                        } else {
                            console.warn(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): .roomodes file at ${workspaceRoomodesPath} does not have a 'customModes' array.`);
                        }
                    } catch (err) {
                        console.error(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Error reading or parsing ${workspaceRoomodesPath}:`, err);
                    }
                } else {
                    console.log(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): File ${workspaceRoomodesPath} not found.`);
                }
            } else {
                console.log('Mode-Manager-Extension (webviewPanelManager - loadAndSendData): No workspace folder open.');
            }

            console.log(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Posting 'loadModes' to webview. Language: ${language}, Selected Modes Ordered:`, initiallySelectedModesOrdered, "Data length:", modesContent?.length);
            panel.webview.postMessage({ command: 'loadModes', data: modesContent, selectedModesOrdered: initiallySelectedModesOrdered, language: language });
        } else {
            console.error(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): File ${modesListFileName} not found at path: ${modesListFilePath}`);
            vscode.window.showErrorMessage(`File ${modesListFileName} not found.`);
            panel.webview.postMessage({ command: 'loadModesError', message: `Failed to load mode list (${modesListFileName} not found).` });
        }
    } catch (e: any) {
        console.error(`Mode-Manager-Extension (webviewPanelManager - loadAndSendData): Error reading ${modesListFileName}:`, e);
        vscode.window.showErrorMessage('Error reading mode list file.');
        panel.webview.postMessage({ command: 'loadModesError', message: 'Error reading mode list file.' });
    }
}

export function disposeCurrentWebviewPanel() {
    if (currentWebviewPanel) {
        currentWebviewPanel.dispose();
        currentWebviewPanel = undefined;
    }
}

export function isWebviewPanelVisible(): boolean {
    return !!currentWebviewPanel;
}