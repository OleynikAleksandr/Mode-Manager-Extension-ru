+++
# --- Step Metadata ---
step_id = "WF-STANDARDIZE-KB-READMES-V1-99-FINISH" # (String, Required) Unique ID for this step.
# Convention: The final step in a workflow should always use step_number = 99
step_number = 99
title = "Step 99: Finish Standardizing KB READMEs" # (String, Required) Title of this specific step.
description = """
(String, Required) Aggregates the results from processing each mode's KB README,
performs any necessary cleanup, and generates a final summary report
indicating success, failures, and skipped files.
"""

# --- Flow Control ---
depends_on = ["WF-STANDARDIZE-KB-READMES-V1-01-PROCESS"] # (Array of Strings, Required) Depends on the completion of the processing loop (all iterations of Step 01).
next_step = "" # (String, Required) Always empty for the finish step.
# error_step = "" # (String, Optional) Usually empty, but could point to a final error reporting step.

# --- Execution ---
delegate_to = "" # (String, Optional) Often handled by the orchestrator or a reporting agent.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed from previous steps.
    "List of status_message outputs from all iterations of Step 01.",
    "List of processed_readme_path outputs from all iterations of Step 01.",
    "List of original mode_readme_paths from Step 00.",
]
outputs = [ # (Array of Strings, Optional) Final workflow outputs.
    "workflow_result: Summary report detailing processed files, skipped files, and any errors encountered.",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/26_workflow_step_finish.md" # (String, Required) Link to this template definition.
+++

# Step 99: Finish Standardizing KB READMEs

## Actions

1.  **Aggregate Results:**
    *   `- [ ]` Collect all `status_message` outputs from the iterations of Step 01.
    *   `- [ ]` Collect all `processed_readme_path` outputs from successful iterations of Step 01.
    *   `- [ ]` Compare the list of `processed_readme_path` against the original `mode_readme_paths` from Step 00 to identify any skipped files (those present in the original list but not processed successfully).
2.  **Perform Cleanup:** (Optional: e.g., Remove temporary artifacts if any were created during processing).
3.  **Generate Final Report:**
    *   `- [ ]` Create a summary (`workflow_result`) detailing:
        *   Total number of modes identified for processing (from Step 00).
        *   List/count of successfully updated `kb/README.md` files.
        *   List/count of modes skipped (e.g., `kb/README.md` not found initially, or errors during processing).
        *   Consolidated list of errors encountered (from `status_message` outputs).
4.  **Determine Final Status:**
    *   `- [ ]` Based on the aggregated results, determine overall workflow success (e.g., "Completed successfully", "Completed with errors", "Failed"). Include this in the `workflow_result`.

## Acceptance Criteria

*   All status messages from Step 01 iterations are aggregated.
*   A final `workflow_result` summary report is generated containing success/failure counts, lists of processed/skipped files, and error details.
*   The overall workflow status is determined and included in the report.

## Error Handling

*   Errors during aggregation or report generation should be logged. The final `workflow_result` should still be generated, noting the error during finalization itself.