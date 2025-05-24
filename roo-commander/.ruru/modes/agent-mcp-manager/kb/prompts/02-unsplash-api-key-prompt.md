+++
# --- Basic Metadata ---
id = "KB-MCP-UNSPLASH-API-KEY-PROMPT-V1"
title = "Prompt: Request Unsplash API Access Key"
context_type = "kb"
scope = "Defines the prompt used to ask the user for their Unsplash API key"
target_audience = ["agent-mcp-manager"]
granularity = "content"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mcp", "unsplash", "prompt", "api-key", "configuration"]
related_context = [
    ".ruru/modes/agent-mcp-manager/kb/install-unsplash.md"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Contains the specific prompt text for API key collection."
+++

# Prompt: Request Unsplash API Access Key

This file contains the prompt content used by `agent-mcp-manager` when requesting the Unsplash Access Key from the user during the installation process (`KB-MCP-MANAGER-UNSPLASH-V1.2`).

**Prompt Content (for `ask_followup_question` tool):**

*   **Question:** "Please provide your Unsplash Access Key. You can get one from the Unsplash Developer portal (https://unsplash.com/developers). It's required for the server to function."
*   **Follow-up Suggestion:** "Enter API Key here" *(Note: This is a placeholder; the user needs to replace it with their actual key).*