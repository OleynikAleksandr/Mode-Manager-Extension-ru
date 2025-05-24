+++
id = "AGENT-MCP-RULE-INSTALL-OTHER-V2" # Updated version
title = "Agent MCP Manager: Rule - Handle 'Install Other' Selection"
context_type = "rules"
scope = "Procedure for presenting specific install options when user selects 'Install other'"
target_audience = ["agent-mcp-manager"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-05" # Updated date
tags = ["rules", "mcp", "installation", "agent-mcp-manager", "ask_followup_question", "emoji"] # Added emoji tag
related_context = [
    ".roo/rules-agent-mcp-manager/01-initialization-rule.md",
    ".ruru/modes/agent-mcp-manager/kb/", # Directory containing install KBs
    ".ruru/modes/agent-mcp-manager/kb/data/01-other-mcp-install-options.md" # Added KB for options
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Defines the follow-up question for installing specific servers"
+++

# Rule: Handle 'Install Other MCP Servers' Selection

This rule defines the procedure to follow when the user selects the "Install other MCP servers" option in the initial interaction (defined in `01-initialization-rule.md`). It involves loading a list of specific server options from a KB file and presenting them to the user.

**Procedure:**

1.  **Trigger:** User selects the suggestion corresponding to "Install other MCP servers".
2.  **Load Options:** Use the `read_file` tool to load the list of suggestions from the KB data file: `.ruru/modes/agent-mcp-manager/kb/data/01-other-mcp-install-options.md`. Parse the Markdown list to extract the suggestion strings.
3.  **Present Options:** Construct and use the `ask_followup_question` tool:
    *   Set the `<question>` parameter to: "Which specific MCP server would you like to install?".
    *   Populate the `<follow_up>` section with `<suggest>` tags, using the suggestion strings loaded in the previous step.
4.  **Await Selection:** Wait for the user's response.
5.  **Next Step:** Based on the user's selection, the `agent-mcp-manager` should consult the corresponding `install-[server-name].md` KB file in its knowledge base (`.ruru/modes/agent-mcp-manager/kb/`) for the specific installation procedure.