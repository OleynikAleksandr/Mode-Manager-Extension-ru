# Mode‑Manager for Roo Code

An extension for VS Code that adds mode management functionality to Roo Code.

## Description

Mode-Manager allows Roo Code users to easily switch between different working modes, load new modes from archives, and manage existing ones. This extension simplifies the configuration and customization of Roo Code for specific tasks and developer preferences.

## Supported VS Code Versions

*   VS Code 1.80.0 and above.

## Installation

1.  Download the latest version of the extension in `.vsix` format from the [releases page](https://github.com/OleynikAleksandr/Mode-Manager-Extension-ru/releases/tag/v0.3.5-ru).
2.  Open VS Code.
3.  Go to the Extensions view (Ctrl+Shift+X).
4.  Click the three dots (...) in the upper right corner of the Extensions view.
5.  Select "Install from VSIX..."
6.  Specify the path to the downloaded `.vsix` file and click "Install".
7.  After installation, restart VS Code.

## Usage

After installing the extension:

*   **Opening the UI:**
    *   An extension icon "Mode Manager" will appear on the Activity Bar in VS Code.
    *   Clicking this icon will open a small side panel with the "Open Mode Manager" button.
    *   Clicking this button will open the main extension interface in a new editor tab.
    *   You can also open the UI via the Command Palette (Ctrl+Shift+P) by entering "Mode Manager: Open Panel".
*   **Automatic component initialization:** On first launch, the necessary Roo Code components (directories `.roo`, `.ruru`, the `.roomodes` file, and mode lists `roo_modes_list_en.md` and `roo_modes_list_ru.md`) are automatically copied from the extension into its global storage.
*   **Working with the UI:**
    *   **Language selection:** A language switcher (EN/RU) is available in the interface to display the list of modes.
    *   **Selecting modes:** You can select the required modes from the list by ticking their checkboxes.
    *   **Changing the order of modes:** The selected modes are displayed as chips at the top of the UI. You can rearrange these chips via drag-and-drop. This order will be saved in the `.roomodes` file in your workspace.
    *   **Applying changes:** After selecting and arranging modes, click the "Apply" button. The selected configurations (relevant files and folders from `.roo`, `.ruru`, and an updated `.roomodes` reflecting the selected modes and their order) will be copied/created in the root of your current workspace. The `.roomodes` file in your workspace will only contain the selected modes, and their physical order in the file will match the order set in the UI.

## Plans and Architecture

*   [Development Plan for the Mode‑Manager Extension for Roo Code](d:/004_ROO/Arhive/План%20разработки%20расширения%20Mode‑Manager%20для%20Roo%20Code.md)
*   Architectural decisions will be documented here as the project evolves.

## Contributing

Contributor instructions will be added later.

## License

To be determined later.