+++
id = "KB-REPOMIX-INSTALL-V2" # New ID
title = "Repomix Specialist: Installation & Configuration (via MCP)"
context_type = "knowledge_base"
scope = "Guidance on setting up the repomix MCP server"
target_audience = ["spec-repomix", "all"] # Broaden audience as it's about setup
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["repomix", "kb", "installation", "configuration", "mcp", "npx", "agent-mcp-manager"]
related_context = [
    ".roo/rules-spec-repomix/01-repomix-workflow.md",
    ".ruru/modes/agent-mcp-manager/agent-mcp-manager.mode.md",
    ".ruru/modes/agent-mcp-manager/kb/install-repomix.md" # Link to the detailed KB
    ]
template_schema_doc = ".ruru/templates/toml-md/14_kb_article.README.md"
relevance = "High: Explains how to enable Repomix functionality."
+++

# Installation & Configuration (via MCP)

The `spec-repomix` mode utilizes the `repomix` toolset through a Model Context Protocol (MCP) server connection.

## Execution Method

*   The `repomix` MCP server is typically invoked on-demand using `npx`.
*   This requires **Node.js (version 18.0.0 or higher)** and `npm` to be installed and accessible in the environment where Roo Commander is running.
*   No separate installation (like `pip install` or `docker pull`) is usually needed for the server itself, as `npx` handles fetching and running the package.

## Configuration

*   The connection to the `repomix` MCP server is configured within the Roo Commander MCP settings (typically `.roo/mcp.json` for workspace-specific settings).
*   **Recommended Method:** Use the `agent-mcp-manager` mode to handle the configuration process. It can check prerequisites and automatically update the necessary settings file.
*   **Detailed Steps:** For the specific configuration details and procedure followed by the `agent-mcp-manager` (or for manual configuration), refer to the agent's knowledge base:
    *   **KB:** `.ruru/modes/agent-mcp-manager/kb/install-repomix.md`

Ensure the MCP server is correctly configured before attempting to use `spec-repomix` capabilities.