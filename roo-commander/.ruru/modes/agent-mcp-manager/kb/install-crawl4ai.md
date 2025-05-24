+++
id = "MCP-MGR-KB-INSTALL-CRAWL4AI-V1"
title = "KB: Install crawl4ai MCP Server"
context_type = "knowledge_base"
scope = "Procedure for installing the crawl4ai MCP server"
target_audience = ["agent-mcp-manager"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-03" # Use current date
tags = ["kb", "mcp", "install", "crawl4ai", "pip", "docker"]
related_context = [
    "../agent-mcp-manager.mode.md",
    "~/.roo/mcp.json"
    ]
template_schema_doc = "~/.ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Specific installation steps for crawl4ai"
+++

# KB: Install crawl4ai MCP Server

This procedure guides the installation of the `crawl4ai` MCP server, offering both `pip` and `docker` methods.

**Repository:** `https://github.com/unclecode/crawl4ai.git`
**Default Port:** `11235` (for Docker)

## Procedure

1.  **Prerequisites Check:**
    *   Verify `git` is installed (`execute_command` with `git --version`). If missing, inform user and stop.
    *   Ask the user which installation method they prefer:
        ```xml
        ask_followup_question
        <question>How would you like to install the crawl4ai MCP server?</question>
        <follow_up>
        <suggest>Using pip (Python package manager)</suggest>
        <suggest>Using Docker</suggest>
        </follow_up>
        </ask_followup_question>
        ```
    *   If 'pip' is chosen: Verify `python` and `pip` are installed (`python --version`, `pip --version`). If missing, inform user and stop.
    *   If 'Docker' is chosen: Verify `docker` is installed (`docker --version`). If missing, inform user and stop.

2.  **Installation (Based on Choice):**

    *   **If 'pip' was chosen:**
        1.  **Install Package:**
            *   `execute_command` with `pip install -U crawl4ai`. Confirm success.
        2.  **Run Setup:**
            *   `execute_command` with `crawl4ai-setup`. Explain this installs necessary browser components (Playwright). Confirm success.
            *   If errors occur, inform the user and suggest manual Playwright install: `python -m playwright install --with-deps chromium`.
        3.  **(Optional) Verify:**
            *   `execute_command` with `crawl4ai-doctor`. Report results to user.
        4.  **Determine Command:** The command to run the server via pip needs clarification. *Placeholder: Assume `python -m crawl4ai.server` for now.* Mark this as potentially needing user confirmation or further documentation lookup.

    *   **If 'Docker' was chosen:**
        1.  **Pull Image:**
            *   Use the `latest` tag for simplicity.
            *   `execute_command` with `docker pull unclecode/crawl4ai:latest`. Confirm success.
        2.  **Determine Command:** The command to run the container is `docker run -d -p 11235:11235 --name crawl4ai --shm-size=1g unclecode/crawl4ai:latest`.

3.  **Configuration:**
    *   Based on the README, no specific environment variables seem mandatory for basic operation. Inform the user that advanced features might require configuration (e.g., API keys for LLM extraction) and they may need to manage this via a `.env` file (for pip) or Docker environment variables later.

4.  **Update `.roo/mcp.json`:**
    *   Read the current `.roo/mcp.json` using `read_file`.
    *   Determine the `command` and `cwd` based on the installation method:
        *   **Pip:** `command` = (Placeholder: `python -m crawl4ai.server`), `cwd` = (Likely not needed if installed globally, TBD).
        *   **Docker:** `command` = `docker run -d -p 11235:11235 --name crawl4ai --shm-size=1g unclecode/crawl4ai:latest`, `cwd` = (Not applicable).
    *   Construct the new server entry:
        ```json
        {
          "name": "crawl4ai",
          "command": "[COMMAND_FROM_ABOVE]",
          "cwd": "[CWD_IF_APPLICABLE]",
          "enabled": true,
          "environment": {},
          "alwaysAllow": [
            "crawl_url", // Assuming common tool names
            "scrape_content",
            "extract_data" // Add based on features
          ],
          "notes": "Installed via agent-mcp-manager using [pip/docker] method."
        }
        ```
    *   Use `apply_diff` or `search_and_replace` to add/update this entry in the `servers` array within `.roo/mcp.json`. Ensure valid JSON.

5.  **Report Completion:** Inform the user that `crawl4ai` has been added to the configuration. Mention the method used and the determined run command. If Docker, mention the playground URL (`http://localhost:11235/playground`).