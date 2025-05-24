+++
id = "MCP-MGR-KB-INSTALL-REPOMIX-V1"
title = "KB: Configure repomix MCP Server (via npx)"
context_type = "knowledge_base"
scope = "Procedure for configuring the repomix MCP server"
target_audience = ["agent-mcp-manager"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-03" # Use current date
tags = ["kb", "mcp", "configure", "install", "repomix", "npx", "node"]
related_context = [
    "../agent-mcp-manager.mode.md",
    "~/.roo/mcp.json"
    ]
template_schema_doc = "~/.ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Specific configuration steps for repomix"
+++

# KB: Configure repomix MCP Server (via npx)

This procedure guides the configuration of the `repomix` MCP server. Unlike many MCP servers, `repomix` is typically executed on-demand using `npx` and configured directly within the client's `mcp.json`, rather than running as a persistent background process.

**Repository:** `https://github.com/yamadashy/repomix`
**Documentation:** `https://repomix.com`

## Procedure

1.  **Prerequisites Check:**
    *   Verify `node` is installed and meets the version requirement (>= 18.0.0):
        *   `execute_command` with `node --version`.
        *   If missing or version is too low, inform the user and stop.
    *   Verify `npm` is installed:
        *   `execute_command` with `npm --version`.
        *   If missing, inform the user and stop.

2.  **Explain Execution Method:**
    *   Inform the user that `repomix` runs via `npx`, which downloads and executes the package as needed. No separate installation step like `pip install` or `docker pull` is required for the server itself.

3.  **Update `.roo/mcp.json`:**
    *   Read the current `.roo/mcp.json` using `read_file`.
    *   Construct the new server entry for `repomix`:
        ```json
        {
          "name": "repomix",
          "command": "npx",
          "args": [
            "-y",
            "repomix",
            "--mcp"
          ],
          "cwd": null, // Not applicable for npx global execution
          "enabled": true,
          "environment": {},
          "alwaysAllow": [
            // Add expected tool names here based on repomix capabilities
            // e.g., "generate_context", "search_code" (Placeholder names)
          ],
          "notes": "Configured via agent-mcp-manager using npx method. Requires Node.js v18+.",
          "timeout": 3600 // Default timeout, adjust if needed
        }
        ```
    *   Use `apply_diff` or `search_and_replace` to add/update this entry within the `mcpServers` object in `.roo/mcp.json`. Ensure the resulting file is valid JSON. Pay attention to adding commas correctly if inserting into the middle of the list.

## Configuration

After ensuring the prerequisites are met, you need to configure the `repomix` MCP server within the Roo Commander settings. This tells the system how to invoke `repomix` when its tools are needed.

Add the following JSON block as a top-level key within the main JSON object of your MCP settings file:

```json
"repomix": {
      "command": "npx",
      "args": [
        "-y",
        "repomix",
        "--mcp"
      ],
      "alwaysAllow": [
        "pack_codebase",
        "pack_remote_repository",
        "read_repomix_output",
        "file_system_read_file",
        "file_system_read_directory"
      ]
    }
```

**Configuration Locations & Precedence:**

You can add this block to either:

1.  **Global MCP Settings:** Typically located in the extension's global storage directory (e.g., `~/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json` on Linux). Changes here affect all workspaces.
2.  **Workspace MCP Settings:** Located at `.roo/mcp.json` within your current project workspace. Changes here only affect this specific workspace.

**Important Precedence Rule:** It is crucial to understand that if the same server (like `repomix`) is defined in *both* the global settings file (`mcp_settings.json`) and the workspace settings file (`.roo/mcp.json`), the configuration within the **workspace file (`.roo/mcp.json`) will always take precedence** and override the global settings for this specific project.

**Agent Assistance (Recommended):** To simplify setup, after verifying prerequisites, the MCP Manager Agent **should explicitly offer** to automatically add the required `repomix` configuration block directly into the **workspace `.roo/mcp.json` file** for you. This is generally the recommended approach for project-specific configurations.

**Important:** Ensure the final JSON in the settings file remains valid after adding this block. If other servers are already defined, you might need to add a comma (`,`) before the `"repomix"` key.

*(The original step 3 regarding updating `.roo/mcp.json` directly via the agent is now superseded by this manual configuration step. The agent should primarily check prerequisites and explain the process.)*
4.  **Report Completion:**
    *   Inform the user that `repomix` has been configured in `.roo/mcp.json`.
    *   Explain that it will be executed using `npx` when needed and requires Node.js v18+ to be available in the environment where the client (e.g., Roo Commander) runs.
    *   Mention that it communicates via stdio, not a network port.