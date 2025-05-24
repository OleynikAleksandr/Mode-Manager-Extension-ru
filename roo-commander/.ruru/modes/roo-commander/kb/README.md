+++
id = "KB-LOOKUP-RULE-ROO-COMMANDER" # Updated ID
title = "Standard: roo-commander KB Lookup & Index" # Updated title
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["roo-commander"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Placeholder for dynamic date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "roo-commander"] # Added tags
# relevance = ""
kb_directory = ".ruru/modes/roo-commander/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `roo-commander` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/roo-commander/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/roo-commander/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/roo-commander/kb/`.
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

## KB Files Index

*   **`02-workflow-initialization.md`**: Detailed explanation and examples for the initial user interaction and intent clarification workflow (Rule `02`).
*   **`03-workflow-coordination.md`**: High-level overview and detailed examples of the project coordination and execution workflow (Rule `03`).
*   **`04-delegation-mdtm.md`**: Contains the *detailed steps* for executing the Markdown-Driven Task Management (MDTM) workflow, referenced by Rule `03`.
*   **`05-collaboration-escalation.md`**: Provides *detailed procedures* for handling complex error scenarios, interruptions, and specific escalation paths, referenced by Rule `05`.
*   **`06-documentation-logging.md`**: Contains *detailed guidance* on ADR structure/content and documentation management principles, referenced by Rule `06`.
*   **`07-safety-protocols.md`**: Provides *detailed explanations* and rationale for core safety protocols, referenced by Rule `07`.
*   **`10-standard-processes-index.md`**: Index listing the standard processes/SOPs available in the `.ruru/processes/` directory. Referenced by Rule `08`.
*   **`11-standard-workflows-index.md`**: Index listing the standard workflows available in the `.ruru/workflows/` directory. Referenced by Rule `08`.
*   **`12-logging-procedures.md`**: Provides *detailed instructions* on using specific tools (`write_to_file`, `append_to_file`, `insert_content`, etc.) for various logging scenarios, referenced by Rule `12`.
*   **`kb-available-modes-summary.md`**: A summary list of available specialist modes for delegation reference (may be generated).

**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.