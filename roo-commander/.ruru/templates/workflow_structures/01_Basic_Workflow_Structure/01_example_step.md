+++
# --- Step Metadata ---
step_id = "WF-TEMPLATE-BASIC-V0-01-EXAMPLE" # (String, Required) Unique ID for this step (e.g., "WF-REPOMIX-V2-01-ANALYZE").
title = "Step 01: Example Standard Step" # (String, Required) Title of this specific step.
description = """
(String, Required) This is an example standard step.
Replace this with the specific actions and purpose of this step.
"""

# --- Flow Control ---
depends_on = ["WF-TEMPLATE-BASIC-V0-00-START"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "99_finish.md" # (String, Optional) Filename of the next step on successful completion. Can be empty if branching or finishing.
# error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "specialist-mode-slug" # (String, Optional) Mode responsible for executing the core logic of this step. << REPLACE or REMOVE >>

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed. Can reference outputs from 'depends_on' steps.
    "Output from step WF-TEMPLATE-BASIC-V0-00-START: initial_context",
    "[Specify other inputs needed]",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "example_output: Description of the output from this example step.",
    "[Specify other outputs produced]",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 01: Example Standard Step

## Actions

(Detail the specific actions, commands, checks, or instructions for this step. Can include checklists `- [ ]` for the delegate.)

1.  `- [ ] Perform action 1.`
2.  `- [ ] Perform action 2.`

## Acceptance Criteria

*   Action 1 completed successfully.
*   Action 2 completed successfully.
*   `example_output` artifact is generated.

## Error Handling

*   If action 1 fails, ... (proceed to `error_step` if defined).
*   If action 2 fails, ... (proceed to `error_step` if defined).