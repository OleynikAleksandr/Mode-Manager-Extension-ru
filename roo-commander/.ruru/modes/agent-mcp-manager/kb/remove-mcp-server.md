+++
id = "KB-MCP-MANAGER-REMOVE-V1.0" # Updated ID and version
title = "KB: Remove MCP Server"
status = "active" # Changed from draft
created_date = "2025-04-24"
updated_date = "2025-05-05" # Updated date
version = "1.0" # Updated version
tags = ["kb", "agent-mcp-manager", "workflow", "mcp", "remove", "uninstall", "configuration", "cleanup"]
owner = "agent-mcp-manager"
related_docs = [
    ".roo/rules-agent-mcp-manager/01-initialization-rule.md",
    ".roo/mcp.json",
    ".ruru/modes/agent-mcp-manager/kb/prompts/06-remove-selection-prompt.md", # Added prompt ref
    ".ruru/modes/agent-mcp-manager/kb/prompts/07-remove-confirmation-prompt.md" # Added prompt ref
    ]
objective = "To safely remove an installed MCP server, including its files and configuration entry."
scope = "Executed when the user selects the 'Remove MCP Server' option."
roles = ["Agent (agent-mcp-manager)", "User"]
trigger = "User selection of '🗑️ Remove an existing MCP Server'."
success_criteria = [
    "User successfully selects a server to remove.",
    "User confirms the removal action.",
    "Server directory (e.g., `.ruru/mcp-servers/<server-name>`) is deleted.",
    "Server entry is removed from `.roo/mcp.json`.",
    "Agent reports successful removal."
    ]
failure_criteria = [
    "Agent cannot read/parse `.roo/mcp.json`.",
    "No servers are installed or available for removal.",
    "User cancels the selection or confirmation.",
    "Agent fails to delete the server directory.",
    "Agent fails to update `.roo/mcp.json`."
    ]
target_audience = ["agent-mcp-manager"]
template_schema_doc = ".ruru/templates/toml-md/14_kb_procedure.README.md" # Added template schema doc
+++

# KB Procedure: Remove MCP Server

## 1. Objective 🎯
Safely remove an installed MCP server by deleting its directory and removing its configuration entry from `.roo/mcp.json` after user confirmation.

## 2. Preconditions🚦
*   `.roo/mcp.json` exists.

## 3. Procedure Steps 🪜

1.  **Read Configuration & List Servers:**
    *   Use the `read_file` tool to load `.roo/mcp.json`.
    *   Parse the JSON. Handle potential errors (e.g., file not found, invalid JSON). If errors occur, report failure and stop.
    *   Extract the names (keys) of the servers listed under the `mcpServers` object.
    *   If no servers are found (i.e., `mcpServers` object is empty or missing), report "No MCP servers are currently configured for removal." using the `attempt_completion` tool and stop.

2.  **Prompt User for Selection:**
    *   Load prompt content from `.ruru/modes/agent-mcp-manager/kb/prompts/06-remove-selection-prompt.md`.
    *   Use the `ask_followup_question` tool with the loaded question. Dynamically generate suggestions for each server name found in step 1, and add a final suggestion for "Cancel Removal".
    *   Store the user's selected server name (e.g., `server_to_remove`). If the user cancels, inform them "Removal cancelled." and stop the procedure.

3.  **Confirm Removal:**
    *   Load prompt content from `.ruru/modes/agent-mcp-manager/kb/prompts/07-remove-confirmation-prompt.md`.
    *   Use the `ask_followup_question` tool with the loaded question (replacing the `{{server_to_remove}}` placeholder) and the defined suggestions.
    *   If the user selects "No", inform them "Removal cancelled." and stop the procedure.

4.  **Delete Server Directory:**
    *   Define `target_dir`: `.ruru/mcp-servers/{{server_to_remove}}` (replace placeholder).
    *   Inform the user: "Attempting to delete server directory: {{target_dir}}..."
    *   Use the `execute_command` tool to run `rm -rf {{target_dir}}` (replace placeholder).
    *   Check the exit code. Log any errors (e.g., "Warning: Failed to delete directory {{target_dir}}. It might not exist or there could be a permissions issue.") but proceed to the next step regardless.

5.  **Update MCP Configuration (`.roo/mcp.json`):**
    *   Inform the user: "Removing '{{server_to_remove}}' from `.roo/mcp.json`..." (replace placeholder).
    *   Use the parsed JSON data from Step 1 (or re-read if necessary).
    *   Check if the key `{{server_to_remove}}` exists in the `mcpServers` object.
    *   If it exists, delete the key `{{server_to_remove}}` from the `mcpServers` object.
    *   If it doesn't exist, note this ("Server entry already absent from configuration.") but continue.
    *   Use the `write_to_file` tool to save the modified JSON object back to `.roo/mcp.json`. Ensure proper formatting (e.g., using `JSON.stringify(data, null, 2)`).
    *   Verify success. If `write_to_file` fails, report the error and stop.

6.  **Report Completion:**
    *   Use the `attempt_completion` tool with the message: "Successfully removed the '{{server_to_remove}}' MCP server configuration. Directory removal status logged. You may need to reload extensions and/or VS Code if the server was running." (replace placeholder).

## 4. Rationale / Notes 🤔
*   Includes user selection and confirmation steps for safety.
*   Attempts to remove both files and configuration, logging directory deletion errors but continuing to ensure config cleanup.
*   Does not currently handle stopping the server process before removal - this is a potential enhancement for the core MCP system.
*   Uses `rm -rf`, which is powerful; requires careful implementation by the agent to ensure the `target_dir` variable is correctly substituted.