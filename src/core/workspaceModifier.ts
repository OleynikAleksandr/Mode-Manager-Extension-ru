import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';

export async function handleApplyModeChanges(
    context: vscode.ExtensionContext,
    selectedModesWithOrder: Array<{ slug: string, order: number }>,
    panel?: vscode.WebviewPanel
) {
    const outputChannel = vscode.window.createOutputChannel('Mode-Manager Apply');
    outputChannel.show(true); // Ensure the output channel is visible
    outputChannel.clear(); // Clear previous logs
    outputChannel.appendLine('Starting Apply process...');
    outputChannel.appendLine(`Received selectedModesWithOrder from UI: ${JSON.stringify(selectedModesWithOrder)}`);

    // Extract just slugs for parts of the code that still expect an array of slugs
    const selectedSlugs = selectedModesWithOrder.map(item => item.slug);
    outputChannel.appendLine(`Extracted slugs for processing: ${JSON.stringify(selectedSlugs)}`);

    const rooPathValue = context.globalState.get<string>('rooCommander_rooPath');
    const ruruPathValue = context.globalState.get<string>('rooCommander_ruruPath');
    const roomodesPathValue = context.globalState.get<string>('rooCommander_roomodesPath');

    outputChannel.appendLine(`Retrieved paths from globalState:`);
    outputChannel.appendLine(`  .roo globalStorage path: ${rooPathValue}`);
    outputChannel.appendLine(`  .ruru globalStorage path: ${ruruPathValue}`);
    outputChannel.appendLine(`  .roomodes globalStorage path: ${roomodesPathValue}`);

    if (!rooPathValue || !ruruPathValue || !roomodesPathValue) {
        const errorMessage = 'Error: One or more required paths (.roo, .ruru, .roomodes) not found in globalState. Please ensure components are initialized correctly.';
        outputChannel.appendLine(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
        return;
    }

    outputChannel.appendLine(`Checking existence of globalStorage paths...`);
    if (!await fs.pathExists(rooPathValue)) {
        outputChannel.appendLine(`Error: Source .roo path does not exist: ${rooPathValue}`);
        vscode.window.showErrorMessage(`Source .roo path does not exist: ${rooPathValue}`);
        return;
    }
    if (!await fs.pathExists(ruruPathValue)) {
        outputChannel.appendLine(`Error: Source .ruru path does not exist: ${ruruPathValue}`);
        vscode.window.showErrorMessage(`Source .ruru path does not exist: ${ruruPathValue}`);
        return;
    }
    if (!await fs.pathExists(roomodesPathValue)) {
        outputChannel.appendLine(`Error: Source .roomodes file does not exist: ${roomodesPathValue}`);
        vscode.window.showErrorMessage(`Source .roomodes file does not exist: ${roomodesPathValue}`);
        return;
    }
    outputChannel.appendLine(`All globalStorage paths exist.`);

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        const errorMessage = 'Error: No workspace folder open. Please open a workspace to apply modes.';
        outputChannel.appendLine(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
        return;
    }
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    outputChannel.appendLine(`Workspace root: ${workspaceRoot}`);

    const targetRooPath = path.join(workspaceRoot, '.roo');
    const targetRuruPath = path.join(workspaceRoot, '.ruru');
    const targetRoomodesPath = path.join(workspaceRoot, '.roomodes');

    outputChannel.appendLine(`Target paths in workspace:`);
    outputChannel.appendLine(`  .roo: ${targetRooPath}`);
    outputChannel.appendLine(`  .ruru: ${targetRuruPath}`);
    outputChannel.appendLine(`  .roomodes: ${targetRoomodesPath}`);

    let proceedWithOverwrite = true;
    if (await fs.pathExists(targetRooPath) || await fs.pathExists(targetRuruPath) || await fs.pathExists(targetRoomodesPath)) {
        outputChannel.appendLine('Found existing .roo, .ruru, or .roomodes in workspace. Prompting user for overwrite confirmation...');
        const warningMessage = 'The .roo, .ruru, or .roomodes file/folders already exist in the workspace. Applying will overwrite them. Do you want to continue?';
        const confirmation = await vscode.window.showWarningMessage(warningMessage, { modal: true }, 'Yes', 'No');
        if (confirmation !== 'Yes') {
            outputChannel.appendLine('User cancelled overwrite operation.');
            vscode.window.showInformationMessage('Apply operation cancelled by user.');
            proceedWithOverwrite = false;
        } else {
            outputChannel.appendLine('User confirmed overwrite.');
        }
    }

    if (!proceedWithOverwrite) {
        return;
    }

    try {
        outputChannel.appendLine('Proceeding with Apply operation (removing existing targets if they exist)...');
        if (await fs.pathExists(targetRooPath)) {
            outputChannel.appendLine(`Removing existing ${targetRooPath}...`);
            await fs.remove(targetRooPath);
        }
        if (await fs.pathExists(targetRuruPath)) {
            outputChannel.appendLine(`Removing existing ${targetRuruPath}...`);
            await fs.remove(targetRuruPath);
        }
        if (await fs.pathExists(targetRoomodesPath)) {
            outputChannel.appendLine(`Removing existing ${targetRoomodesPath}...`);
            await fs.remove(targetRoomodesPath);
        }
        outputChannel.appendLine('Removal of existing targets complete (if any).');

        outputChannel.appendLine(`Generating new .roomodes file...`);
        const originalRoomodesContent = await fs.readFile(roomodesPathValue, 'utf-8');
        outputChannel.appendLine(`Read original .roomodes content from ${roomodesPathValue} (length: ${originalRoomodesContent.length})`);

        const newRoomodesContentParts: string[] = [];
        let parsedOriginalRoomodes: any[];

        try {
            const parsedJson = JSON.parse(originalRoomodesContent);
            if (parsedJson && Array.isArray(parsedJson.customModes)) {
                parsedOriginalRoomodes = parsedJson.customModes;
                outputChannel.appendLine(`Successfully parsed .customModes from original .roomodes. Found ${parsedOriginalRoomodes.length} modes.`);
            } else {
                outputChannel.appendLine(`Warning: '.customModes' array not found or not an array in parsed .roomodes. Will attempt direct array parse.`);
                // Try parsing as a direct array if .customModes is not found
                if (Array.isArray(parsedJson)) {
                    parsedOriginalRoomodes = parsedJson;
                    outputChannel.appendLine(`Successfully parsed original .roomodes as a direct array. Found ${parsedOriginalRoomodes.length} modes.`);
                } else {
                    parsedOriginalRoomodes = [];
                    outputChannel.appendLine(`Error: Could not parse original .roomodes as a JSON object with 'customModes' array or as a direct array. Treating as empty.`);
                }
            }
        } catch (e: any) {
            outputChannel.appendLine(`Critical Error parsing original .roomodes as JSON: ${e.message}. Cannot generate new .roomodes correctly.`);
            parsedOriginalRoomodes = [];
        }

        outputChannel.appendLine(`Constructing new .roomodes based on UI selection and order: ${JSON.stringify(selectedModesWithOrder)}`);

        if (Array.isArray(parsedOriginalRoomodes)) {
            // Create a map of original modes for quick lookup by slug
            const originalModesMap = new Map<string, any>();
            parsedOriginalRoomodes.forEach(mode => {
                if (mode && typeof mode.slug === 'string') {
                    originalModesMap.set(mode.slug, mode);
                }
            });

            // Iterate through the modes selected in the UI, in the order they were provided
            selectedModesWithOrder.forEach(selectedModeInfo => {
                const originalMode = originalModesMap.get(selectedModeInfo.slug);
                if (originalMode) {
                    outputChannel.appendLine(`  Processing selected mode: slug='${selectedModeInfo.slug}' (UI order: ${selectedModeInfo.order})`);
                    // Create a new object, copying all properties from originalMode
                    // Then delete 'order' and 'enabled' if they exist, as they are no longer used in the file
                    // The 'order' from selectedModeInfo is implicitly handled by the iteration order here.
                    const { order, enabled, ...cleanedMode } = originalMode;

                    newRoomodesContentParts.push(JSON.stringify(cleanedMode, null, 2));
                    outputChannel.appendLine(`    Added mode '${selectedModeInfo.slug}' to new .roomodes (without 'order' and 'enabled' fields).`);
                } else {
                    outputChannel.appendLine(`  Warning: Selected mode slug '${selectedModeInfo.slug}' not found in original .roomodes. Skipping.`);
                }
            });
        }

        if (newRoomodesContentParts.length > 0) {
            const finalNewRoomodesContent = `{\n  "customModes": [\n${newRoomodesContentParts.join(',\n')}\n  ]\n}`;
            await fs.writeFile(targetRoomodesPath, finalNewRoomodesContent);
            outputChannel.appendLine(`New .roomodes file created at ${targetRoomodesPath} with ${newRoomodesContentParts.length} modes.`);
        } else {
            outputChannel.appendLine(`Warning: No modes selected or no matching slugs found. New .roomodes file will be created with an empty 'customModes' array.`);
            await fs.writeFile(targetRoomodesPath, `{\n  "customModes": []\n}`);
        }

        outputChannel.appendLine(`Copying .roo structure...`);
        await fs.ensureDir(targetRooPath);
        const rooRulesSourcePath = path.join(rooPathValue, 'rules');
        const rooRulesTargetPath = path.join(targetRooPath, 'rules');
        if (await fs.pathExists(rooRulesSourcePath)) {
            await fs.copy(rooRulesSourcePath, rooRulesTargetPath);
            outputChannel.appendLine(`Copied ${rooRulesSourcePath} to ${rooRulesTargetPath}`);
        } else {
            outputChannel.appendLine(`Warning: Source .roo/rules not found at ${rooRulesSourcePath}`);
        }
        for (const slug of selectedSlugs) { // Use extracted selectedSlugs here
            const slugRuleSourcePath = path.join(rooPathValue, `rules-${slug}`);
            const slugRuleTargetPath = path.join(targetRooPath, `rules-${slug}`);
            outputChannel.appendLine(`  Attempting to copy rules for slug '${slug}': from ${slugRuleSourcePath}`);
            if (await fs.pathExists(slugRuleSourcePath)) {
                await fs.copy(slugRuleSourcePath, slugRuleTargetPath);
                outputChannel.appendLine(`    Copied ${slugRuleSourcePath} to ${slugRuleTargetPath}`);
            } else {
                outputChannel.appendLine(`    Info: Optional rules-${slug} folder not found at ${slugRuleSourcePath}. Skipping.`);
            }
        }
        const mcpJsonSourcePath = path.join(rooPathValue, 'mcp.json');
        const mcpJsonTargetPath = path.join(targetRooPath, 'mcp.json');
        if (await fs.pathExists(mcpJsonSourcePath)) {
            await fs.copy(mcpJsonSourcePath, mcpJsonTargetPath);
            outputChannel.appendLine(`Copied ${mcpJsonSourcePath} to ${mcpJsonTargetPath}`);
        } else {
            outputChannel.appendLine(`Warning: Source .roo/mcp.json not found at ${mcpJsonSourcePath}`);
        }

        outputChannel.appendLine(`Copying .ruru structure...`);
        await fs.ensureDir(targetRuruPath);

        const ruruSourceItems = await fs.readdir(ruruPathValue);
        outputChannel.appendLine(`Found items in source .ruru (${ruruPathValue}): ${ruruSourceItems.join(', ')}`);
        for (const item of ruruSourceItems) {
            if (item.toLowerCase() !== 'modes') {
                const sourceItemPath = path.join(ruruPathValue, item);
                const targetItemPath = path.join(targetRuruPath, item);
                outputChannel.appendLine(`  Copying .ruru/${item} from ${sourceItemPath} to ${targetItemPath}`);
                await fs.copy(sourceItemPath, targetItemPath, { overwrite: true });
            } else {
                outputChannel.appendLine(`  Skipping 'modes' directory during general .ruru copy.`);
            }
        }

        const ruruModesSourceBasePath = path.join(ruruPathValue, 'modes');
        const ruruModesTargetBasePath = path.join(targetRuruPath, 'modes');
        await fs.ensureDir(ruruModesTargetBasePath);
        outputChannel.appendLine(`Ensured target .ruru/modes directory exists: ${ruruModesTargetBasePath}`);

        if (await fs.pathExists(ruruModesSourceBasePath)) {
            outputChannel.appendLine(`Source .ruru/modes directory found: ${ruruModesSourceBasePath}. Processing selected slugs...`);
            for (const slug of selectedSlugs) { // Use extracted selectedSlugs here
                const slugModeSourcePath = path.join(ruruModesSourceBasePath, slug);
                const slugModeTargetPath = path.join(ruruModesTargetBasePath, slug);
                outputChannel.appendLine(`    Attempting to copy mode '${slug}': from ${slugModeSourcePath}`);
                if (await fs.pathExists(slugModeSourcePath)) {
                    await fs.copy(slugModeSourcePath, slugModeTargetPath);
                    outputChannel.appendLine(`      Copied .ruru/modes/${slug} to ${slugModeTargetPath}`);
                } else {
                    outputChannel.appendLine(`      Info: Optional .ruru/modes/${slug} folder not found at ${slugModeSourcePath}. Skipping.`);
                }
            }
        } else {
            outputChannel.appendLine(`Warning: Source .ruru/modes folder not found at ${ruruModesSourceBasePath}`);
        }

        vscode.window.showInformationMessage('Mode Manager: Selected modes applied successfully to the workspace!');
        outputChannel.appendLine('Apply process completed successfully.');

    } catch (error: any) {
        const errorMessage = `Error during Apply operation: ${error.message}\n${error.stack}`;
        outputChannel.appendLine(errorMessage);
        console.error(error);
        vscode.window.showErrorMessage(`Error during Apply operation: ${error.message}. See output channel "Mode-Manager Apply" for more details.`);
    }
}