+++
# --- Basic Metadata ---
id = "SOP-REPOMIX-LOCAL-V1"
title = "SOP: Repomix Local Source Processing"
status = "draft"
created_date = "2025-05-03" # Placeholder, use actual date
updated_date = "2025-05-03" # Placeholder, use actual date
version = "1.0"
tags = ["sop", "workflow", "repomix", "local", "spec-repomix"]
template_schema_doc = ".ruru/templates/toml-md/15_sop.README.md" # Link to schema documentation

# --- Ownership & Context ---
# author = "Prime Coordinator"
owner = "Roo Commander"
related_docs = [
    ".roo/rules-spec-repomix/02-repomix-decision-tree.md",
    ".ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md",
    ".roo/rules/05-os-aware-commands.md"
    ]
# related_tasks = []

# --- SOP Specific Fields ---
objective = "To define the standard procedure for the `spec-repomix` mode to process local filesystem path sources using the `repomix` tool via a configuration file."
scope = "This SOP applies exclusively when the `spec-repomix` mode identifies the input source as one or more local filesystem paths. It covers path validation, configuration generation, execution via `--config`, and cleanup."
roles = ["spec-repomix"]

# --- AI Interaction Hints (Optional) ---
# context_type = "process_definition"
# target_audience = ["spec-repomix"]
# granularity = "detailed"
+++

# SOP: Repomix Local Source Processing

## 1. Objective 🎯

*   To standardize the process for `spec-repomix` to handle local filesystem paths as input, using the `repomix --config` method for execution.

## 2. Scope Boundaries ↔️

*   **In Scope:** Processing local filesystem paths (relative or absolute) provided as input to `spec-repomix`. Generating `repomix` outputs (XML and Markdown) via a temporary configuration file.
*   **Out of Scope:** Processing GitHub URLs (covered by `SOP-REPOMIX-GITHUB-V1.md`). Processing non-filesystem sources. Complex `repomix` configuration options beyond basic source, output, and include/exclude filters. Direct execution of `repomix` with CLI arguments for sources/filters.

## 3. Roles & Responsibilities 👤

*   **`spec-repomix`:**
    *   Validate the provided local path(s).
    *   Generate the `repomix.config.json` content.
    *   Write the config to a temporary file.
    *   Execute `repomix --config`.
    *   Handle results and errors.
    *   Perform cleanup.

## 4. Reference Documents 📚

*   `spec-repomix` Mode Definition (`.roomodes`)
*   Rule: Repomix Source Identification & Config Workflow (`.roo/rules-spec-repomix/02-repomix-decision-tree.md`)
*   KB: Repomix Usage Corrections (`.ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md`)
*   Rule: Generate OS-Aware Commands (`.roo/rules/05-os-aware-commands.md`)
*   `repomix` tool documentation (if available externally/via help command).

## 5. Procedure Steps 🪜

