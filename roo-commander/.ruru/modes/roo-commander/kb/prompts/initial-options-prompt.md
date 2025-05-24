+++
id = "ROO-CMD-KB-PROMPT-INIT-OPTIONS-V2" # Updated version
title = "Roo Commander KB: Prompt Text - Initial Options (Decision Tree)" # Updated title
context_type = "kb_prompt_text" # Indicate this file contains text for constructing a prompt
scope = "Provides the text content for the initial user options prompt in a decision tree format" # Updated scope
target_audience = ["roo-commander"] # Consumed by the initialization rule
granularity = "component"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "prompt-text", "initialization", "options", "roo-commander", "decision-tree"] # Added tag
related_context = [
    "../../../../.roo/rules-roo-commander/02-initialization-workflow-rule.md"
]
template_schema_doc = "../../../../.ruru/templates/toml-md/20_kb_prompt_text.README.md" # Hypothetical template for this type
relevance = "High: Contains the text for the main user entry point prompt"
+++

# Initial Options Prompt Text (Decision Tree)

**Instruction:** Use the following Question and Suggestions structure to guide the user through initial choices, potentially using multiple `ask_followup_question` calls if needed, or presenting the tree directly.

## Top-Level Question

Welcome to Roo Commander v7 (Wallaby)! How can I assist you today?

## Option Tree

1.  **🚀 Start or Onboard a Project:**
    *   `1.1` 🎩 Start a NEW project from scratch
    *   `1.2` 📂 Analyze/Onboard the CURRENT project workspace
    *   `1.3` 🌐 Clone a Git repository & onboard
    *   `1.4` 🗃️ Use existing project files/plans to define the work

2.  **💻 Work on Project Code / Docs:**
    *   `2.1` 📑 Plan/Design a new feature or project
    *   `2.2` 🐞 Fix a specific bug
    *   `2.3` ♻️ Refactor or improve existing code
    *   `2.4` ✍️ Write or update documentation

3.  **📋 Manage Project / Tasks / Execution:**
    *   `3.1` 📟 Review project status / Manage tasks (MDTM)
    *   `3.2` 🎺 Execute a command / Delegate a specific known task

4.  **⚙️ Configure Roo / Meta Actions:**
    *   `4.1` 🔌 Install/Manage MCP Servers
    *   `4.2` 🧑‍🎨 Mode Management (Create, Edit)
    *   `4.3` 📜 Workflow Management (Create, Edit)
    *   `4.4` 🪃 Manage Roo Configuration (Rules, Settings - Advanced)
    *   `4.5` 🖲️ Update my preferences / profile
*   `4.6` 📦 Build release on GitHub

5.  **❓ Ask / Learn / Other:**
    *   `5.1` ❓ Research a topic / Ask a technical question
    *   `5.2` 🦘 Learn about Roo Commander capabilities
    *   `5.3` 🐾 Join the Roo Commander Community (Discord)
    *   `5.4` 🤔 Something else... (Describe your goal)