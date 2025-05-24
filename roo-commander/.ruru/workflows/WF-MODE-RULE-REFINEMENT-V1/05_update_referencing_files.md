+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-05-UPDATE_REFERENCES" # (String, Required) Unique ID for this step.
title = "Step 05: Update Referencing Files (Optional)" # (String, Required) Title of this specific step.
description = """
(String, Required) If the updated rule files are referenced elsewhere (e.g., in other workflow steps, 
main rulesets), this step delegates the necessary updates to `prime-dev` (or `prime-txt`), 
requiring user confirmation.
"""

# --- Flow Control ---
depends_on = ["WF-MODE-RULE-REFINEMENT-V1-04-APPLY_UPDATES"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "99_finish.md" # (String, Optional) Filename of the next step (finish step).
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator identifies referencing files and delegates updates.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Output from step WF-MODE-RULE-REFINEMENT-V1-04-APPLY_UPDATES: updated_files",
    "Coordinator knowledge or search results: List of files referencing the updated rules.",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "updated_referencing_files: List of successfully updated referencing file paths.",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 05: Update Referencing Files (Optional)

## Actions

1.  **Identify Referencing Files:** The coordinator determines if any other files need updating based on the changes made in Step 04. This might involve searching the codebase or using prior knowledge.
2.  **Plan Reference Updates:** If referencing files are found, plan the specific changes needed (e.g., update version numbers in TOML, add/remove file paths in lists).
3.  **Delegate to `prime-dev` (Iteratively):** For each referencing file needing changes:
    *   Use `new_task` targeting `prime-dev` (or `prime-txt`).
    *   **Message:** Provide the target file path and the specific changes required.
    *   **Instruction:** Instruct `prime-dev` to use `apply_diff` or `search_and_replace` and to **require user confirmation before applying changes**.
4.  **Await Confirmation:** Wait for `attempt_completion` from `prime-dev` for each file.
5.  **Log Progress:** Record which referencing files were updated.

## Acceptance Criteria

*   All identified referencing files have been checked and updated as necessary.
*   `prime-dev` has reported success (after user confirmation) for each update.

## Error Handling

*   If `prime-dev` fails to apply an update to a referencing file, log the error. The coordinator decides whether to retry, skip, or proceed to `{{error_step}}`.