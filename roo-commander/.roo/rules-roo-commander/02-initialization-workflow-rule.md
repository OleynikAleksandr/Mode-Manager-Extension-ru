+++
id = "ROO-CMD-RULE-INIT-V7" # Incremented version
title = "Roo Commander: Rule - Initial Request Processing & Mode Management (Decision Tree)" # Updated title
context_type = "rules"
scope = "Initial user interaction handling, presenting structured starting options (dynamically loaded from decision tree prompt) and routing to specific KB procedures" # Updated scope
target_audience = ["roo-commander"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "workflow", "initialization", "onboarding", "intent", "options", "kb-routing", "roo-commander", "mode-management", "dynamic-prompt", "decision-tree"] # Added tags
related_context = [
    "01-operational-principles.md",
    ".ruru/modes/roo-commander/kb/prompts/initial-options-prompt.md", # Source of options
    ".ruru/modes/roo-commander/kb/initial-actions/action-mapping.md", # Mapping file
    # Key delegate modes (referenced by KB procedures or direct actions)
    "manager-onboarding",
    "dev-git",
    "core-architect",
    "manager-product",
    "agent-research",
    "prime-coordinator",
    "dev-fixer",
    "util-refactor",
    "util-writer",
    "util-workflow-manager" # Maps to 4.3
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Defines the entry point for user interaction and routes to specific procedures"
+++

# Rule: Initial Request Processing (Explicit KB Routing via Decision Tree)

This rule governs how you handle the **first user message** in a session. If the user's intent isn't immediately clear or requires clarification, it involves presenting structured starting options (based on a decision tree prompt) to guide the user and initiate the correct workflow by executing procedures defined in specific Knowledge Base (KB) files.

**Procedure:**

1.  **Analyze Initial User Request:**
    *   Check for explicit mode switch requests ("switch to `[mode-slug]`").
    *   Briefly analyze keywords if the user states a goal directly.

2.  **Determine Response Path:**

    *   **A. Direct Mode Request:**
        *   If user explicitly requests switching to a specific mode: Confirm understanding and use the `switch_mode` tool. Log action (Rule `08`). **End this workflow.**

    *   **B. Direct Goal Stated (High Confidence - Non-Onboarding):**
        *   If the user's first message clearly states a goal that confidently maps to a specific action *other than onboarding/setup* (e.g., "fix bug 123", "refactor `userService.js`"):
            1.  Acknowledge the goal.
            2.  Propose the most relevant specialist mode using the `ask_followup_question` tool.
            3.  Include suggestions like "Yes, use [Proposed Mode]" and "No, show me the main starting options".
            4.  If "Yes", proceed to standard delegation (Rule `03`). Log action. **End this workflow.**
            5.  If "No", proceed to **Path C**.

    *   **C. All Other Cases (Default Path):**
        *   Includes: Vague requests ("hi", "hello"), requests for help/options, requests initially mentioning "new project" or "onboard existing", or user selecting "No" in Path B.
        *   **Action:** Present the **Standard Initial Options (Decision Tree)**.
            1.  Use the `read_file` tool to get the content of `.ruru/modes/roo-commander/kb/prompts/initial-options-prompt.md`.
            2.  Parse the "Top-Level Question" text and the *top-level categories* (e.g., "1. 🚀 Start or Onboard a Project:", "2. 💻 Work on Project Code / Docs:", etc.) from the "Option Tree" structure within the file content.
            3.  Use the `ask_followup_question` tool, providing the parsed question and the extracted top-level categories as suggestions.
            4.  Await user's selection of a top-level category. Proceed to Step 3.

3.  **Handle User Selection (from Initial Options):**

    *   **If a top-level category (e.g., "1", "2") was selected:**
        1.  Use `read_file` again on `.ruru/modes/roo-commander/kb/prompts/initial-options-prompt.md` (or use cached content if available).
        2.  Extract the sub-options (e.g., "1.1", "1.2", etc.) corresponding to the chosen category.
        3.  Use the `ask_followup_question` tool again, asking the user to choose from these specific sub-options.
        4.  Await user's selection of a sub-option. Proceed to Step 4.

    *   **(Alternative Implementation Note):** Depending on UI capabilities, the full tree might be presented initially. If so, skip the intermediate step and proceed directly to Step 4 based on the user's specific selection (e.g., "1.1", "4.2"). This rule describes the logical flow, assuming a potential two-step interaction.

4.  **Route to KB Procedure (Based on Final Selection):**
    *   Once the user selects a *specific, final option* (e.g., "1.1", "2.3", "4.2", "5.4"):
        1.  Identify the selected option number (e.g., `1.1`, `2.3`).
        2.  Log the chosen starting path (Rule `08`).
        3.  **Determine Action/Procedure from Mapping:**
            *   Use the `read_file` tool to load the content of the mapping file: `.ruru/modes/roo-commander/kb/initial-actions/action-mapping.md`.
            *   Parse the mapping file to find the entry corresponding to the selected option number (e.g., `1.1`).
            *   Extract the associated KB procedure path (e.g., `.ruru/modes/roo-commander/kb/initial-actions/01-start-new-project.md`) or direct action (e.g., `switch_mode` to `util-workflow-manager`).
        4.  **Execute Action/Procedure:**
            *   If a KB path was found: Execute the detailed procedure defined in that KB file.
            *   If a direct action (like `switch_mode`) was found: Perform that action using the appropriate tool.
        5.  Follow the steps within the chosen KB procedure or subsequent workflow, including any user interaction or delegation it defines. **End this initialization workflow** upon completion of the KB procedure or delegated workflow.

**Key Objective:** To provide clear, structured starting options (when needed) by dynamically reading and potentially presenting a decision tree prompt, route the user interaction to the precise, detailed procedure stored in the relevant Knowledge Base file, and streamline interaction for clear initial requests, ensuring consistent handling while minimizing default context load.