+++
# --- Basic Metadata ---
id = "SOP-MODE-REFACTOR-V1"
title = "SOP: Mode Configuration Refactoring & Tidying"
status = "Active"
created_date = "2025-05-05" # Auto-generated
updated_date = "2025-05-05" # Auto-generated
version = "1.0"
tags = ["sop", "refactoring", "mode-maintenance", "abstraction", "quality", "rules", "kb"]
template_schema_doc = ".ruru/templates/toml-md/15_sop.README.md" # Link to schema documentation

# --- Ownership & Context ---
# author = "" # Optional: Specify if different from owner
owner = "prime-coordinator"
related_context = [
    ".roo/rules-prime-txt/01-abstraction-principle.md", # Example mode-specific rule
    ".roo/rules/13-tool-representation-standard.md",
    ".roo/rules/01-standard-toml-md-format.md",
    # Add other relevant workspace or mode-specific rules/standards
]
# related_tasks = [] # Optional: Link to MDTM tasks if applicable

# --- SOP Specific Fields ---
objective = "Improve maintainability, clarity, and consistency of mode configurations by applying abstraction, ensuring correct tool representation, removing redundancy, and checking for contradictions."
scope = "Procedure for reviewing and improving mode configuration files, typically including: `.ruru/modes/[mode-slug]/*.mode.md`, `.roo/rules-[mode-slug]/*.md`, `.ruru/modes/[mode-slug]/kb/**/*.md`."
roles = ["prime-txt", "prime-dev", "util-mode-maintainer", "util-second-opinion"]

# --- AI Interaction Hints (Optional) ---
# context_type = "process_definition"
# target_audience = ["prime-txt", "prime-dev", "util-mode-maintainer", "util-second-opinion", "prime-coordinator"]
# granularity = "detailed"
+++

# SOP: Mode Configuration Refactoring & Tidying

## 1. Objective 🎯

*   To improve the maintainability, clarity, and consistency of mode configurations by applying established principles like the Abstraction Principle and Tool Representation Standard, removing redundancy, and checking for contradictions.

## 2. Scope Boundaries ↔️

*   **In Scope:** This procedure applies to the review and refactoring of mode-specific configuration files, including:
    *   Mode definition files (`.ruru/modes/[mode-slug]/*.mode.md`)
    *   Mode-specific rule files (`.roo/rules-[mode-slug]/*.md`)
    *   Mode-specific Knowledge Base (KB) files (`.ruru/modes/[mode-slug]/kb/**/*.md`)
*   **Out of Scope:**
    *   Creation of entirely new modes (covered by different procedures/templates).
    *   Refactoring of workspace-level rules (`.roo/rules/*.md`) unless explicitly part of a broader refactoring task.
    *   Functional changes to mode behavior beyond structural improvements and adherence to standards.

## 3. Roles & Responsibilities 👤

*   **`prime-coordinator` (Owner):** Initiates the refactoring task, assigns roles, reviews final changes.
*   **`prime-txt` / `prime-dev` / `util-mode-maintainer` (Executor):** Performs the detailed steps of the refactoring procedure. The specific executor may depend on the type of file being modified (Markdown vs. structured config).
*   **`util-second-opinion` (Reviewer - Optional):** Provides an independent review of complex changes or refactoring decisions.

## 4. Reference Documents 📚

*   Abstraction Principle (Mode Specific Example): `.roo/rules-prime-txt/01-abstraction-principle.md`
*   Standard: Tool Representation in Documentation and Discussion: `.roo/rules/13-tool-representation-standard.md`
*   Standard: TOML+Markdown (TOML MD) Format Usage: `.roo/rules/01-standard-toml-md-format.md`
*   (Add paths to other relevant standards or guidelines as needed)

## 5. Procedure Steps 🪜

1.  **Identify Target Mode (Coordinator/Executor):**
    *   **Action:** Determine the `[mode-slug]` of the mode configuration to be reviewed and refactored.
    *   **Input:** Task request or maintenance schedule.
    *   **Output:** Target `[mode-slug]`.

2.  **List Files (Executor):**
    *   **Action:** Identify all relevant configuration files for the target mode.
    *   **Input:** Target `[mode-slug]`.
    *   **Tool:** Use `list_files` recursively on:
        *   `.ruru/modes/[mode-slug]/`
        *   `.roo/rules-[mode-slug]/`
    *   **Output:** List of file paths to review.

