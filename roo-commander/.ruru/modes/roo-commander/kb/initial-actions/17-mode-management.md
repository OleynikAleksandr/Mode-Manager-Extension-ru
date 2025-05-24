+++
id = "ROO-CMD-KB-INIT-17-MODE-MGMT-V1"
title = "Roo Commander KB: Initial Action - Mode Management"
context_type = "kb"
scope = "Procedure for handling the 'Mode Management' initial user selection"
target_audience = ["roo-commander"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "initialization", "mode-management", "workflow-routing", "roo-commander"]
related_context = [
    "../../../../.roo/rules-roo-commander/02-initialization-workflow-rule.md",
    "../../../../.ruru/workflows/WF-MODE-CREATION-V1/",
    "../../../../.ruru/workflows/WF-MODE-DELETE-V1/",
    "../../../../.ruru/workflows/WF-MODE-RULE-REFINEMENT-V1/",
    "../../../../.ruru/workflows/WF-CONTEXT7-ENRICHMENT-V2/",
    "../../../../.ruru/workflows/WF-CONTEXT7-REFRESH-V1/"
]
template_schema_doc = "../../../../.ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Defines the procedure triggered by selecting 'Mode Management'"
+++

# KB: Initial Action - Mode Management

This procedure is executed when the user selects Option 17 ("🧑‍🎨 Mode Management") from the standard initial prompt defined in rule `ROO-CMD-RULE-INIT-V5`.

**Procedure:**

1.  **Present Sub-Options:** Use `ask_followup_question` to present the available mode management workflows to the user.

    ```xml
     ask_followup_question
      <question>Which mode management task would you like to perform?</question>
      <follow_up>
        <suggest>Create a New Mode</suggest>
        <suggest>Delete an Existing Mode</suggest>
        <suggest>Refine Mode Rules</suggest>
        <suggest>Enrich Mode KB (using Context7)</suggest>
        <suggest>Refresh Mode KB (using Context7)</suggest>
        <suggest>Go back to main options</suggest>
      </follow_up>
     </ask_followup_question>
    ```

2.  **Handle User Selection:**
    *   **If "Create a New Mode":** Initiate the workflow defined in `.ruru/workflows/WF-MODE-CREATION-V1/`. Start by reading `.ruru/workflows/WF-MODE-CREATION-V1/README.md` or `.ruru/workflows/WF-MODE-CREATION-V1/00_start.md` to understand the steps.
    *   **If "Delete an Existing Mode":** Initiate the workflow defined in `.ruru/workflows/WF-MODE-DELETE-V1/`. Start by reading its `README.md` or `00_start.md`.
    *   **If "Refine Mode Rules":** Initiate the workflow defined in `.ruru/workflows/WF-MODE-RULE-REFINEMENT-V1/`. Start by reading its `README.md` or `00_start.md`.
    *   **If "Enrich Mode KB (using Context7)":** Initiate the workflow defined in `.ruru/workflows/WF-CONTEXT7-ENRICHMENT-V2/`. Start by reading its `README.md` or `00_start.md`.
    *   **If "Refresh Mode KB (using Context7)":** Initiate the workflow defined in `.ruru/workflows/WF-CONTEXT7-REFRESH-V1/`. Start by reading its `README.md` or `00_start.md`.
    *   **If "Go back to main options":** Re-present the standard initial prompt from rule `ROO-CMD-RULE-INIT-V5`.
    *   **Other/Unclear:** Ask for clarification.

3.  **Proceed with Workflow:** Follow the steps defined within the selected workflow directory.