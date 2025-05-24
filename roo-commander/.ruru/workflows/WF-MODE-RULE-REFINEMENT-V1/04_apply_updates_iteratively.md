+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-04-APPLY_UPDATES" # (String, Required) Unique ID for this step.
title = "Step 04: Apply Updates Iteratively" # (String, Required) Title of this specific step.
description = """
(String, Required) The coordinator delegates the application of planned changes to the `prime-dev` 
(or `prime-txt`) mode, one file at a time, following the Direct Auto-Apply workflow 
which requires user confirmation before writing.
"""

# --- Flow Control ---
depends_on = ["WF-MODE-RULE-REFINEMENT-V1-03-ANALYZE_REVIEW"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "05_update_referencing_files.md" # (String, Optional) Filename of the next step on successful completion of all updates.
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if any update fails irrecoverably.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator manages the iteration and delegation loop.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Output from step WF-MODE-RULE-REFINEMENT-V1-03-ANALYZE_REVIEW: update_plan",
    "Output from step WF-MODE-RULE-REFINEMENT-V1-00-START: target_file_paths", # Needed to iterate through files
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "updated_files: List of successfully updated file paths.",
    "failed_updates: List of files where updates failed.",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 04: Apply Updates Iteratively

## Actions

1.  **Iterate Through Plan:** The coordinator loops through each file and its associated changes defined in the `update_plan`.
2.  **Delegate to `prime-dev`:** For each file:
    *   Use `new_task` targeting `prime-dev` (or `prime-txt` if only simple text changes).
    *   **Message:** Provide the target file path and the specific changes (diff, search/replace instructions, or full content). Reference the AI review document (`review_output_path`) for context.
    *   **Instruction:** Explicitly instruct `prime-dev` to use the appropriate tool (`apply_diff`, `search_and_replace`, `write_to_file`) and to **require user confirmation before applying changes** (as per Direct Auto-Apply workflow).
3.  **Await Confirmation:** Wait for `attempt_completion` from `prime-dev` confirming success (or failure) for each file.
4.  **Log Progress:** Record which files were updated successfully and which failed in the workflow execution log or relevant task file.
5.  **Handle Failures:** If `prime-dev` reports a failure or user denial:
    *   Log the specific error.
    *   Decide whether to retry, skip the file, or proceed to `{{error_step}}`.

## Acceptance Criteria

*   All changes specified in the `update_plan` have been attempted.
*   `prime-dev` has reported success (after user confirmation) for each intended update.
*   A record of `updated_files` and any `failed_updates` is available.

## Error Handling

*   If `prime-dev` fails to apply an update and retries are unsuccessful, or if the user denies the change, log the failure and potentially proceed to `{{error_step}}` if the failure is critical. Otherwise, continue with the next file and record the failure.