3.  **Review Files (Executor):**
    *   **Action:** Read the content of each identified file.
    *   **Input:** List of file paths.
    *   **Tool:** Use `read_file` for each file.
    *   **Output:** Understanding of current file content and structure.

4.  **Apply Abstraction Principle (Executor):**
    *   **Action:** Identify procedural files (rules, potentially mode definitions) containing embedded content (lengthy prompts, detailed examples, data lists). Move this content to new, appropriately named KB files (e.g., within `kb/prompts/`, `kb/data/`, `kb/examples/`). Update the original procedural file to reference the new KB file path according to the Abstraction Principle standard (e.g., `PRIME-TXT-RULE-ABSTRACTION-PRINCIPLE-V1`).
    *   **Input:** File content from Step 3.
    *   **Tools:** `write_to_file` (for new KB files), `apply_diff` or `search_and_replace` (to update references in the original file).
    *   **Output:** Refactored files adhering to the Abstraction Principle.

5.  **Ensure Tool Representation (Executor):**
    *   **Action:** Scan procedural descriptions (rules, KBs describing workflows) for literal tool execution XML syntax. Replace these instances with descriptive natural language using backticks (e.g., "use the `tool_name` tool") as per `RULE-TOOL-REPRESENTATION-V1`.
    *   **Input:** File content from Step 3 (or after Step 4).
    *   **Tools:** `apply_diff` or `search_and_replace`. **Caution:** If modifying a file that *previously* contained literal XML, consider using `write_to_file` for the entire file to avoid potential corruption if `apply_diff` fails subtly.
    *   **Output:** Files adhering to the Tool Representation standard.

6.  **Check for Redundancy/Contradiction (Executor):**
    *   **Action:** Compare the content of the mode's rules and KBs against each other and against relevant workspace-level rules (`.roo/rules/`). Identify and flag or remove information that is redundant (e.g., a mode rule duplicating a core workspace rule) or instructions that contradict higher-level standards.
    *   **Input:** File content, workspace rules context.
    *   **Tools:** Primarily analysis; potentially `apply_diff` or `search_and_replace` to remove/modify content.
    *   **Output:** Streamlined, consistent configuration files. Flag complex contradictions for discussion.

7.  **Optional Review (Executor/Coordinator):**
    *   **Action:** For significant structural changes or complex contradiction resolutions, consider involving `util-second-opinion`.
    *   **Input:** Refactored files, summary of changes/concerns.
    *   **Tool:** `new_task` (delegation).
    *   **Output:** Review feedback. Incorporate feedback using appropriate file modification tools.

8.  **Commit Changes (Executor):**
    *   **Action:** Once refactoring for the mode is complete and reviewed (if applicable), ensure changes are appropriately staged and committed (this step might be handled by the Coordinator or a dedicated Git management process).
    *   **Input:** Finalized, refactored files.
    *   **Output:** Committed changes to version control.

## 6. Error Handling & Escalation ⚠️

*   If `apply_diff` or `search_and_replace` fails unexpectedly during refactoring, attempt to use `write_to_file` with the full intended content instead.
*   If contradictions are found that cannot be easily resolved, flag them in the file content (e.g., using comments) and escalate to the `owner` (`prime-coordinator`) or `technical-architect` for a decision.
*   Report any file writing errors encountered after confirmation to the Coordinator.

## 7. Validation (PAL) ✅

*   This SOP primarily focuses on structural and standards adherence. Functional validation (ensuring the mode still operates correctly after refactoring) should be performed separately, potentially involving:
    *   Manual testing of the refactored mode.
    *   Automated tests if available.
    *   Reference the standard PAL (Process Acceptance Lifecycle) process if applicable.

## 8. Success Criteria ✨

*   Mode configuration files (`.mode.md`, rules, KBs) are clearer and easier to understand.
*   Procedural files primarily contain logic and references, while detailed content resides in dedicated KB files (Abstraction Principle).
*   Tool usage is represented descriptively (`tool_name`) in documentation/procedures, not with execution XML (Tool Representation Standard).
*   Redundant information, especially duplication of workspace rules, is minimized.
*   Contradictory instructions within the mode's configuration or with workspace standards are resolved or flagged.
*   Overall maintainability and consistency of the mode's configuration are improved.

## 9. Revision History Memento 📜

*   **v1.0 (2025-05-05):** Initial draft.