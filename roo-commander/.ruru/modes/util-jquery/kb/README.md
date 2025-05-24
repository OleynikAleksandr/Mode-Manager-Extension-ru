+++
id = "KB-LOOKUP-RULE-UTIL-JQUERY"
title = "Standard: util-jquery KB Lookup & Index"
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["util-jquery"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Placeholder for dynamic date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "util-jquery"] # Added tags
# relevance = ""
kb_directory = ".ruru/modes/util-jquery/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `util-jquery` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/util-jquery/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/util-jquery/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/util-jquery/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `util-jquery` mode. Use this index to quickly locate relevant information for the task at hand.*

- **`01-jquery-core-concepts.md`** (Lines: 51): This file explains fundamental jQuery concepts, including the core jQuery object (`$`), efficient use of various selectors (ID, class, tag, attribute), and the performance benefit of caching selected elements.
- **`02-jquery-dom-manipulation-events.md`** (Lines: 65): This document details common jQuery methods for manipulating the DOM (content, elements, attributes, CSS) and explains event handling best practices using `.on()`, emphasizing efficient event delegation.
- **`03-jquery-ajax.md`** (Lines: 93): This document covers making asynchronous HTTP requests (AJAX) using jQuery's `$.ajax()` and shorthand methods, including handling responses with callbacks or Promises (`.done()`, `.fail()`, `.always()`).

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.