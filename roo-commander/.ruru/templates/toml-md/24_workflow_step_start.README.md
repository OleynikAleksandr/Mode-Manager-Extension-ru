# Schema Documentation: Workflow Start Step (`24_workflow_step_start.md`)

This document outlines the TOML schema used for the **starting step** file (typically `00_start.md`) within a specific workflow directory (e.g., `.ruru/workflows/WF-SOME_WORKFLOW-V1/`).

## Purpose

To define the initial actions, context gathering, precondition checks, and flow control for initiating a workflow. It serves as the entry point defined in the workflow's main `README.md`.

## TOML Schema

The following fields are defined within the `+++` TOML block:

*   **`step_id`** (String, Required)
    *   Unique identifier for this specific step within the workflow.
    *   Format: `WF-[WORKFLOW_NAME]-V[VERSION]-00-START`.

*   **`title`** (String, Required)
    *   Human-readable title for this starting step.
    *   Example: `"Step 00: Start Workflow"`.

*   **`description`** (String, Required)
    *   A multi-line string describing the purpose of this initial step (setup, context gathering, checks).

*   **`depends_on`** (Array of Strings, Required)
    *   Must always be an empty array (`[]`) for the start step, as it has no preceding steps within the workflow.

*   **`next_step`** (String, Required)
    *   The filename of the next step file (within the same directory) to execute upon successful completion of this start step.
    *   Example: `"01_gather_details.md"`.

*   **`error_step`** (String, Optional)
    *   The filename of a designated error handling step file (within the same directory) to jump to if this start step encounters a failure (e.g., precondition check fails).

*   **`delegate_to`** (String, Optional)
    *   The slug of the mode responsible for executing the core logic of this step. Often empty for the start step if handled by the orchestrator, or set to an initial delegate.

*   **`inputs`** (Array of Strings, Optional)
    *   Descriptions of the data or artifacts required for this step to begin. Usually references the overall inputs defined in the workflow's main `README.md`.

*   **`outputs`** (Array of Strings, Optional)
    *   Descriptions of the data or artifacts produced by this step, which will likely serve as inputs for the `next_step`.

*   **`last_updated`** (String, Required)
    *   Date of the last modification in `YYYY-MM-DD` format. Use `{{DATE}}` as a placeholder for automatic updates.

*   **`template_schema_doc`** (String, Required)
    *   A relative path pointing to this documentation file.
    *   Value: `".ruru/templates/toml-md/24_workflow_step_start.README.md"`

## Markdown Body Structure

The Markdown body typically outlines the actions performed in this step:

*   `# Step 00: Start Workflow`: Main heading matching the `title`.
*   `## Actions`: Describes the sequence of operations (e.g., context gathering, validation).
*   `## Acceptance Criteria`: Defines the conditions that must be met for the step to be considered successful.
*   `## Error Handling`: Describes how failures are handled, potentially referencing the `error_step`.

## Related Context

*   Workflow README template: `23_workflow_readme.md`.
*   Other workflow step templates: `25_workflow_step_standard.md`, `26_workflow_step_finish.md`.