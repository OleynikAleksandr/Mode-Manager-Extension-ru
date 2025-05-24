+++
# --- Basic Metadata ---
id = "KB-MCP-REMOVE-CONFIRMATION-PROMPT-V1"
title = "Prompt: Confirm MCP Server Removal"
context_type = "kb"
scope = "Defines the prompt used to ask the user to confirm MCP server removal"
target_audience = ["agent-mcp-manager"]
granularity = "content"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mcp", "remove", "prompt", "confirmation", "configuration"]
related_context = [
    ".ruru/modes/agent-mcp-manager/kb/remove-mcp-server.md"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Contains the specific prompt text for confirming server removal."
+++

# Prompt: Confirm MCP Server Removal

This file contains the prompt content used by `agent-mcp-manager` when asking the user to confirm the removal of an MCP server (`KB-MCP-MANAGER-REMOVE-V0.1`).

**Prompt Content (for `ask_followup_question` tool):**

*   **Question:** "Are you sure you want to permanently remove the '{{server_to_remove}}' MCP server? This will delete its files in `.ruru/mcp-servers/` and its entry in `.roo/mcp.json`." *(Replace `{{server_to_remove}}` with the actual server name)*
*   **Follow-up Suggestions:**
    *   `Yes, remove {{server_to_remove}}` *(Replace `{{server_to_remove}}`)*
    *   `No, cancel removal`