import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';

/**
 * Generates the 'roo_modes_list New.md' file in the specified storage path.
 * @param context The extension context.
 * @param storagePath The path to the extension's global storage (root).
 */
export async function generateRooModesListFile(context: vscode.ExtensionContext, storagePath: string) {
    const outputChannel = vscode.window.createOutputChannel('Mode-Manager Generate List', { log: true });
    outputChannel.appendLine(`generateRooModesListFile called for storagePath: ${storagePath}`);
    const listFileName = 'roo_modes_list New.md';
    const listFilePath = path.join(storagePath, listFileName);
    const ruruModesFolderPath = path.join(storagePath, '.ruru', 'modes');

    outputChannel.appendLine(`Target list file: ${listFilePath}`);
    outputChannel.appendLine(`Source modes folder: ${ruruModesFolderPath}`);

    try {
        if (!await fs.pathExists(ruruModesFolderPath)) {
            outputChannel.appendLine(`Error: .ruru/modes directory not found at ${ruruModesFolderPath}. Cannot generate modes list.`);
            console.error(`Mode-Manager-Extension: .ruru/modes directory not found at ${ruruModesFolderPath}`);
            vscode.window.showErrorMessage(`Mode Manager: .ruru/modes directory not found. Cannot generate modes list.`);
            // Attempt to write an error state to the file if directory is missing
            await fs.writeFile(listFilePath, `# Roo Modes List (Error: Source directory .ruru/modes not found at ${ruruModesFolderPath})\n`);
            return;
        }

        const modeEntries = await fs.readdir(ruruModesFolderPath, { withFileTypes: true });
        const modeDirectories = modeEntries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        outputChannel.appendLine(`Found ${modeDirectories.length} potential mode directories: ${modeDirectories.join(', ')}`);

        if (modeDirectories.length === 0) {
            outputChannel.appendLine(`Info: No mode directories found in ${ruruModesFolderPath}. Creating an empty list file.`);
            await fs.writeFile(listFilePath, "# Roo Modes List (No modes found)\n");
            await context.globalState.update('roo_modes_list_path', listFilePath);
            outputChannel.appendLine(`Empty list file created at ${listFilePath}`);
            return;
        }

        const modeListStrings: string[] = [];
        let modeIndex = 1;

        for (const modeDirName of modeDirectories) {
            const modeFileName = `${modeDirName}.mode.md`;
            const modeFilePath = path.join(ruruModesFolderPath, modeDirName, modeFileName);
            outputChannel.appendLine(`Processing mode directory: ${modeDirName}, expecting file: ${modeFilePath}`);

            if (!await fs.pathExists(modeFilePath)) {
                outputChannel.appendLine(`Warning: ${modeFileName} not found in ${path.join(ruruModesFolderPath, modeDirName)}. Skipping this mode.`);
                console.warn(`Mode-Manager-Extension: ${modeFileName} not found in ${path.join(ruruModesFolderPath, modeDirName)}. Skipping.`);
                continue;
            }

            try {
                const modeFileContent = await fs.readFile(modeFilePath, 'utf-8');
                outputChannel.appendLine(`Successfully read ${modeFilePath}`);

                const idMatch = modeFileContent.match(/^\s*id\s*=\s*"([^"]+)"/m);
                const nameMatch = modeFileContent.match(/^\s*name\s*=\s*"([^"]+)"/m);
                const summaryMatch = modeFileContent.match(/^\s*summary\s*=\s*"([^"]+)"/m);

                const parsedId = idMatch ? idMatch[1] : modeDirName;
                const modeName = nameMatch ? nameMatch[1] : modeDirName;
                const modeSummary = summaryMatch ? summaryMatch[1] : "No summary available.";

                outputChannel.appendLine(`Extracted for ${modeDirName}: id='${parsedId}', name='${modeName}', summary='${modeSummary}'`);

                modeListStrings.push(`${modeIndex}. ${modeName} (${parsedId}) - ${modeSummary}`);
                modeIndex++;
            } catch (fileReadError: any) {
                outputChannel.appendLine(`Error reading or parsing file ${modeFilePath}: ${fileReadError.message}`);
                console.error(`Mode-Manager-Extension: Error reading or parsing file ${modeFilePath}:`, fileReadError);
                modeListStrings.push(`${modeIndex}. Error processing mode in ${modeDirName} - Check logs for ${modeFilePath}`);
                modeIndex++;
            }
        }

        const finalContent = modeListStrings.length > 0 ? modeListStrings.join('\n') : "# Roo Modes List (No valid modes found or processed)\n";
        await fs.writeFile(listFilePath, finalContent);
        outputChannel.appendLine(`Successfully generated and wrote ${listFileName} to: ${listFilePath} with ${modeListStrings.length} modes listed.`);
        console.log(`Mode-Manager-Extension: Successfully generated ${listFileName} at ${listFilePath}`);
        await context.globalState.update('roo_modes_list_path', listFilePath);

    } catch (error: any) {
        outputChannel.appendLine(`Error in generateRooModesListFile: ${error.message}`);
        console.error("Mode-Manager-Extension: Error in generateRooModesListFile", error);
        vscode.window.showErrorMessage(`Mode Manager: Failed to generate modes list. ${error.message}`);
        try {
            await fs.writeFile(listFilePath, `# Roo Modes List (Error during generation)\n\nError: ${error.message}\n`);
            outputChannel.appendLine(`Wrote error state to ${listFilePath} due to generation failure.`);
        } catch (writeError: any) {
            outputChannel.appendLine(`Critical: Failed to write error state to ${listFilePath} after a generation error: ${writeError.message}`);
            console.error(`Mode-Manager-Extension: Critical - Failed to write error state to ${listFilePath}`, writeError);
        }
    }
}