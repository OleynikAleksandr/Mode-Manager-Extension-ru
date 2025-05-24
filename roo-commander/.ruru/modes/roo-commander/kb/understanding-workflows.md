+++
id = "ROO-CMD-KB-UNDERSTANDING-WORKFLOWS-V1"
title = "Roo Commander KB: Understanding and Executing Workflows"
context_type = "kb_article"
scope = "Provides guidance to Roo Commander on how to interpret and execute workflow tasks, especially when a workflow is a directory."
target_audience = ["roo-commander"]
granularity = "procedure"
status = "active"
last_updated = "2025-08-05"
tags = ["kb", "workflow", "execution", "roo-commander", "directory-workflow"]
related_context = [
    ".roo/rules-roo-commander/02-initialization-workflow-rule.md",
    ".ruru/modes/roo-commander/kb/03-workflow-coordination.md",
    ".ruru/workflows/"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Clarifies how Roo Commander should handle workflow execution, particularly for directory-based workflows."
+++

# Understanding and Executing Workflows

This knowledge base article provides guidance for Roo Commander on how to correctly interpret and initiate the execution of workflows, especially when a workflow is represented by a directory path rather than a single file.

## 1. Workflow Representation

*   **Single File:** Some workflows might be defined in a single `.md` file.
*   **Directory:** More commonly, complex workflows (e.g., those in `.ruru/workflows/`) are structured as **directories**. These directories contain multiple files, often including a primary entry point file (like `README.md` or `00_start.md`) and other supporting documents, scripts, or sub-workflows.

## 2. Executing Directory-Based Workflows

When instructed to execute a workflow that is specified by a directory path (e.g., "Execute workflow `.ruru/workflows/WF-SOME-WORKFLOW-V1/`"):

1.  **Identify Entry Point:**
    *   **Primary Check:** Look for a `README.md` file within the specified workflow directory. This is often the main document outlining the workflow's purpose, steps, and how to begin.
    *   **Secondary Check:** If `README.md` is not present or doesn't seem to be the entry point, look for a file named `00_start.md` or a similarly named file that clearly indicates the starting point of the workflow.
    *   **Fallback:** If neither is obvious, you may need to list the files in the directory and make an informed decision or ask for clarification.

2.  **Process Entry Point:**
    *   Once the entry point file is identified (e.g., `.ruru/workflows/WF-SOME-WORKFLOW-V1/README.md`), read its content.
    *   The entry point document will typically describe the first step to take, which might involve:
        *   Delegating to a specific mode.
        *   Executing a command.
        *   Reading another file within the workflow directory.
        *   Presenting options to the user.

3.  **Follow Workflow Instructions:**
    *   Adhere to the instructions provided within the workflow's documentation (starting with the entry point file).
    *   Workflows are designed to be self-describing. Your role is to interpret these instructions and coordinate the necessary actions.

## 3. Example

If given the instruction: "Run the GitHub release workflow: `.ruru/workflows/WF-CREATE-ROO-CMD-BUILD-V1/`"

*   **Action:**
    1.  Recognize that `.ruru/workflows/WF-CREATE-ROO-CMD-BUILD-V1/` is a directory.
    2.  Look for `.ruru/workflows/WF-CREATE-ROO-CMD-BUILD-V1/README.md`.
    3.  Read [`./.ruru/workflows/WF-CREATE-ROO-CMD-BUILD-V1/README.md`](./.ruru/workflows/WF-CREATE-ROO-CMD-BUILD-V1/README.md) and follow the instructions therein to start the workflow.

By following this approach, Roo Commander can effectively manage and execute both simple and complex, directory-based workflows.