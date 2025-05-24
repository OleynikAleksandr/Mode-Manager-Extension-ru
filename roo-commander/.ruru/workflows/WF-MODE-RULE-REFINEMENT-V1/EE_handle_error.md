+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-EE-HANDLE_ERROR" # (String, Required) Unique ID for this error handling step.
title = "Step EE: Handle Workflow Error" # (String, Required) Title of this specific step.
description = """
(String, Required) Catches errors from previous steps, logs the failure, 
and terminates the workflow, reporting the error state.
"""

# --- Flow Control ---
# depends_on will be dynamically determined by the step that failed.
depends_on = [] # (Array of Strings, Required) Placeholder - Actual dependency is the failing step.
next_step = "" # (String, Required) Error steps typically terminate the workflow.
error_step = "" # (String, Optional) Cannot proceed further from an error step.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator logs and reports the error.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Error details from the failing step.",
    "Context from the failing step (e.g., file paths attempted).",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "workflow_result: Summary indicating failure and providing error details.",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Based on standard step template.
+++

# Step EE: Handle Workflow Error

## Actions

1.  **Receive Error Context:** Identify the failing step and the error details passed to this step.
2.  **Log Error:** Record the step ID of the failing step and the specific error message in the workflow execution log or relevant task file.
3.  **Prepare Failure Report:** Create a summary message indicating workflow failure, the step where it occurred, and the error details.
4.  **Report Outcome:** Output the failure summary as `workflow_result`.

## Acceptance Criteria

*   The error context from the failing step is received.
*   The error is logged appropriately.
*   A `workflow_result` indicating failure is generated.

## Error Handling

*   This is the final error handling step for this workflow path.