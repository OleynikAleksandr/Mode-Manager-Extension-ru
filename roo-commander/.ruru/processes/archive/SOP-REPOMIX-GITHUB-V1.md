+++
# --- Basic Metadata ---
id = "SOP-REPOMIX-GITHUB-V2.0" # Incremented version
title = "SOP: Repomix GitHub Source Processing via MCP Server" # Updated Title
status = "active"
created_date = "2025-05-03"
updated_date = "2025-05-05" # Updated date
version = "2.0" # Incremented version
tags = ["sop", "workflow", "repomix", "github", "spec-repomix", "error-handling", "mcp"] # Added mcp tag
template_schema_doc = ".ruru/templates/toml-md/15_sop.README.md"

# --- Ownership & Context ---
# author = "Prime Coordinator"
owner = "Roo Commander"
related_docs = [
    ".roo/rules-spec-repomix/02-repomix-decision-tree.md", # Keep if still relevant for decision logic
    ".ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md", # Keep if relevant for output interpretation
    ".ruru/modes/agent-mcp-manager/kb/install-repomix.md", # Added for fallback
    # Add reference to repomix MCP server definition if available
    ]
# related_tasks = []

# --- SOP Specific Fields ---
objective = "To define the standard procedure for the `spec-repomix` mode to process GitHub URL sources (both full repositories and specific subfolders) reliably using the `repomix` MCP server." # Updated objective
scope = "This SOP applies exclusively when the `spec-repomix` mode identifies the input source as a GitHub URL. It covers attempting to use the `repomix` MCP server's `pack_remote_repository` and `read_repomix_output` tools. It includes error handling for MCP failures, involving delegation to `agent-mcp-manager` for configuration guidance." # Updated scope
roles = ["spec-repomix", "agent-mcp-manager"] # Added agent-mcp-manager

# --- AI Interaction Hints (Optional) ---
# context_type = "process_definition"
# target_audience = ["spec-repomix"]
# granularity = "detailed"
+++

# SOP: Repomix GitHub Source Processing via MCP Server

## 1. Objective 🎯

*   To standardize the process for `spec-repomix` to handle GitHub repository URLs, correctly identifying and processing either the entire repository or specific subfolders within it, using the `repomix` MCP server **as the primary method**.
*   To define a clear fallback procedure involving `agent-mcp-manager` if the MCP server is unavailable or fails.

## 2. Scope Boundaries ↔️

*   **In Scope:** Processing `https://github.com/...` URLs provided as input to `spec-repomix`. Attempting to use the `repomix` MCP server via `use_mcp_tool` (`pack_remote_repository`, `read_repomix_output`). Handling MCP tool call failures by delegating to `agent-mcp-manager`. Interpreting the output from `read_repomix_output`.
*   **Out of Scope:** Processing local filesystem paths (covered by `SOP-REPOMIX-LOCAL-V1.md`). Processing non-GitHub URLs. Direct execution of `repomix` via CLI (`execute_command`). Manual cloning of repositories. Manual creation of configuration files. Handling private repositories requiring authentication (MCP tool is expected to handle this or fail gracefully).

## 3. Roles & Responsibilities 👤

*   **`spec-repomix`:**
    *   Identify the input as a GitHub URL.
    *   Attempt to use the `repomix` MCP server's `pack_remote_repository` tool, passing the URL and any specified include/exclude patterns.
    *   If successful, capture the `outputId`.
    *   Attempt to use the `repomix` MCP server's `read_repomix_output` tool with the `outputId`.
    *   Handle the retrieved content or report success.
    *   If any MCP tool call fails, initiate the fallback procedure (delegate to `agent-mcp-manager`).
*   **`agent-mcp-manager`:**
    *   Receive delegation requests when the `repomix` MCP server fails.
    *   Guide the user through the configuration/troubleshooting process for the `repomix` MCP server, referencing `.ruru/modes/agent-mcp-manager/kb/install-repomix.md`.

## 4. Reference Documents 📚

*   `spec-repomix` Mode Definition (`.roomodes`)
*   Rule: Repomix Source Identification & Config Workflow (`.roo/rules-spec-repomix/02-repomix-decision-tree.md`)
*   KB: Repomix Usage Corrections (`.ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md`)
*   KB: Installing Repomix MCP Server (`.ruru/modes/agent-mcp-manager/kb/install-repomix.md`)
*   `repomix` MCP Server Tool Definitions (provided in context)

## 5. Procedure Steps 🪜

**Step 1: Identify GitHub URL (`spec-repomix`)**
1.  **Action:** Analyze the provided source input.
2.  **Inputs:** Source string (e.g., `https://github.com/owner/repo`, `https://github.com/owner/repo/tree/main/path/to/folder`).
3.  **Tools:** Internal logic.
4.  **Outputs:** Confirmation that the input is a GitHub URL (`github_url`).
5.  **Decision:** If not a GitHub URL, this SOP does not apply. If it is, proceed to Step 2.

