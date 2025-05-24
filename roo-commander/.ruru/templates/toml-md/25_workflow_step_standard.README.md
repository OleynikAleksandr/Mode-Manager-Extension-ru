# Schema Documentation: Standard Workflow Step (`25_workflow_step_standard.md`)

This document outlines the TOML schema used for **standard intermediate step** files (e.g., `01_analyze.md`, `02_delegate.md`) within a specific workflow directory (e.g., `.ruru/workflows/WF-SOME_WORKFLOW-V1/`).

## Purpose

To define the actions, logic, flow control, and delegation for a typical step within a multi-step workflow. These steps consume inputs from previous steps and produce outputs for subsequent steps.

## TOML Schema

The following fields are defined within the `+++` TOML block:

*   **`step_id`** (String, Required)
    *   Unique identifier for this specific step within the workflow.
    *   Format: `WF-[WORKFLOW_NAME]-V[VERSION]-[NN]-[STEP_NAME]` (e.g., "WF-REPOMIX-V2-01-ANALYZE"). `NN` is the step number.

*   **`title`** (String, Required)
    *   Human-readable title for this specific step.
    *   Example: `"Step 01: Analyze Input Data"`.

*   **`description`** (String, Required)
    *   A multi-line string describing what this step accomplishes and the actions to be taken.

*   **`depends_on`** (Array of Strings, Required)
    *   A list of `step_id`s for the steps that must be successfully completed before this step can execute. This defines the workflow graph.
    *   Example: `["WF-REPOMIX-V2-00-START"]`.

*   **`next_step`** (String, Optional)
    *   The filename of the next step file (within the same directory) to execute upon successful completion of this step. Can be omitted if this step branches conditionally or leads to the finish step.
    *   Example: `"02_generate_report.md"`.

*   **`error_step`** (String, Optional)
    *   The filename of a designated error handling step file (within the same directory) to jump to if this step encounters a failure.

*   **`delegate_to`** (String, Optional)
    *   The slug of the specialist mode responsible for executing the core logic described in the Markdown body of this step. If omitted, the workflow orchestrator might handle the logic directly.

*   **`inputs`** (Array of Strings, Optional)
    *   Descriptions of the data or artifacts required for this step. Can reference specific outputs from steps listed in `depends_on`.
    *   Example: `"Output from step WF-REPOMIX-V2-00-START: initial_context"`.

*   **`outputs`** (Array of Strings, Optional)
    *   Descriptions of the data or artifacts produced by this step upon successful completion. These can be referenced as inputs by subsequent steps.
    *   Example: `"analysis_report: Path to the generated analysis file."`.

*   **`last_updated`** (String, Required)
    *   Date of the last modification in `YYYY-MM-DD` format. Use `{{DATE}}` as a placeholder for automatic updates.

*   **`template_schema_doc`** (String, Required)
    *   A relative path pointing to this documentation file.
    *   Value: `".ruru/templates/toml-md/25_workflow_step_standard.README.md"`

## Markdown Body Structure

The Markdown body typically outlines the actions performed in this step:

*   `# Step {{NN}}: {{title}}`: Main heading matching the `title` and step number.
*   `## Actions`: Details the specific actions, commands, checks, or instructions for this step. Can include checklists (`- [ ]`) for the `delegate_to` mode.
*   `## Acceptance Criteria`: Defines the conditions that must be met for the step to be considered successful (often related to producing the defined `outputs`).
*   `## Error Handling`: Describes how failures are handled, potentially referencing the `error_step`.

## Related Context

*   Workflow README template: `23_workflow_readme.md`.
*   Other workflow step templates: `24_workflow_step_start.md`, `26_workflow_step_finish.md`.