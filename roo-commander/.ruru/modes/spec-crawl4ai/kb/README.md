+++
id = "KB-LOOKUP-RULE-SPEC-CRAWL4AI" # Updated ID
title = "Standard: spec-crawl4ai KB Lookup & Index" # Updated title
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["spec-crawl4ai"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Placeholder for dynamic date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "spec-crawl4ai"] # Added tags
# relevance = ""
kb_directory = ".ruru/modes/spec-crawl4ai/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `spec-crawl4ai` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/spec-crawl4ai/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/spec-crawl4ai/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/spec-crawl4ai/kb/`.
    *   c. **Prioritize Top-Level:** Review relevant top-level `.md` files first.
    *   d. **Explore Subdirectories:** If keywords, task context, or the `README.md` suggest relevance, explore pertinent subdirectories. Look for `README.md` or index files within them.
    *   e. **Review Content:** Read the content of potentially relevant files identified.
3.  **Apply Knowledge / Execute:**
    *   **IF** sufficient information was found in the KB: Integrate it into your task execution plan and response. Proceed with execution.
    *   **ELSE IF** KB was consulted but insufficient (and task was complex/uncertain): Proceed to Step 4.
    *   **ELSE (KB was skipped for simple task):** Proceed with execution using core capabilities and general knowledge.

**4. Information Gathering (If KB Insufficient for Complex/Uncertain Task):**
    *   **Identify Information Need:** Clearly state what specific information or clarification is missing to proceed reliably.
    *   **Propose Next Steps:** Use the ask_followup_question tool to propose information-gathering actions to the coordinator/user. Suggestions **MUST** include context-appropriate options like:
        *   "Search external documentation/web using [Specific MCP Tool, e.g., `vertex-ai-mcp-server/answer_query_websearch`] for [topic/error]." (Mention specific tool and query).
        *   "Read a specific file if you can provide the path."
        *   "Ask for clarification on [specific aspect of the task]."
        *   "Attempt the task using general knowledge (state potential risks/uncertainties)."
    *   **Await Guidance:** Do not proceed with the original task until guidance is received on how to gather the missing information.

## Knowledge Base Index

*This section provides an overview and index of the knowledge base documents available for the `spec-crawl4ai` mode. Use this index to quickly locate relevant information for the task at hand.*

*   **`01-principles.md`**
    *   Summary: Outlines core operational guidelines for ethical, efficient, and robust crawling using `crawl4ai`, including tool usage and focus areas.
*   **`02-workflow.md`**
    *   Summary: Details the step-by-step procedure for receiving, planning, implementing, executing, and reporting on `crawl4ai` tasks.
*   **`03-collaboration.md`**
    *   Summary: Defines interaction guidelines with other modes and specifies escalation paths for complex requirements beyond the specialist's scope.
*   **`04-safety.md`**
    *   Summary: Lists key safety protocols and configuration considerations for responsible web crawling, such as rate limiting and resource management.
*   **`05-error-handling.md`**
    *   Summary: Describes procedures for handling, logging, and reporting common crawling errors and tool issues.
*   **`06-context-and-concepts.md`**
    *   Summary: Provides pointers to related documentation and summarizes key concepts and classes within the `crawl4ai` library.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.