+++
# --- Basic Metadata ---
id = "KB-REPOMIX-KEY-TOOLS-V1" # New ID
title = "Repomix Specialist: Key MCP Tools Summary" # New title
context_type = "knowledge_base"
scope = "Summary of the primary MCP tools used by spec-repomix" # New scope
target_audience = ["spec-repomix"]
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["repomix", "kb", "mcp", "summary", "tools", "pack_codebase", "pack_remote_repository", "read_repomix_output"] # New tags
related_context = [
    ".roo/rules-spec-repomix/01-repomix-workflow.md",
    ".ruru/modes/spec-repomix/kb/04-repomix-capabilities-options.md" # Link to parameters
    ]
template_schema_doc = ".ruru/templates/toml-md/14_kb_article.README.md"
relevance = "High: Quick reference for core MCP tool functions."
+++

# Key Repomix MCP Tools Summary

The `spec-repomix` mode primarily interacts with the Repomix service using the following MCP tools via `use_mcp_tool`:

1.  **`pack_codebase`**:
    *   **Purpose:** Packages a **local directory** into a consolidated context file.
    *   **Key Input:** `directory` (absolute path to the local directory).
    *   **Output:** Returns an `outputId` referencing the generated context.

2.  **`pack_remote_repository`**:
    *   **Purpose:** Fetches, clones, and packages a **remote GitHub repository** into a consolidated context file.
    *   **Key Input:** `remote` (GitHub URL or `user/repo` string).
    *   **Output:** Returns an `outputId` referencing the generated context.

3.  **`read_repomix_output`**:
    *   **Purpose:** Retrieves the content of a previously generated Repomix context file.
    *   **Key Input:** `outputId` (obtained from a `pack_*` tool call).
    *   **Output:** Returns the string content of the Repomix output.

Refer to `04-repomix-capabilities-options.md` for detailed parameter descriptions. Configuration/initialization is handled by `agent-mcp-manager`.