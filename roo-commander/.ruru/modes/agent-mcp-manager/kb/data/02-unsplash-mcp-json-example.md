+++
# --- Basic Metadata ---
id = "KB-MCP-UNSPLASH-JSON-EXAMPLE-V1"
title = "Example .roo/mcp.json Configuration for Unsplash MCP Server"
context_type = "kb"
scope = "Provides a sample JSON structure for configuring the Unsplash server in mcp.json"
target_audience = ["agent-mcp-manager", "developer"]
granularity = "content"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mcp", "unsplash", "configuration", "json", "example"]
related_context = [
    ".ruru/modes/agent-mcp-manager/kb/install-unsplash.md",
    ".roo/mcp.json"
]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "High: Contains the example JSON structure referenced during installation."
+++

# Example `.roo/mcp.json` Configuration for Unsplash MCP Server

This file contains an example JSON structure for configuring the `upsplash-mcp-server` within the main `.roo/mcp.json` file, as referenced in the installation procedure `KB-MCP-MANAGER-UNSPLASH-V1.2`.

**Note:** The `{{api_key}}` placeholder should be replaced with the actual Unsplash Access Key obtained from the user during the installation process.

```json
// Example entry within the "servers" object in .roo/mcp.json
{
  "name": "upsplash-mcp-server",
  "description": "Provides access to Unsplash images.",
  "command": "bun", // Use bun to run
  "args": [".ruru/mcp-servers/upsplash-mcp-server/build/index.js"], // Verified from package.json
  "env": { // Add API key directly to env object
    "UNSPLASH_ACCESS_KEY": "{{api_key}}" // Use the key obtained from the user
  },
  "alwaysAllow": { // Define default permissions - adjust as needed
    "tools": ["search_photos", "download_photo"], // Verified tool names
    "resources": []
  }
}