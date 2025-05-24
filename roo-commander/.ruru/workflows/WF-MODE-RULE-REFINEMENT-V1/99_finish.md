+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-99-FINISH" # (String, Required) Unique ID for this step.
step_number = 99
title = "Step 99: Finish Rule Refinement Workflow" # (String, Required) Title of this specific step.
description = """
(String, Required) Finalizes the rule refinement workflow. Aggregates results, 
reports on successfully updated files, any failures, and the location of the AI review document.
"""

# --- Flow Control ---
depends_on = ["WF-MODE-RULE-REFINEMENT-V1-05-UPDATE_REFERENCES"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "" # (String, Required) Always empty for the finish step.
error_step = "" # (String, Optional) Usually empty.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator handles the final reporting.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed from previous steps.
    "Output from step WF-MODE-RULE-REFINEMENT-V1-04-APPLY_UPDATES: updated_files",
    "Output from step WF-MODE-RULE-REFINEMENT-V1-04-APPLY_UPDATES: failed_updates",
    "Output from step WF-MODE-RULE-REFINEMENT-V1-05-UPDATE_REFERENCES: updated_referencing_files",
    "Output from step WF-MODE-RULE-REFINEMENT-V1-02-REQUEST_AI_REVIEW: review_output_path",
]
outputs = [ # (Array of Strings, Optional) Final workflow outputs.
    "workflow_result: Summary of success/failure, list of updated files, list of failed updates, and path to AI review.",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/26_workflow_step_finish.md" # (String, Required) Link to this template definition.
+++

# Step 99: Finish Rule Refinement Workflow

## Actions

1.  **Aggregate Results:** Collect the lists of `updated_files`, `failed_updates`, `updated_referencing_files`, and the `review_output_path`.
2.  **Generate Final Report:** Create a summary message including:
    *   Overall success or partial success (if failures occurred).
    *   List of successfully updated rule files.
    *   List of successfully updated referencing files (if any).
    *   List of files where updates failed (if any), with reasons if available.
    *   The path to the saved AI review document (`review_output_path`).
3.  **Determine Final Status:** Set status to success if `failed_updates` is empty, otherwise partial success/failure depending on criticality.
4.  **Report Outcome:** Output the summary as `workflow_result`.

## Acceptance Criteria

*   All results from previous steps are aggregated.
*   A final `workflow_result` summary is generated, clearly stating outcomes and providing relevant paths.
*   The overall workflow status is determined.

## Error Handling

*   Errors during aggregation or reporting should be logged, but the workflow should attempt to complete with the available information.