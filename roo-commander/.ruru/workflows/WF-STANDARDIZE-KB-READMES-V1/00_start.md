+++
# --- Step Metadata ---
step_id = "WF-STANDARDIZE-KB-READMES-V1-00-START" # (String, Required) Unique ID for this step.
title = "Step 00: Identify Target Mode KB READMEs" # (String, Required) Title of this specific step.
description = """
(String, Required) Identifies mode directories within `.ruru/modes/` and checks
for the existence of `kb/README.md` files. Compiles a list of paths to process,
optionally filtered by a user-provided list of mode slugs.
"""

# --- Flow Control ---
depends_on = [] # (Array of Strings, Required) Always empty for the start step.
next_step = "01_process_mode_readme.md" # (String, Required) Filename of the next step on successful completion.
# error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "agent-context-discovery" # (String, Optional) Discovery agent can list files/dirs and check existence.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed. Usually references overall workflow inputs.
    "Workflow Input: Optional list of specific mode slugs (e.g., `specific_mode_slugs`).",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "mode_readme_paths: List of relative paths to existing mode KB README files to be processed.",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/24_workflow_step_start.md" # (String, Required) Link to this template definition.
+++

# Step 00: Identify Target Mode KB READMEs

## Actions

1.  **Read Inputs:** Check for optional `specific_mode_slugs` input list.
2.  **List Mode Directories:** Use file system tools (e.g., `list_files` on `.ruru/modes/` with `recursive=false`) to get a list of all mode directories.
3.  **Filter Modes (Optional):** If `specific_mode_slugs` is provided, filter the directory list to include only those specified.
4.  **Check for KB READMEs:** For each remaining mode directory `[mode_dir]`:
    *   Check if the file `[mode_dir]/kb/README.md` exists (e.g., using `get_filesystem_info` or similar).
5.  **Compile Path List:** Create the `mode_readme_paths` output list containing the relative paths of all existing `kb/README.md` files found within the target scope.

## Acceptance Criteria

*   The `mode_readme_paths` list is correctly populated with all existing KB README paths within the target scope (all modes or specified modes).
*   If no target READMEs are found, the `mode_readme_paths` list is empty.

## Error Handling

*   If the `.ruru/modes/` directory cannot be accessed or listed, the step fails. Proceed to `error_step` if defined.