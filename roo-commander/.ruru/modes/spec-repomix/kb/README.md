+++
id = "spec-repomix-kb-lookup-rule-v4" # Updated version
title = "KB Lookup Rule for spec-repomix" # Mode-specific title
context_type = "rules"
scope = "Mode-specific knowledge base access and index" # Updated scope
target_audience = ["spec-repomix"] # Mode-specific audience
granularity = "rule"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "spec-repomix", "index"] # Added index tag
kb_directory = ".ruru/modes/spec-repomix/kb/" # Mode-specific directory
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `spec-repomix` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/spec-repomix/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools (`pack_codebase`, `pack_remote_repository`, `read_repomix_output`), or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md` (This File):** Always start here for an overview and the index below.
    *   b. **List Contents:** Identify relevant files within `.ruru/modes/spec-repomix/kb/` using the index.
    *   c. **Review Content:** Read the content of potentially relevant files identified in the index.
3.  **Apply Knowledge / Execute:**
    *   **IF** sufficient information was found in the KB: Integrate it into your task execution plan and response. Proceed with execution.
    *   **ELSE IF** KB was consulted but insufficient (and task was complex/uncertain): Proceed to Step 4.
    *   **ELSE (KB was skipped for simple task):** Proceed with execution using core capabilities and general knowledge.

**4. Information Gathering (If KB Insufficient for Complex/Uncertain Task):**
    *   **Identify Information Need:** Clearly state what specific information or clarification is missing to proceed reliably.
    *   **Propose Next Steps:** Use the `ask_followup_question` tool to propose information-gathering actions to the coordinator/user. Suggestions **MUST** include context-appropriate options like:
        *   "Search external documentation/web using [Specific MCP Tool, e.g., `vertex-ai-mcp-server/answer_query_websearch`] for [topic/error]." (Mention specific tool and query).
        *   "Read a specific file if you can provide the path."
        *   "Ask for clarification on [specific aspect of the task]."
        *   "Attempt the task using general knowledge (state potential risks/uncertainties)."
    *   **Await Guidance:** Do not proceed with the original task until guidance is received on how to gather the missing information.

## Knowledge Base Index

*This section provides an overview and index of the knowledge base documents available for the `spec-repomix` mode. Use this index to quickly locate relevant information for the task at hand.*

*   **`01-decision-tree.md`**
    *   Summary: Guides the mode in choosing between `pack_codebase` (for local paths) and `pack_remote_repository` (for remote URLs) based on the input source.

*   **`04-repomix-capabilities-options.md`**
    *   Summary: Reference for parameters available for the `repomix` MCP tools (`pack_codebase`, `pack_remote_repository`, `read_repomix_output`).

*   **`common-use-cases-examples.md`**
    *   Summary: Provides examples for common use cases using the `repomix` MCP tools.

*   **`core-concepts.md`**
    *   Summary: Describes the core concept of context packing for LLMs using Repomix. *(Review if still relevant or needs update)*

*   **`installation-methods.md`**
    *   Summary: Explains that Repomix MCP server configuration is handled via `agent-mcp-manager` and requires Node.js/npm. References the agent's KB for details.

*   **`key-commands-summary.md`**
    *   Summary: Summarizes the key `repomix` MCP tools (`pack_codebase`, `pack_remote_repository`, `read_repomix_output`) used by this mode.

*   **`overview-purpose.md`**
    *   Summary: Defines the overall purpose of the `spec-repomix` mode - utilizing the Repomix service via MCP to package repositories for LLM context.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.