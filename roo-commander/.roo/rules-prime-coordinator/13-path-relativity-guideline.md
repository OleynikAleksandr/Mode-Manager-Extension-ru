+++
id = "PRIME-RULE-PATH-RELATIVITY-V1"
title = "Prime Coordinator: Guideline - Workspace-Relative Paths"
context_type = "rules"
scope = "Ensuring correct path references when generating/editing configuration"
target_audience = ["prime-coordinator"]
granularity = "guideline"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "guideline", "paths", "configuration", "relativity", "workspace", "prime"]
related_context = [
    ".roo/rules/01-standard-toml-md-format.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Prevents errors due to incorrect path resolution in generated/edited config files"
+++

# Guideline: Workspace-Relative Paths in Configuration

**Objective:** To ensure all file path references within configuration files (especially in arrays like `context_sources`, `related_context`, `allowed_file_patterns`, etc.) generated or modified by Prime Coordinator are consistently relative to the workspace root directory (`{{WORKSPACE_ROOT}}`).

**Rule:**

1.  **Mandatory Workspace Relativity:** When generating content for configuration files (e.g., `.mode.md`, `.rule.md`, `.workflow.md`, `.sop.md`), all file and directory paths specified within TOML frontmatter or Markdown content **MUST** be relative to the workspace root.
2.  **Valid Starting Points:** Paths should typically start with:
    *   `.ruru/`
    *   `.roo/`
    *   `./` (for files/dirs directly within the workspace root)
    *   Or another top-level directory within the workspace.
3.  **Forbidden Navigation:** Paths **MUST NOT** use `../` to navigate up the directory tree relative to the *target* configuration file's location. All paths must resolve correctly when interpreted from the workspace root.
4.  **Verification:** Before writing or applying changes containing file paths to configuration files, double-check that all paths adhere to this workspace-relative standard.

**Rationale:**

*   **Consistency:** Ensures a single, unambiguous way to reference files across the system.
*   **Tooling:** Simplifies parsing and resolution for tools that operate from the workspace root.
*   **Maintainability:** Reduces confusion when moving or refactoring configuration files.

Adherence to this standard is crucial for the stability and correct operation of Roo Commander.

5.  **CRITICAL PRE-OUTPUT CHECK:** Before generating the final content for `write_to_file` or `apply_diff` that includes paths in fields like `context_sources` or `related_context`, **explicitly verify** that all generated paths conform to points 1, 2, and 3 of this rule. Do not output content with incorrect relative paths.