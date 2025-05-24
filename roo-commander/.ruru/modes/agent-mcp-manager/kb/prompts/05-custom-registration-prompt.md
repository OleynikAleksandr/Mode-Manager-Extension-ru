+++
# --- Basic Metadata ---
id = "KB-MCP-CUSTOM-REGISTRATION-PROMPT-V1"
title = "Prompt: Request Custom MCP Server Registration Details"
context_type = "kb"
scope = "Defines the prompt used to ask the user for registration details for a custom MCP server"
target_audience = ["agent-mcp-manager"]
granularity = "content"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mcp", "custom", "prompt", "register", "configuration"]
related_context = [
    ".ruru/modes/agent-mcp-manager/kb/install-custom-url.md"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Contains the specific prompt text for registration detail collection."
+++

# Prompt: Request Custom MCP Server Registration Details

This file contains the prompt content used by `agent-mcp-manager` when asking the user for registration details for a custom MCP server (`AGENT-MCP-KB-INSTALL-CUSTOM-URL-V1`).

**Prompt Content (for `ask_followup_question` tool):**

*   **Question:** "The server code has been cloned to '[TARGET_DIRECTORY_PATH]' and installation steps (if any) were run. To complete the setup, the server needs to be registered in the main configuration (`.roo/mcp.json`). Please provide the necessary details:" *(Note: Replace `[TARGET_DIRECTORY_PATH]` with the actual path)*
*   **Follow-up Suggestions:** *(Provide example suggestions for the user to adapt based on the questions below)*
    *   "Server Name: my-custom-server | Start Command: node index.js | Type: stdio"
    *   "Server Name: another-server | Start Command: python main.py --port 8000 | Type: sse"
    *   "Cancel Registration"

**Details to Request (within the prompt or subsequent interaction):**

1.  **`server_name`**: A unique name for this server (e.g., `my-custom-server`).
2.  **`start_command`**: The command to start the server (e.g., `node index.js`, `python main.py`, `bun run start`). This command will be run from the server's directory (`[TARGET_DIRECTORY_PATH]`).
3.  **`type`**: The server type (`stdio` or `sse`).