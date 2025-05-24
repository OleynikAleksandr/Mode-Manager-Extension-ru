+++
# --- Basic Metadata ---
id = "KB-SPEC-REPOMIX-DECISION-TREE-V1"
title = "KB: Repomix Input Source Decision Tree"
context_type = "kb"
scope = "Decision logic for Repomix Specialist input analysis"
target_audience = ["spec-repomix"]
granularity = "detailed"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "spec-repomix", "decision-tree", "input-analysis", "clarification", "repomix"]
related_context = [
    ".roo/rules-spec-repomix/01-repomix-workflow.md",
    ".ruru/modes/spec-repomix/spec-repomix.mode.md"
]
template_schema_doc = ".ruru/templates/toml-md/15_ai_kb.README.md"
relevance = "Critical: Guides the mode's initial interaction and tool selection."
+++

# KB: Repomix Input Source Decision Tree

**Objective:** To determine the type of source provided by the user (local path, remote URL) and guide clarification if needed, before invoking the appropriate `repomix` MCP tool.

**Applies To:** `spec-repomix` mode during Step 2 of the workflow defined in `.roo/rules-spec-repomix/01-repomix-workflow.md`.

**Decision Logic:**

1.  **Analyze Input String:** Examine the input string provided by the user/coordinator.
2.  **Check for URL Pattern:**
    *   Does the string look like a URL (e.g., starts with `http://`, `https://`, `git@`, or contains `github.com`, `gitlab.com`, etc.)?
        *   **YES:** Assume **Remote URL**. Proceed to Step 3.
        *   **NO:** Assume **Local Path**. Proceed to Step 4.
3.  **Remote URL Handling:**
    *   The source type is **Remote URL**.
    *   The `pack_remote_repository` MCP tool will be used.
    *   No further clarification is typically needed unless the user *also* provided conflicting local path information or ambiguous filtering instructions.
    *   Proceed to Step 3 (Select & Prepare MCP Tool Call) in the main workflow rule.
4.  **Local Path Handling:**
    *   The source type is **Local Path**.
    *   The `pack_codebase` MCP tool will be used.
    *   **Crucially, this tool requires an *absolute* path.**
    *   **Check if Path is Absolute:**
        *   Does the path start with `/` (Linux/macOS) or a drive letter like `C:\` (Windows)?
            *   **YES:** Assume it's an absolute path. Proceed to Step 3 (Select & Prepare MCP Tool Call) in the main workflow rule.
            *   **NO:** The path is relative. Attempt resolution or ask for clarification.
                *   **Attempt Resolution (Optional but Recommended):** Try to construct the absolute path based on the workspace root (`/home/jez/vscode/roo-commander`) and the provided relative path. Use the `repomix` MCP's `file_system_read_directory` tool on the *resolved parent directory* to verify its existence. If verification succeeds, use the resolved absolute path.
                *   **Ask for Clarification (If Resolution Fails or Skipped):** Use `ask_followup_question`.
                    *   **Question:** "The path '[relative_path]' seems to be a local path, but `repomix` requires an absolute path. Please provide the full absolute path to the directory you want to package."
                    *   **Suggestions:**
                        *   Suggest a likely absolute path based on the workspace root (e.g., `/home/jez/vscode/roo-commander/[relative_path]`).
                        *   Suggest confirming the path manually.
                    *   Await user response before proceeding. Once the absolute path is confirmed, proceed to Step 3 (Select & Prepare MCP Tool Call) in the main workflow rule.

**Clarification for Filters (Optional):**

*   If the user provides ambiguous filtering instructions (e.g., "ignore tests" without specifying patterns), use `ask_followup_question` to request specific glob patterns for `includePatterns` or `ignorePatterns`.
    *   **Question:** "Could you please provide the specific glob patterns for the files/directories you want to include or exclude? For example, `includePatterns: \"**/*.ts\"` or `ignorePatterns: \"tests/**,*.log\"`."

By following this tree, the mode can reliably determine the source type and gather the necessary information (especially the absolute path for local directories) before calling the `repomix` MCP tools.