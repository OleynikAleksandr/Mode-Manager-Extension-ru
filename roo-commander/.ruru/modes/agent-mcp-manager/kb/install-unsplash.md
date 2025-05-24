+++
id = "KB-MCP-MANAGER-UNSPLASH-V1.3" # Updated ID and Version
title = "KB: Install Unsplash MCP Server (using bun and direct env config)"
status = "active"
created_date = "2025-04-24"
updated_date = "2025-05-05" # Update date
version = "1.3" # Increment version
tags = ["kb", "agent-mcp-manager", "workflow", "mcp", "install", "unsplash", "configuration", "setup", "interactive", "api-key"]
owner = "agent-mcp-manager"
related_docs = [
    ".roo/rules-agent-mcp-manager/01-initialization-rule.md",
    ".roo/mcp.json",
    "https://github.com/shariqriazz/upsplash-mcp-server",
    ".ruru/modes/agent-mcp-manager/kb/data/02-unsplash-mcp-json-example.md", # Added JSON example ref
    ".ruru/modes/agent-mcp-manager/kb/prompts/02-unsplash-api-key-prompt.md" # Added prompt ref
    ]
objective = "To install and configure the Unsplash MCP server interactively."
scope = "Executed when the user selects the 'Install Unsplash Image Server' option."
roles = ["Agent (agent-mcp-manager)", "User"]
trigger = "User selection of '🖼️ Install Unsplash Image Server'."
success_criteria = [
    "Repository cloned successfully into `.ruru/mcp-servers/upsplash-mcp-server`.",
    "Dependencies installed successfully.",
    "User prompted for and provided `UNSPLASH_ACCESS_KEY`.",
    "API key obtained from user.",
    "Build process completed successfully.",
    "`.roo/mcp.json` updated correctly with the new server entry, including the API key in the `env` object."
    ]
failure_criteria = [
    "Git clone fails.",
    "Dependency installation fails.",
    "User cancels API key input.",
    "Build process fails.",
    "Agent fails to read/write/parse `.roo/mcp.json`."
    ]
target_audience = ["agent-mcp-manager"]
template_schema_doc = ".ruru/templates/toml-md/15_kb_article.README.md" # Assuming a generic KB template schema
+++

# KB Procedure: Install Unsplash MCP Server

## 1. Objective 🎯
Install the `upsplash-mcp-server` from its GitHub repository, configure it with the necessary API key, build it, and update the central MCP configuration.

## 2. Preconditions🚦
*   `git` is installed and accessible in the environment's PATH.
*   `bun` is installed and accessible in the environment's PATH.

## 3. Procedure Steps 🪜

1.  **Define Variables:**
    *   `repo_url`: "https://github.com/shariqriazz/upsplash-mcp-server.git"
    *   `server_name`: "upsplash-mcp-server"
    *   `clone_dir`: ".ruru/mcp-servers"
    *   `target_dir`: ".ruru/mcp-servers/upsplash-mcp-server"
    *   `mcp_config_path`: ".roo/mcp.json"
    *   `api_key_prompt_kb`: ".ruru/modes/agent-mcp-manager/kb/prompts/02-unsplash-api-key-prompt.md"
    *   `json_example_kb`: ".ruru/modes/agent-mcp-manager/kb/data/02-unsplash-mcp-json-example.md"

2.  **Clone Repository:**
    *   Inform the user: "Cloning the Unsplash MCP server repository..."
    *   Use the `execute_command` tool to run `git clone {{repo_url}} {{target_dir}}`.
    *   Verify success (exit code 0). If fails, report error and stop.

3.  **Install Dependencies:**
    *   Inform the user: "Installing dependencies using bun..."
    *   Use the `execute_command` tool with `cwd={{target_dir}}` to run `bun install`.
    *   Verify success (exit code 0). If fails, report error and stop.

4.  **Get API Key:**
    *   Load the prompt content from `{{api_key_prompt_kb}}`.
    *   Use the `ask_followup_question` tool with the loaded question and suggestion.
    *   Store the user's response (the API key) securely in a temporary variable (e.g., `api_key`). Handle potential cancellation/refusal gracefully. If refused, inform the user the server won't work without it and stop.

5.  **Build Server:**
    *   Inform the user: "Building the server using bun..."
    *   Use the `execute_command` tool with `cwd={{target_dir}}` to run `bun run build`.
    *   Verify success (exit code 0). If fails, report error and stop.

6.  **Update MCP Configuration (`.roo/mcp.json`):**
    *   Inform the user: "Updating the central MCP configuration..."
    *   Use the `read_file` tool to get the current content of `{{mcp_config_path}}`.
    *   Parse the JSON content. Handle potential parsing errors.
    *   **Check if server already exists:** If an entry with `name: "upsplash-mcp-server"` already exists, inform the user and ask if they want to overwrite/update it or cancel. Proceed based on user choice.
    *   **Add/Update Server Entry:**
        *   Load the example JSON structure from `{{json_example_kb}}`.
        *   Replace the `{{api_key}}` placeholder in the loaded example with the actual key obtained in Step 4.
        *   Add this constructed server object to the `servers` array in the parsed JSON data from `mcp.json`.
    *   Use the `write_to_file` tool to save the updated JSON data back to `{{mcp_config_path}}`. Ensure proper JSON formatting.
    *   Verify success. If fails, report error and stop.

7.  **Report Completion:**
    *   Use the `attempt_completion` tool with the message: "Successfully installed and configured the Unsplash MCP server (`upsplash-mcp-server`). It has been added to `.roo/mcp.json`. You may need to reload extensions and/or VS Code for the changes to take full effect."

## 4. Rationale / Notes 🤔
*   This procedure uses `bun` for installation, build, and execution.
*   It interactively prompts for the essential `UNSPLASH_ACCESS_KEY` by referencing an external prompt KB.
*   It adds the API key directly to the `env` object in `.roo/mcp.json` based on an external JSON example KB.
*   The run command path (`build/index.js`) and tool names (`search_photos`, `download_photo`) have been verified.
*   Error handling is included at each critical step.
*   Tool usage is described using natural language and backticks, not literal XML.