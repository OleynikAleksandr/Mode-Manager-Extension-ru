+++
# --- Step Metadata ---
step_id = "WF-MODE-RULE-REFINEMENT-V1-01-READ_FILES" # (String, Required) Unique ID for this step.
title = "Step 01: Read Files for Review" # (String, Required) Title of this specific step.
description = """
(String, Required) Reads the content of all target rule files identified in the previous step 
using the Vertex AI MCP server.
"""

# --- Flow Control ---
depends_on = ["WF-MODE-RULE-REFINEMENT-V1-00-START"] # (Array of Strings, Required) step_ids this step needs completed first.
next_step = "02_request_ai_review.md" # (String, Optional) Filename of the next step on successful completion.
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails.

# --- Execution ---
delegate_to = "vertex-ai-mcp-server" # (String, Optional) Mode responsible for executing the core logic of this step.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "Output from step WF-MODE-RULE-REFINEMENT-V1-00-START: target_file_paths",
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "combined_file_content: The concatenated content of all target rule files.",
]

# --- Housekeeping ---
last_updated = "{{DATE}}" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 01: Read Files for Review

## Actions

1.  **Delegate to Vertex AI:** The coordinator (or orchestrator) uses the `use_mcp_tool` command targeting the `vertex-ai-mcp-server`.
2.  **Specify Tool:** The tool name is `read_multiple_files_content`.
3.  **Provide Input:** The `arguments` JSON object contains the `paths` key, which is an array of the `target_file_paths` received from the previous step.
    ```json
    {
      "paths": ["path/to/rule1.md", "path/to/rule2.md"] 
    }
    ```

## Acceptance Criteria

*   The `vertex-ai-mcp-server` successfully reads all files specified in `target_file_paths`.
*   The combined content (`combined_file_content`) is returned to the coordinator.

## Error Handling

*   If the `vertex-ai-mcp-server` fails to read one or more files, the error should be reported, and the workflow proceeds to `{{error_step}}`.