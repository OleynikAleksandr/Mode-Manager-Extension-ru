+++
# --- Basic Metadata ---
id = "RULE-SPEC-REPOMIX-WORKFLOW-V1"
title = "Rule: Repomix Specialist MCP Workflow"
context_type = "rules"
scope = "Defines the primary workflow for the Repomix Specialist using the MCP server"
target_audience = ["spec-repomix"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "spec-repomix", "mcp", "workflow", "repomix", "fallback"]
related_context = [
    ".ruru/modes/spec-repomix/spec-repomix.mode.md",
    ".ruru/modes/spec-repomix/kb/01-decision-tree.md", # Decision logic
    ".ruru/modes/agent-mcp-manager/kb/install-repomix.md", # Fallback reference
    ".roo/rules/01-standard-toml-md-format.md",
    ".roo/rules/11-session-management.md" # For potential logging/artifact use
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Defines the core operational logic for the Repomix Specialist."
+++

# Rule: Repomix Specialist MCP Workflow

**Objective:** To package a code repository (local or remote) into a consolidated context file using the `repomix` MCP server, save the output, and handle potential MCP failures.

**Applies To:** `spec-repomix` mode.

**Procedure:**

1.  **Receive Request:** Obtain the target source (local path or remote URL) and any optional filtering parameters (`includePatterns`, `ignorePatterns`) from the user or coordinator.
2.  **Analyze Input & Clarify:**
    *   Consult the decision tree logic defined in the KB: `.ruru/modes/spec-repomix/kb/01-decision-tree.md`.
    *   Determine the source type (local, remote repo, remote subdir).
    *   If ambiguous, use `ask_followup_question` to clarify with the user, providing relevant options based on the KB. Store the clarified source type and any filter parameters.
3.  **Select & Prepare MCP Tool Call:**
    *   **If Source is Remote URL (Repo or Subdir):**
        *   Tool: `pack_remote_repository`
        *   Server: `repomix`
        *   Arguments:
            *   `remote`: The validated remote URL.
            *   `includePatterns` (optional): User-provided include patterns string.
            *   `ignorePatterns` (optional): User-provided ignore patterns string.
            *   *(Other optional params like `compress`, `topFilesLength` can be added if needed/requested)*.
    *   **If Source is Local Path:**
        *   Tool: `pack_codebase`
        *   Server: `repomix`
        *   Arguments:
            *   `directory`: The **absolute path** to the local directory.
                *   *Note:* If the provided path is relative, **MUST** attempt to resolve it to an absolute path first. Consider using the `repomix` MCP's `file_system_read_directory` tool on the *parent* directory to help confirm existence and potentially construct the absolute path based on the workspace root (`/home/jez/vscode/roo-commander`). If resolution fails, ask the user for the absolute path.
            *   `includePatterns` (optional): User-provided include patterns string.
            *   `ignorePatterns` (optional): User-provided ignore patterns string.
            *   *(Other optional params like `compress`, `topFilesLength` can be added if needed/requested)*.
4.  **Execute Pack Tool (`use_mcp_tool`):**
    *   Invoke the selected `use_mcp_tool` (`pack_remote_repository` or `pack_codebase`) with the prepared arguments.
    *   **Await Result:** Wait for the MCP tool execution result.
    *   **Handle Failure (Fallback):**
        *   If the `use_mcp_tool` call fails (e.g., connection error, tool execution error reported by MCP):
            1.  Log the failure (if session active, Rule `11`).
            2.  Initiate fallback by using `new_task` to delegate to `agent-mcp-manager`.
            3.  The message **MUST** be: "Please guide the user to configure the 'repomix' MCP server using the npx method. Refer to the KB at `.ruru/modes/agent-mcp-manager/kb/install-repomix.md`."
            4.  Use `attempt_completion` to report the delegation and the reason (MCP failure) to the coordinator.
            5.  **STOP** further processing in this workflow.
5.  **Retrieve Output (`use_mcp_tool`):**
    *   If the pack tool succeeded, extract the `outputId` from the result.
    *   Tool: `read_repomix_output`
    *   Server: `repomix`
    *   Arguments:
        *   `outputId`: The ID received from the successful pack tool call.
    *   Invoke the `use_mcp_tool` call.
    *   **Await Result:** Wait for the MCP tool execution result.
    *   **Handle Failure (Fallback):**
        *   If the `read_repomix_output` call fails:
            1.  Log the failure (if session active).
            2.  Initiate the same fallback procedure as in Step 4 (delegate to `agent-mcp-manager`).
            3.  Use `attempt_completion` to report the delegation and reason.
            4.  **STOP** further processing.
6.  **Save Output (`write_to_file`):**
    *   If `read_repomix_output` succeeded, extract the consolidated content from the result.
    *   Generate a timestamp (e.g., `YYYYMMDDHHMMSS`).
    *   Sanitize the original source name (e.g., repo name `my-repo`, local dir name `src`) into `sanitized_name`.
    *   Construct the output path: `.ruru/context/repomix_output_[sanitized_name]_[timestamp].md`.
    *   Use `write_to_file` with the constructed path and the retrieved content.
    *   Calculate the line count for the content.
    *   **Await Result:** Wait for the file write result.
    *   **Handle Failure:** If `write_to_file` fails, report the error using `attempt_completion`. **STOP**.
7.  **Report Completion:**
    *   If `write_to_file` succeeded:
        *   Log success (if session active).
        *   Use `attempt_completion` to report success to the coordinator.
        *   The result message **MUST** include the full path to the saved context file (e.g., "Successfully packaged repository and saved context to `.ruru/context/repomix_output_my-repo_20250505215500.md`.").

**Important Considerations:**

*   **Absolute Paths:** The `pack_codebase` tool requires an absolute path. Robust path resolution is crucial.
*   **Error Handling:** The primary error handling is the fallback to `agent-mcp-manager`. Deeper diagnostics are out of scope for this specialist.
*   **Output Location:** Strictly adhere to saving the final output in the `.ruru/context/` directory.