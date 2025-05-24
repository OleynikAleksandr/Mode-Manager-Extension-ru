+++
# --- Basic Metadata ---
id = "WF-MODE-RULE-REFINEMENT-V1"
title = "Mode Rule Refinement using AI Review"
status = "draft"
created_date = "2025-05-01"
updated_date = "2025-05-01"
version = "1.0"
tags = ["workflow", "prime-coordinator", "meta-dev", "rules", "refinement", "ai-review", "vertex-ai", "prime-dev"]

# --- Ownership & Context ---
owner = "prime-coordinator"
related_docs = [
    ".roo/rules-prime-coordinator/03-meta-dev-workflow-simplified.md",
    ".roo/rules/10-vertex-mcp-usage-guideline.md"
    ]
related_templates = [".ruru/templates/workflows/00_workflow_boilerplate.md"]

# --- Workflow Specific Fields ---
objective = "To improve the accuracy, completeness, and clarity of operational mode rule files using AI analysis and targeted updates."
scope = "Applicable to refining existing rule files located in `.roo/rules-mode-*/` directories."
roles = ["prime-coordinator", "vertex-ai-mcp-server", "prime-dev"] # prime-txt could also be used for edits
trigger = "User request to review/improve mode rules, or Coordinator identifies need during other tasks."
success_criteria = [
    "Target rule files are reviewed by Vertex AI.",
    "Review feedback is analyzed.",
    "Relevant suggestions are incorporated into the rule files.",
    "Updated rule files are saved successfully.",
    "Any referencing files (like main workflow rules) are updated."
    ]
failure_criteria = [
    "Vertex AI review fails or provides unusable feedback.",
    "Errors occur during file modification.",
    "User denies necessary file write operations."
    ]

# --- Integration ---
acqa_applicable = false # Primarily a meta-dev config task
pal_validated = false
validation_notes = ""

# --- AI Interaction Hints (Optional) ---
context_type = "workflow_definition"
+++

# Workflow: Mode Rule Refinement using AI Review

## 1. Objective 🎯
*   To improve the accuracy, completeness, and clarity of operational mode rule files (`.roo/rules-mode-*/`) by leveraging AI analysis (specifically Vertex AI MCP) and incorporating the feedback through targeted updates.

## 2. Scope ↔️
*   This workflow applies when existing rule files for an operational mode require review and potential refinement based on external documentation, best practices, or identified inconsistencies.
*   It focuses on using AI for analysis and `prime-dev` (or `prime-txt`) for applying changes.

## 3. Roles & Responsibilities 👤
*   **`prime-coordinator`:** Initiates the workflow, identifies target files, formulates queries for AI review, analyzes feedback, delegates file modifications, and oversees the process.
*   **`vertex-ai-mcp-server`:** Reads target files, performs AI-powered review based on the Coordinator's query, and saves the analysis.
*   **`prime-dev` (or `prime-txt`):** Applies specific changes to rule files as instructed by the Coordinator, following the Direct Auto-Apply workflow (including user confirmation).

## 4. Preconditions🚦
*   The `vertex-ai-mcp-server` must be connected and available.
*   The target mode rule files (`.roo/rules-mode-*/...`) must exist.
*   The Coordinator must have context on the desired improvements or the source material for review (e.g., previous research file path).

## 5. Reference Documents & Tools 📚🛠️
*   Target rule files (`.roo/rules-mode-*/...`)
*   Source research/documentation (if applicable, e.g., previous Vertex AI output)
*   Vertex AI MCP Tools: `read_multiple_files_content`, `save_answer_query_websearch`
*   Prime Editor Tools: `read_file`, `write_to_file`, `apply_diff`
*   Coordination Tool: `new_task`
*   Relevant Rules:
    *   `.roo/rules-prime-coordinator/03-meta-dev-workflow-simplified.md` (Direct Auto-Apply)
    *   `.roo/rules/10-vertex-mcp-usage-guideline.md`

## 6. Workflow Steps 🪜

*   **Step 1: Identify Target Files & Review Goal (Coordinator Task)**
    *   **Description:** Coordinator identifies the specific rule files within a `.roo/rules-mode-*/` directory that need review and the goal of the review (e.g., check accuracy against specific documentation, suggest improvements for clarity).
    *   **Inputs:** User request or Coordinator's analysis.
    *   **Procedure:** Use `list_files` if necessary to confirm paths.
    *   **Outputs:** List of target file paths, clear review objective.

