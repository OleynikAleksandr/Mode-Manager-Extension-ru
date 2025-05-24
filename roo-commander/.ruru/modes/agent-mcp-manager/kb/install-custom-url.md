+++
id = "AGENT-MCP-KB-INSTALL-CUSTOM-URL-V1.1" # Updated ID
title = "Agent MCP Manager: KB - Install Custom Server from GitHub URL"
context_type = "knowledge_base"
scope = "Procedure for installing a custom MCP server from a GitHub repository"
target_audience = ["agent-mcp-manager"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-05" # Updated date
tags = ["kb", "mcp", "install", "custom", "github", "agent-mcp-manager"]
related_context = [
    ".roo/rules-agent-mcp-manager/01-initialization-rule.md",
    ".roo/mcp.json", # Corrected config file path
    ".ruru/modes/agent-mcp-manager/kb/prompts/03-custom-url-prompt.md", # Added prompt ref
    ".ruru/modes/agent-mcp-manager/kb/prompts/04-custom-install-prompt.md", # Added prompt ref
    ".ruru/modes/agent-mcp-manager/kb/prompts/05-custom-registration-prompt.md" # Added prompt ref
    ]
template_schema_doc = ".ruru/templates/toml-md/14_kb_procedure.README.md"
relevance = "High: Defines the custom GitHub installation process"
+++

# KB: Install Custom Server from GitHub URL

This document outlines the procedure for installing a custom MCP server hosted in a GitHub repository.

**Procedure:**

1.  **Get GitHub URL:**
    *   Load prompt content from `.ruru/modes/agent-mcp-manager/kb/prompts/03-custom-url-prompt.md`.
    *   Use the `ask_followup_question` tool with the loaded question and suggestions.
    *   Await user input. If cancelled, report cancellation and stop.
    *   Store the provided URL. Validate it looks like a plausible git URL (basic check). If invalid, re-prompt or report failure.

2.  **Determine Target Directory:**
    *   Extract a repository name from the URL (e.g., `my-mcp-server` from `https://github.com/example-user/my-mcp-server.git`). Sanitize the name if necessary (remove `.git`, replace invalid characters).
    *   Define the target installation path: `.ruru/mcp-servers/custom/[sanitized-repo-name]`.

3.  **Clone Repository:**
    *   Use the `execute_command` tool to run: `git clone [PROVIDED_URL] [TARGET_DIRECTORY_PATH]`
    *   Example: `git clone https://github.com/example-user/my-mcp-server.git .ruru/mcp-servers/custom/my-mcp-server`
    *   Check the command result. If cloning fails, report the error and stop.

4.  **Run Installation Steps (If Applicable):**
    *   Load prompt content from `.ruru/modes/agent-mcp-manager/kb/prompts/04-custom-install-prompt.md`.
    *   Use the `ask_followup_question` tool with the loaded question (replacing placeholder) and suggestions.
    *   If the user provides commands:
        *   Use the `execute_command` tool with the `cwd` parameter set to `[TARGET_DIRECTORY_PATH]` to run the specified command(s). Handle potential multiple commands using appropriate OS chaining (Rule `05-os-aware-commands.md`).
        *   Check command results. Report errors if they occur.
    *   If the user selects "No installation needed" or cancels, proceed.

5.  **Gather Registration Details:**
    *   **CRITICAL:** Remind the user that this agent cannot directly modify the central configuration file (`.roo/mcp.json`).
    *   Load prompt content from `.ruru/modes/agent-mcp-manager/kb/prompts/05-custom-registration-prompt.md`.
    *   Use the `ask_followup_question` tool with the loaded question (replacing placeholder) and suggestions to gather:
        *   `server_name`: A unique name for this server.
        *   `start_command`: The command to start the server (relative to its directory).
        *   `type`: The server type (`stdio` or `sse`).
    *   Await user input for these details.

6.  **Report to Coordinator:**
    *   Once details are gathered, **report these details back to the coordinator** (`prime-coordinator` or `roo-commander`) using the `attempt_completion` tool.
    *   State clearly: "Custom server cloned to '[TARGET_DIRECTORY_PATH]' and installation steps run. Please register the server in `.roo/mcp.json` with the following details: Name='[server_name]', Start Command='[start_command]', Type='[type]'." *(Replace placeholders with gathered details)*.

7.  **Final Report:** After reporting the registration details to the coordinator, the agent's part in *this specific KB procedure* is complete. The final registration is handled externally.