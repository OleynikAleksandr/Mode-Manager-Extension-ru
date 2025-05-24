+++
# --- Workflow Metadata ---
id = "WF-STANDARDIZE-KB-READMES-V1" # (String, Required) Unique identifier
title = "Workflow: Standardize Mode KB READMEs" # (String, Required)
description = """
(String, Required) Standardizes the `README.md` file within the `kb` directory
of each mode (`.ruru/modes/[mode-slug]/kb/README.md`) using the template
`.ruru/templates/toml-md/27_kb_lookup_rule.md`. It extracts the existing
file index, merges it into the new template structure, updates metadata,
and overwrites the original file.
"""
version = "1.0.0" # (String, Required) Semantic version for the workflow definition.
status = "Draft" # (String, Required) Current status: "Draft", "Active", "Deprecated", "Experimental".
tags = ["workflow", "standardization", "kb", "readme", "maintenance", "refactor"] # (Array of Strings, Optional) Keywords for search/categorization.

# --- Execution Control ---
entry_point = "00_start.md" # (String, Required) Filename of the first step to execute.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Describe overall inputs needed to start the workflow.
    "Trigger signal (manual or automated).",
    "Optional: List of specific mode slugs to process.",
]
outputs = [ # (Array of Strings, Optional) Describe the expected final artifacts or outcomes.
    "Updated mode KB README files.",
    "Summary report/log of processed, skipped, or failed modes.",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/23_workflow_readme.md" # (String, Required) Link to the base template definition.
related_docs = [
    ".ruru/templates/toml-md/27_kb_lookup_rule.md", # The template being applied
    ".roo/rules/01-standard-toml-md-format.md"
] # (Array of Strings, Optional) Links to related rules, KBs, ADRs.
+++

# Workflow: Standardize Mode KB READMEs

## Overview

This workflow standardizes the `README.md` file within the `kb` directory of each mode (`.ruru/modes/[mode-slug]/kb/README.md`) using the template `.ruru/templates/toml-md/27_kb_lookup_rule.md`.

The process involves:
1.  Identifying all modes with a `kb/README.md`.
2.  For each mode:
    *   Reading the existing `kb/README.md`.
    *   Extracting the current KB file index.
    *   Reading the standard template (`27_kb_lookup_rule.md`).
    *   Merging the extracted index into the template structure.
    *   Updating TOML metadata (ID, title, audience, date, tags, kb_directory).
    *   Overwriting the mode's `kb/README.md` with the new content.

## Usage

This workflow can be triggered manually or by an orchestrator. It can process all modes found or a specific list provided as input.

## Inputs

*   **Trigger signal:** Manual execution command or automated trigger.
*   **(Optional) List of mode slugs:** If provided, only these modes will be processed. Otherwise, all modes with a `kb/README.md` will be targeted.

## Outputs

*   **Updated Files:** The `kb/README.md` file for each processed mode will be updated in place.
*   **Summary Report:** A log or report summarizing which modes were processed, which were skipped (e.g., no `kb/README.md` found), and any errors encountered.