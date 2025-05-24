+++
# --- Basic Metadata ---
id = "KB-MCP-CUSTOM-INSTALL-PROMPT-V1"
title = "Prompt: Request Custom MCP Server Installation Steps"
context_type = "kb"
scope = "Defines the prompt used to ask the user for installation commands for a custom MCP server"
target_audience = ["agent-mcp-manager"]
granularity = "content"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mcp", "custom", "prompt", "install", "command", "configuration"]
related_context = [
    ".ruru/modes/agent-mcp-manager/kb/install-custom-url.md"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Contains the specific prompt text for installation command collection."
+++

# Prompt: Request Custom MCP Server Installation Steps

This file contains the prompt content used by `agent-mcp-manager` when asking the user for installation commands for a custom MCP server (`AGENT-MCP-KB-INSTALL-CUSTOM-URL-V1`).

**Prompt Content (for `ask_followup_question` tool):**

*   **Question:** "Does this server require installation steps (e.g., `npm install`, `pip install -r requirements.txt`)? If so, please provide the command(s) to run within the '[TARGET_DIRECTORY_PATH]' directory. Otherwise, select 'No installation needed'." *(Note: Replace `[TARGET_DIRECTORY_PATH]` with the actual path)*
*   **Follow-up Suggestions:**
    *   `npm install`
    *   `pip install -r requirements.txt`
    *   `bun install`
    *   `No installation needed`
    *   `Cancel Installation`