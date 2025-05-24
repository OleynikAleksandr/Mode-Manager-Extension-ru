+++
# --- Workflow Metadata ---
id = "WF-TEMPLATE-BASIC-V0" # (String, Required) Unique identifier (e.g., "WF-REPOMIX-COMPREHENSIVE-V2")
title = "Workflow: Basic Structure Template" # (String, Required)
description = """
(String, Required) This is a basic workflow structure template.
Replace this description with the specific purpose, goals,
and overall process of the new workflow.
"""
version = "0.1.0" # (String, Required) Semantic version for the workflow definition.
status = "Draft" # (String, Required) Current status: "Draft", "Active", "Deprecated", "Experimental".
tags = ["workflow", "template", "basic"] # (Array of Strings, Optional) Keywords for search/categorization.

# --- Execution Control ---
entry_point = "00_start.md" # (String, Required) Filename of the first step to execute.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Describe overall inputs needed to start the workflow.
    "User request detailing the goal.",
    "[Specify other inputs needed]",
]
outputs = [ # (Array of Strings, Optional) Describe the expected final artifacts or outcomes.
    "Final result summary.",
    "[Specify other outputs produced]",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/23_workflow_readme.md" # (String, Required) Link to this template definition.
related_docs = [] # (Array of Strings, Optional) Links to related rules, KBs, ADRs.
+++

# Workflow: Basic Structure Template

## Overview

This is a basic workflow structure template.
Replace this description with the specific purpose, goals,
and overall process of the new workflow.

## Usage

(Provide instructions on how to initiate and use this workflow once defined)

## Inputs

*   User request detailing the goal.
*   [Specify other inputs needed]

## Outputs

*   Final result summary.
*   [Specify other outputs produced]