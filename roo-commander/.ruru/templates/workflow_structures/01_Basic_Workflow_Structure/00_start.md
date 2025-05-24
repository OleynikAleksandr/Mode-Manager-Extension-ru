+++
# --- Step Metadata ---
step_id = "WF-TEMPLATE-BASIC-V0-00-START" # (String, Required) Unique ID for this step.
title = "Step 00: Start Basic Workflow Template" # (String, Required) Title of this specific step.
description = """
(String, Required) Initial setup for the basic workflow template.
Gather context, check preconditions, and prepare for the first example step.
"""

# --- Flow Control ---
depends_on = [] # (Array of Strings, Required) Always empty for the start step.
next_step = "01_example_step.md" # (String, Required) Filename of the next step on successful completion.
# error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "" # (String, Optional) Mode responsible for executing the core logic of this step. Often empty for start.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed. Usually references overall workflow inputs.
    "Workflow Input: User request",
    "[Specify other inputs needed]",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "initial_context: Description of gathered context.",
    "[Specify other outputs produced]",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/24_workflow_step_start.md" # (String, Required) Link to this template definition.
+++

# Step 00: Start Basic Workflow Template

## Actions

1.  **Gather Initial Context:** (e.g., Read user request, check environment variables).
2.  **Validate Preconditions:** (e.g., Ensure required tools/files exist).
3.  **Prepare for Next Step:** (e.g., Format initial data).
4.  **(Optional) Delegate First Action:** If `delegate_to` is set, prepare message for delegation.

## Acceptance Criteria

*   Initial context is successfully gathered.
*   All preconditions are met.
*   Inputs for the next step (`01_example_step.md`) are ready.

## Error Handling

*   If preconditions fail, proceed to error handling (if `error_step` is defined).