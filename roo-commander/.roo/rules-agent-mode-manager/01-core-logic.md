+++
id = "AGENT-MODE-MANAGER-RULE-CORE-V1"
title = "Agent Mode Manager: Rule - Core Request Handling"
context_type = "rules"
scope = "Core logic for analyzing mode management requests and initiating workflows/SOPs"
target_audience = ["agent-mode-manager"]
granularity = "procedure"
status = "development"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "agent", "mode-management", "workflow", "delegation"]
related_context = [
    ".ruru/modes/agent-mode-manager/agent-mode-manager.mode.md", # Workspace-relative path
    # Add mapping KB path here later, e.g., ".ruru/modes/agent-mode-manager/kb/action-mapping.md"
    ".ruru/workflows/WF-MODE-CREATION-V1/", # Workspace-relative path
    ".ruru/workflows/WF-MODE-DELETE-V1/", # Workspace-relative path
    ".ruru/workflows/WF-MODE-RULE-REFINEMENT-V1/", # Workspace-relative path
    ".ruru/workflows/WF-CONTEXT7-ENRICHMENT-V2/", # Workspace-relative path
    ".ruru/workflows/WF-CONTEXT7-REFRESH-V1/", # Workspace-relative path
    ".ruru/processes/SOP-01-Mode-Refactoring.md" # Workspace-relative path
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Defines the primary function of the agent."
+++

# Rule: Core Request Handling

**Objective:** Analyze the user's request related to mode lifecycle management and initiate the appropriate workflow or SOP.

**Procedure:**

1.  **Receive & Analyze Request:** Understand the user's goal (create, edit, delete, refine, enrich, refactor mode).
2.  **Determine Action:**
    *   Use internal logic or consult a mapping KB (to be created, e.g., `.ruru/modes/agent-mode-manager/kb/action-mapping.md`) to determine the specific workflow/SOP path based on the user's goal.
    *   *Example Mappings (Conceptual):*
        *   `create` -> `.ruru/workflows/WF-MODE-CREATION-V1/README.md`
        *   `delete` -> `.ruru/workflows/WF-MODE-DELETE-V1/README.md`
        *   `refactor` -> `.ruru/processes/SOP-01-Mode-Refactoring.md`
        *   `edit rule` -> `.ruru/workflows/WF-MODE-RULE-REFINEMENT-V1/README.md`
        *   `enrich context` -> `.ruru/workflows/WF-CONTEXT7-ENRICHMENT-V2/README.md`
        *   `refresh context` -> `.ruru/workflows/WF-CONTEXT7-REFRESH-V1/README.md`
3.  **Gather Information (If Needed):** If the selected workflow/SOP requires specific inputs (e.g., mode slug, file paths), use `ask_followup_question` to gather them from the user.
4.  **Initiate Workflow/SOP:**
    *   Use `new_task` to delegate the execution of the selected workflow/SOP to an appropriate coordinator or executor mode (e.g., `roo-commander`, `prime-coordinator`).
    *   Provide the path to the workflow/SOP and any gathered information in the task message.
    *   *Example Delegation:* `new_task` to `roo-commander`, message: "Initiate workflow: `.ruru/workflows/WF-MODE-CREATION-V1/README.md`. Mode Name: 'new-example-mode'."
5.  **Report Initiation:** Inform the user that the process has been initiated using `attempt_completion`.

**(Note: This is a basic structure. Error handling, more sophisticated analysis, and interaction patterns will need further refinement.)**