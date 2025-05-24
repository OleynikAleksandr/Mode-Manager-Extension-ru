+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-00-START" # (String, Required) Unique ID for this step.
title = "Step 00: Start Rule Refinement Workflow" # (String, Required) Title of this specific step.
description = """
(String, Required) Initial setup: Identify target rule files within a specified mode's rule directory, 
define the review objective, check preconditions (Vertex AI connected), 
and prepare for the first action (reading files).
"""

# --- Flow Control ---
depends_on = [] # (Array of Strings, Required) Always empty for the start step.
next_step = "01_read_files_for_review.md" # (String, Required) Filename of the next step on successful completion.
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "prime-coordinator" # (String, Optional) Coordinator handles this initial identification step.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Workflow Input: User request or Coordinator analysis triggering the refinement.",
    "Workflow Input: Path to the target mode's rule directory (e.g., .roo/rules-mode-spec-repomix/)."
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "target_file_paths: List of specific rule file paths to review.",
    "review_objective: Clear goal for the AI review (e.g., check accuracy, improve clarity).",
    "source_material_path: Optional path to external documentation for comparison."
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/24_workflow_step_start.md" # (String, Required) Link to this template definition.
+++

# Step 00: Start Rule Refinement Workflow

## Actions

1.  **Identify Target Files:** Based on the input directory, identify the specific `.md` rule files requiring review. Use `list_files` if needed.
2.  **Define Review Goal:** Determine the specific objective for the AI review (e.g., "Check rules against best practices in `related_doc.md`", "Suggest improvements for clarity and completeness").
3.  **Validate Preconditions:** Confirm the `vertex-ai-mcp-server` is connected and available.
4.  **Prepare for Next Step:** Collate the list of `target_file_paths` and the `review_objective`.

## Acceptance Criteria

*   A list of `target_file_paths` within the specified directory is generated.
*   A clear `review_objective` is defined.
*   The `vertex-ai-mcp-server` is confirmed to be available.
*   Inputs for the next step (`{{next_step}}`) are ready.

## Error Handling

*   If the target directory doesn't exist or contains no rule files, proceed to `{{error_step}}`.
*   If the `vertex-ai-mcp-server` is unavailable, proceed to `{{error_step}}`.