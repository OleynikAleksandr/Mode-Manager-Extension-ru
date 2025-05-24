+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-03-ANALYZE_REVIEW" # (String, Required) Unique ID for this step.
title = "Step 03: Analyze Review & Plan Updates" # (String, Required) Title of this specific step.
description = """
(String, Required) The coordinator reads the AI-generated review document, analyzes the suggestions, 
and formulates a detailed plan of specific, actionable changes for each target rule file.
"""

# --- Flow Control ---
depends_on = ["WF-MODE-RULE-REFINEMENT-V1-02-REQUEST_AI_REVIEW"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "04_apply_updates_iteratively.md" # (String, Optional) Filename of the next step on successful completion.
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator performs the analysis and planning.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Output from step WF-MODE-RULE-REFINEMENT-V1-02-REQUEST_AI_REVIEW: review_output_path",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "update_plan: A structured plan detailing changes per file (e.g., diffs, instructions).",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 03: Analyze Review & Plan Updates

## Actions

1.  **Read Review:** The coordinator uses `read_file` to load the content of the `review_output_path` generated in the previous step.
2.  **Analyze Suggestions:** Carefully evaluate the AI's feedback, suggestions, and identified issues against the original `review_objective` and the rule files' context.
3.  **Formulate Plan:** For each actionable suggestion:
    *   Determine the exact change needed (e.g., generate a diff using `apply_diff` format, specify text for `search_and_replace`, or prepare full content for `write_to_file`).
    *   Identify the target file path for the change.
    *   Note any required version increments or updates to related documentation mentioned in the review.
4.  **Structure Plan:** Organize the planned changes clearly, grouped by the target file path. This becomes the `update_plan`.

## Acceptance Criteria

*   The AI review document (`review_output_path`) is successfully read and analyzed.
*   A clear, actionable `update_plan` is created, detailing specific changes for each target file.

## Error Handling

*   If the review document cannot be read, proceed to `{{error_step}}`.
*   If the review content is unusable or nonsensical, the coordinator may need to refine the query (Step 2) or escalate, potentially proceeding to `{{error_step}}`.