*   **Step 2: Read Files for Review (Coordinator delegates to `vertex-ai-mcp-server`)**
    *   **Description:** Read the content of all target rule files.
    *   **Tool:** `use_mcp_tool` (`vertex-ai-mcp-server`, `read_multiple_files_content`)
    *   **Inputs Provided by Coordinator:** Array of target file paths.
    *   **Expected Output from Delegate:** Combined content of the files.
    *   **Coordinator Action (Post-Delegation):** Wait for file content. Handle potential read errors.

*   **Step 3: Request AI Review (Coordinator delegates to `vertex-ai-mcp-server`)**
    *   **Description:** Ask Vertex AI to review the provided rule content based on the objective defined in Step 1.
    *   **Tool:** `use_mcp_tool` (`vertex-ai-mcp-server`, `save_answer_query_websearch`)
    *   **Inputs Provided by Coordinator:**
        *   `query`: A detailed prompt including the review objective, the concatenated file content from Step 2, and instructions to check for accuracy, suggest improvements, and identify issues/ambiguities. Reference external documentation if applicable.
        *   `output_path`: A designated path in `.ruru/docs/vertex/answers-web/` following naming conventions.
    *   **Expected Output from Delegate:** Confirmation of review saved to the specified file.
    *   **Coordinator Action (Post-Delegation):** Wait for confirmation. Handle potential MCP errors.

*   **Step 4: Analyze Review & Plan Updates (Coordinator Task)**
    *   **Description:** Coordinator reads the AI-generated review and identifies specific, actionable changes for each rule file.
    *   **Inputs:** Path to the review file (from Step 3).
    *   **Procedure:** Use `read_file` to get review content. Analyze suggestions.
    *   **Outputs:** A plan detailing the exact changes (diffs or full content) needed for each target rule file.

*   **Step 5: Apply Updates Iteratively (Coordinator delegates to `prime-dev`)**
    *   **Description:** Apply the planned changes to each rule file one by one.
    *   **Tool:** `new_task` (targeting `prime-dev` or `prime-txt` as appropriate for file type).
    *   **Loop:** For each file needing changes:
        *   **Inputs Provided by Coordinator:** Target file path, specific changes required (e.g., diff, replacement text, instructions for `prime-dev`). Reference the review document. Mention version increments if applicable.
        *   **Instructions for Delegate:** Instruct `prime-dev` to apply the changes using `apply_diff` or `write_to_file`, emphasizing the need for user confirmation before writing (as per Direct Auto-Apply workflow).
        *   **Expected Output from Delegate:** Confirmation of successful update (after user approval).
        *   **Coordinator Action (Post-Delegation):** Wait for confirmation for each file. Handle any errors reported by `prime-dev` or user denial. Log the update.
    *   **Error Handling:** If updates fail for a file, log the error and decide whether to retry, skip, or escalate.

*   **Step 6: Update Referencing Files (Optional) (Coordinator delegates to `prime-dev`)**
    *   **Description:** If the updated/new rules are referenced in other files (e.g., a main workflow rule's `related_context`), update those references.
    *   **Tool:** `new_task` (targeting `prime-dev` or `prime-txt`).
    *   **Inputs Provided by Coordinator:** Path to the referencing file, specific changes needed (e.g., update version numbers, add new file paths to TOML list).
    *   **Instructions for Delegate:** Instruct `prime-dev` to apply changes using `apply_diff`, requiring user confirmation.
    *   **Expected Output from Delegate:** Confirmation of successful update.
    *   **Coordinator Action (Post-Delegation):** Wait for confirmation. Handle errors. Log the update.

## 7. Postconditions ✅
*   Target rule files (`.roo/rules-mode-*/...`) are updated with improvements based on AI review.
*   AI review document is saved in `.ruru/docs/vertex/answers-web/`.
*   (Optional) Referencing files are updated.

## 8. Error Handling & Escalation (Overall) ⚠️
*   Errors during MCP interaction should be reported to the user. Retry might be possible.
*   Errors during file modification by `prime-dev` (including user denial) should be reported. Coordinator may ask user for alternative action (skip, retry, manual edit).
*   Persistent or complex issues should be escalated for manual review.

## 9. PAL Validation Record 🧪
*   Date Validated: N/A (Draft)
*   Method:
*   Test Case(s):
*   Findings/Refinements:

## 10. Revision History 📜
*   v1.0 (2025-05-01): Initial draft based on `spec-repomix` rule refinement process.