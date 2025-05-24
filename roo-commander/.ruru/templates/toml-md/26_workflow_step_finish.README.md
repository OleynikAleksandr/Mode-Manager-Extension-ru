# Schema Documentation: Workflow Finish Step (`26_workflow_step_finish.md`)

This document outlines the TOML schema used for the **final step** file (typically `99_finish.md`) within a specific workflow directory (e.g., `.ruru/workflows/WF-SOME_WORKFLOW-V1/`).

## Purpose

To define the finalization actions, cleanup, result aggregation, status determination, and reporting for a workflow. It serves as the terminal step for successful workflow execution paths.

## TOML Schema

The following fields are defined within the `+++` TOML block:

*   **`step_id`** (String, Required)
    *   Unique identifier for this specific step within the workflow.
    *   Conventionally uses step number 99.
    *   Format: `WF-[WORKFLOW_NAME]-V[VERSION]-99-FINISH`.

*   **`step_number`** (Integer, Required)
    *   The sequence number for this step. Conventionally `99` for the final step.

*   **`title`** (String, Required)
    *   Human-readable title for this final step.
    *   Example: `"Step 99: Finish Workflow"`.

*   **`description`** (String, Required)
    *   A multi-line string describing the purpose of this final step (aggregation, cleanup, reporting).

*   **`depends_on`** (Array of Strings, Required)
    *   A list of `step_id`s for the steps that must be successfully completed before this final step can execute. Usually includes the last standard step(s) in the workflow.
    *   Example: `["WF-REPOMIX-V2-03-SAVE_REPORT"]`.

*   **`next_step`** (String, Required)
    *   Must always be an empty string (`""`) for the finish step, indicating the end of the workflow path.

*   **`error_step`** (String, Optional)
    *   The filename of a designated error handling step file. Usually empty for the finish step itself, but could point to a final error reporting mechanism if finalization fails.

*   **`delegate_to`** (String, Optional)
    *   The slug of the specialist mode responsible for executing the finalization logic. Often empty if handled by the orchestrator or the delegate of the last standard step.

*   **`inputs`** (Array of Strings, Optional)
    *   Descriptions of the data or artifacts required for finalization, typically outputs from the steps listed in `depends_on`.
    *   Example: `"Output from step WF-REPOMIX-V2-03-SAVE_REPORT: report_path"`.

*   **`outputs`** (Array of Strings, Optional)
    *   Descriptions of the final outputs produced by the entire workflow.
    *   Example: `"workflow_result: Summary of success/failure and key outcomes."`.

*   **`last_updated`** (String, Required)
    *   Date of the last modification in `YYYY-MM-DD` format. Use `{{DATE}}` as a placeholder for automatic updates.

*   **`template_schema_doc`** (String, Required)
    *   A relative path pointing to this documentation file.
    *   Value: `".ruru/templates/toml-md/26_workflow_step_finish.README.md"`

## Markdown Body Structure

The Markdown body typically outlines the final actions:

*   `# Step 99: Finish Workflow`: Main heading matching the `title`.
*   `## Actions`: Describes the sequence of final operations (e.g., aggregating results, cleanup, reporting).
*   `## Acceptance Criteria`: Defines the conditions for successful workflow completion (e.g., final report generated, cleanup done).
*   `## Error Handling`: Describes how errors during finalization itself should be handled.

## Related Context

*   Workflow README template: `23_workflow_readme.md`.
*   Other workflow step templates: `24_workflow_step_start.md`, `25_workflow_step_standard.md`.