import * as vscode from 'vscode';

export class ActivityBarViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'modeManagerActivityBarView'; // Должен совпадать с ID view в package.json

    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'openModeManagerPanel': {
                    vscode.commands.executeCommand('mode-manager-extension.openPanel');
                    break;
                }
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const nonce = getNonce();

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
                <title>Mode Manager Action</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: var(--vscode-sideBar-background, #252526);
                        color: var(--vscode-sideBarTitle-foreground, #bbbbbb);
                        font-family: var(--vscode-font-family);
                        box-sizing: border-box;
                    }
                    button {
                        padding: 8px 12px; /* Сделал чуть компактнее */
                        font-size: var(--vscode-font-size);
                        line-height: normal; /* Для лучшего выравнивания текста */
                        border: 1px solid var(--vscode-button-border, var(--vscode-contrastBorder, transparent));
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        cursor: pointer;
                        border-radius: 3px;
                        width: calc(100% - 20px); /* Чтобы кнопка не прилипала к краям, если панель узкая */
                        margin: 10px;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    button:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                </style>
            </head>
            <body>
                <button id="openPanelButton">Open Mode Manager</button>
                <script nonce="${nonce}">
                    (function() {
                        const vscode = acquireVsCodeApi();
                        const button = document.getElementById('openPanelButton');
                        if (button) {
                            button.addEventListener('click', () => {
                                vscode.postMessage({ type: 'openModeManagerPanel' });
                            });
                        }
                    }());
                </script>
            </body>
            </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}