**Step 2: Attempt `pack_remote_repository` via MCP (`spec-repomix`)**
1.  **Action:** Call the `repomix` MCP server's `pack_remote_repository` tool.
2.  **Inputs:** `github_url` from Step 1. Optional: `includePatterns`, `ignorePatterns` if provided by the user/coordinator.
3.  **Tools:** `use_mcp_tool`.
    *   *Example Tool Call (Natural Language Representation - See Rule `RULE-TOOL-REPRESENTATION-V1`):* Use the `use_mcp_tool` targeting the `repomix` server and `pack_remote_repository` tool, providing the GitHub URL as the `remote` argument, and optionally `includePatterns` or `ignorePatterns`.
4.  **Outputs:** Result of the `use_mcp_tool` call. If successful, this should include an `outputId`.
5.  **Decision:**
    *   **If Success:** Capture the `outputId` and proceed to Step 3.
    *   **If Failure:** The MCP server might be unavailable or the tool failed (e.g., invalid URL, repo access issue). Proceed to Step 5 (Fallback).

**Step 3: Attempt `read_repomix_output` via MCP (`spec-repomix`)**
1.  **Action:** Call the `repomix` MCP server's `read_repomix_output` tool using the ID obtained in the previous step.
2.  **Inputs:** `outputId` from Step 2.
3.  **Tools:** `use_mcp_tool`.
    *   *Example Tool Call (Natural Language Representation):* Use the `use_mcp_tool` targeting the `repomix` server and `read_repomix_output` tool, providing the `outputId`.
4.  **Outputs:** Result of the `use_mcp_tool` call. If successful, this contains the packed codebase content.
5.  **Decision:**
    *   **If Success:** Capture the retrieved content and proceed to Step 4 (Handle Success).
    *   **If Failure:** The MCP server might be unavailable or the tool failed (e.g., invalid `outputId`). Proceed to Step 5 (Fallback).

**Step 4: Handle MCP Success (`spec-repomix`)**
1.  **Action:** Process the packed codebase content retrieved in Step 3 as required by the original task (e.g., analyze it, pass it to another tool/mode).
2.  **Inputs:** Packed codebase content from Step 3.
3.  **Tools:** Internal logic, potentially other tools depending on the task.
4.  **Outputs:** Final result of the task (e.g., analysis summary, confirmation of processing).
5.  **Decision:** Report successful completion using `attempt_completion`, providing the results.

**Step 5: Handle MCP Failure / Fallback (`spec-repomix`)**
1.  **Action:** Since the primary MCP workflow failed, delegate to `agent-mcp-manager` to guide the user on configuration/troubleshooting.
2.  **Inputs:** The original `github_url`, the step where failure occurred (Step 2 or 3), and the error message received.
3.  **Tools:** `new_task`.
4.  **Outputs:** Delegation message sent to `agent-mcp-manager`.
    *   *Delegation Message:* "The `repomix` MCP server failed during GitHub processing for `[github_url]`. Error: `[error_message]`. Please guide the user to configure or troubleshoot the 'repomix' MCP server using the npx method. Refer to the KB at `.ruru/modes/agent-mcp-manager/kb/install-repomix.md`."
5.  **Decision:** Stop the current `spec-repomix` process. The responsibility is now transferred to `agent-mcp-manager`. Report the delegation action using `attempt_completion`.

## 6. Error Handling & Escalation ⚠️

*   **URL Parsing Failure:** (Step 1) Report "Invalid GitHub URL format". Stop.
*   **MCP Tool Failure (`pack_remote_repository` or `read_repomix_output`):** (Step 2 or 3) Trigger the fallback mechanism (Step 5). Log the specific error received from the MCP tool call. Delegate to `agent-mcp-manager`. Stop.
*   **Escalation:** If `agent-mcp-manager` is unable to resolve the MCP configuration issue with the user, it should escalate back to the coordinator (`roo-commander` or `prime-coordinator`) with details.

## 7. Validation (PAL) ✅

*   This SOP should be reviewed and validated according to the standard PAL process.
*   Test cases:
    *   Valid public GitHub repo URL (full repo) - MCP Success path.
    *   Valid public GitHub repo URL (subfolder) - MCP Success path.
    *   Valid public GitHub repo URL (specific branch) - MCP Success path.
    *   Invalid GitHub URL format (should fail at Step 1).
    *   URL pointing to a non-existent repository (should fail at Step 2, trigger fallback).
    *   Simulate `repomix` MCP server being unavailable (should fail at Step 2, trigger fallback).
    *   Simulate `pack_remote_repository` tool failure (e.g., internal error) (should fail at Step 2, trigger fallback).
    *   Simulate `read_repomix_output` tool failure (e.g., invalid ID) (should fail at Step 3, trigger fallback).

## 8. Revision History Memento 📜

*   **v2.0 (2025-05-05):** Refactored by Prime Documenter. Prioritized `repomix` MCP server usage (`pack_remote_repository`, `read_repomix_output`). Removed direct CLI execution, cloning, and config file generation steps. Added fallback procedure delegating to `agent-mcp-manager` on MCP failure. Updated objective, scope, roles, references, procedure, error handling, and validation accordingly.
*   **v1.1 (2025-05-10):** Revised by AI Assistant. Strengthened error handling, added prerequisite checks, explicitly prohibited fallback execution on `repomix --config` failure, clarified step dependencies (clone before config gen), added detail to commands, refined validation cases. Addressed reported failure mode.
*   **v1.0 (2025-05-03):** Initial draft based on discussion to handle GitHub repos/subfolders via config file and include filters.