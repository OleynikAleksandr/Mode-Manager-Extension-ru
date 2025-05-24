# Changelog

All significant changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.4] - 2025-05-24

### Added

*   **Activity Bar icon (restored):** The extension icon on the Activity Bar has been restored.
    *   Clicking the icon now opens a small side panel (WebviewView) containing the "Open Mode Manager" button.
    *   Clicking this button launches the `mode-manager-extension.openPanel` command, which opens the main UI of the extension (Webview Panel).
    *   This resolves the "No data provider" issue by providing an entry point via the Activity Bar.
*   **Mode order management:** The UI now includes (or refines) the ability to change the order of selected modes by dragging and dropping their chips at the top of the interface. This order directly affects the physical sequence of modes in the generated `.roomodes` file in the workspace.

### Changed

*   **Optimized `package.json`:** Redundant activation events (`onCommand:mode-manager-extension.openPanel` and `onView:modeManagerActivityBarView`) have been removed from the `activationEvents` field, as VS Code generates them automatically based on declarations in the `contributes` section.

### Fixed

*   **Warning in `package.json`:** The `icon` property has been added for the `modeManagerActivityBarView` view in the `contributes.views` section, addressing the "Missing property icon" warning. The same icon as the container (`images/Icon.png`) is used.

## [0.3.3] - 2025-05-24

### Changed

*   **UI:** The top and bottom footers have been made more compact.
    *   **Top footer:** The text "Selected: {count} Modes:" is now displayed on a single line (in a `<p>` tag), and the selected mode chips are placed below it.
    *   **Bottom footer:** The language switcher ("Language: EN RU") has been moved to the left. The "Apply" and "Cancel" buttons remain on the right. Elements are vertically aligned. The active language button is highlighted in blue.
*   **UI Access:** The extension icon was removed from the Activity Bar as it did not directly open the Webview panel and led to a "No data provider" error. UI access is now available via the command palette (`Mode Manager: Open Panel`).

## [0.3.2] - 2025-05-24

### Fixed

*   Fixed an issue where the user interface (UI) did not update correctly (showed "Loading modes...") after the webview panel lost and regained focus. Now, data reloads every time the panel is displayed.

## [0.3.1] - 2025-05-24

### Changed

*   **Adaptation for the original Roo Code version:** This extension version has been modified to work correctly with the original (non-forked) Roo Code.
    *   The `.roomodes` file created in the workspace no longer contains the `enabled` and `order` fields inside mode objects.
    *   A mode is considered active if it is present in the `.roomodes` file.
    *   The order of modes (for UI and for resource copying logic) is determined by the physical order of mode objects in the `customModes` array of the `.roomodes` file.
*   Updated the logic for reading and writing `.roomodes` in `workspaceModifier.ts`, `webviewPanelManager.ts`, and `App.tsx` to reflect these changes.