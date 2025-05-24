# Schema Documentation: Workflow README (`23_workflow_readme.md`)

This document outlines the TOML schema used for the main `README.md` file within a specific workflow directory (e.g., `.ruru/workflows/WF-SOME_WORKFLOW-V1/README.md`).

## Purpose

To provide a high-level overview, metadata, and usage instructions for a defined workflow composed of multiple step files. It serves as the primary documentation entry point for understanding and executing the workflow.

## TOML Schema

The following fields are defined within the `+++` TOML block:

*   **`id`** (String, Required)
    *   Unique identifier for the workflow definition.
    *   Format: `WF-[WORKFLOW_NAME]-V[VERSION]` (e.g., "WF-REPOMIX-COMPREHENSIVE-V2").

*   **`title`** (String, Required)
    *   Human-readable title for the workflow.
    *   Example: "Workflow: Comprehensive Repomix Analysis".

*   **`description`** (String, Required)
    *   A multi-line string describing the workflow's purpose, goals, and overall process.

*   **`version`** (String, Required)
    *   Semantic version (e.g., "1.0.0") for this specific version of the workflow definition.

*   **`status`** (String, Required)
    *   Current lifecycle status of the workflow.
    *   Allowed values: `"Draft"`, `"Active"`, `"Deprecated"`, `"Experimental"`.

*   **`tags`** (Array of Strings, Optional)
    *   Keywords for search and categorization (e.g., "workflow", "analysis", "repomix").

*   **`entry_point`** (String, Required)
    *   The filename of the first step file (within the same directory) that initiates the workflow execution.
    *   Example: `"00_start.md"`.

*   **`inputs`** (Array of Strings, Optional)
    *   Descriptions of the overall inputs required to start the workflow successfully.

*   **`outputs`** (Array of Strings, Optional)
    *   Descriptions of the expected final artifacts or outcomes produced by the workflow upon successful completion.

*   **`last_updated`** (String, Required)
    *   Date of the last modification in `YYYY-MM-DD` format. Use `{{DATE}}` as a placeholder for automatic updates.

*   **`template_schema_doc`** (String, Required)
    *   A relative path pointing to this documentation file.
    *   Value: `".ruru/templates/toml-md/23_workflow_readme.README.md"`

*   **`related_docs`** (Array of Strings, Optional)
    *   Links to related rules, KBs, ADRs, or other relevant documentation.

## Markdown Body Structure

The Markdown body uses placeholders (`{{...}}`) intended to be populated from the TOML frontmatter:

*   `# Workflow: {{title}}`: Main heading.
*   `## Overview`: Contains the `{{description}}`.
*   `## Usage`: Section for manual instructions on how to initiate/use the workflow.
*   `## Inputs`: Details the required inputs described in the `inputs` array.
*   `## Outputs`: Details the expected outputs described in the `outputs` array.

## Related Context

*   Workflow step templates: `24_workflow_step_start.md`, `25_workflow_step_standard.md`, `26_workflow_step_finish.md`.