**Step 1: Validate Input Path(s) (`spec-repomix`)**
1.  **Action:** Verify that the provided local path(s) exist within the workspace or accessible filesystem.
2.  **Inputs:** Local path string(s).
3.  **Tools:** `list_files` (with `recursive: false` on the parent directory) or potentially `execute_command` with `ls`/`dir` (less preferred). Consider using MCP filesystem tools if available and more suitable (e.g., `vertex-ai-mcp-server`'s `get_filesystem_info`).
4.  **Context:** Workspace root directory.
5.  **Outputs:** Confirmation that path(s) exist.
6.  **Decision:** If any path does not exist, report error to coordinator and stop.

**Step 2: Generate Configuration JSON (`spec-repomix`)**
1.  **Action:** Construct the JSON object for the `repomix.config.json` file.
2.  **Inputs:** Validated local path(s) from Step 1, user-requested parameters (e.g., output style, includes/excludes).
3.  **Tools:** Internal logic.
4.  **Context:** N/A.
5.  **Outputs:** JSON configuration object (`config_json`).
    *   **`sources` Array:** Contains one or more objects, each specifying a local path:
        ```json
        {
          "type": "local",
          "path": "[RELATIVE_OR_ABSOLUTE_LOCAL_PATH]"
        }
        ```
        *(Ensure paths are correctly formatted for the OS if absolute paths are used, though relative paths from the workspace root are generally preferred).*
    *   **`output` Object:** Define `path` and `format` as requested (generating paths for both XML and Markdown, e.g., `.ruru/repomix/[source_dir_name]/output.md`, `.ruru/repomix/[source_dir_name]/output.xml`). Ensure `format` is `"markdown"` or `"xml"` or `"plain"`.
    *   **Other Fields:** Add `include`, `exclude`, `filters`, etc., as requested by the user.
6.  **Decision:** N/A.

**Step 3: Write Configuration File (`spec-repomix`)**
1.  **Action:** Write the generated JSON configuration to a temporary file.
2.  **Inputs:** `config_json` from Step 2.
3.  **Tools:** `write_to_file`.
4.  **Context:** N/A.
5.  **Outputs:** Temporary config file path (`temp_config_path`, e.g., `.ruru/temp/repomix_config_[timestamp].json`). Result of `write_to_file`.
6.  **Decision:** If write fails, report error and stop.

**Step 4: Execute Repomix (`spec-repomix`)**
1.  **Action:** Run the `repomix` command using the temporary configuration file. Ensure output directories exist.
2.  **Inputs:** `temp_config_path` from Step 3. Output paths defined within the config.
3.  **Tools:** `execute_command`.
4.  **Context:** OS type (for command syntax). Workspace root directory (unless paths in config require a different CWD).
5.  **Outputs:** Exit code and output from `repomix` command. Repomix output file(s) at the specified location(s).
    *   Command: `mkdir -p [output_directory_for_md] && mkdir -p [output_directory_for_xml] && repomix --config [temp_config_path]` (adjust `mkdir` for OS).
6.  **Decision:** Proceed to Step 5 (Result Handling).

**Step 5: Result Handling (`spec-repomix`)**
1.  **Action:** Analyze the result of the `repomix` execution.
2.  **Inputs:** Exit code and output from Step 4.
3.  **Tools:** Internal logic.
4.  **Context:** KB `.ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md`.
5.  **Outputs:** Success or failure status, relevant messages.
6.  **Decision:** If Exit Code is 0, proceed to Step 6 (Cleanup). If non-zero, analyze error, consult KB, attempt correction (e.g., fix config JSON syntax) and loop back to Step 3/4 if feasible, otherwise report failure and error details to coordinator and proceed to Step 6.

**Step 6: Cleanup (`spec-repomix`)**
1.  **Action:** Remove the temporary configuration file.
2.  **Inputs:** `temp_config_path` from Step 3.
3.  **Tools:** `execute_command`.
4.  **Context:** OS type (for `rm` or `Remove-Item`).
5.  **Outputs:** Exit code/output from cleanup command.
6.  **Decision:** Log cleanup success/failure. Report final outcome (success or failure from Step 5) to the coordinator using `attempt_completion`.

## 6. Error Handling & Escalation ⚠️

*   **Invalid Path:** Report error if input path(s) do not exist (Step 1).
*   **Config Write Failure:** Report file system error to coordinator.
*   **Repomix Execution Failure:** Analyze stderr from `repomix`. Consult KB `01-repomix-usage-corrections.md`. If known config issue, attempt to fix config (Step 2) and retry Step 3-4 once. If unknown or persistent error, report details to coordinator.
*   **Cleanup Failure:** Report error message to coordinator.
*   **Escalation:** For persistent or unresolvable issues, escalate to the delegating coordinator (`roo-commander` or `prime-coordinator`).

## 7. Validation (PAL) ✅

*   This SOP should be reviewed and validated according to the standard PAL process.
*   Test cases:
    *   Valid single local directory path.
    *   Valid multiple local directory paths.
    *   Path to a single file.
    *   Invalid/non-existent local path.
    *   Request with specific include/exclude filters.

## 8. Revision History Memento 📜 (Optional)

*   **v1.0 (2025-05-03):** Initial draft based on discussion to handle local paths via config file.