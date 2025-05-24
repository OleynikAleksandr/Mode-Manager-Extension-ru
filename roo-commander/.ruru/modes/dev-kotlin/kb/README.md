+++
id = "KB-LOOKUP-RULE-DEV-KOTLIN"
title = "Standard: dev-kotlin KB Lookup & Index"
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["dev-kotlin"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Using current date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "dev-kotlin"] # Added "dev-kotlin"
# relevance = ""
kb_directory = ".ruru/modes/dev-kotlin/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `dev-kotlin` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/dev-kotlin/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/dev-kotlin/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/dev-kotlin/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `dev-kotlin` mode. Use this index to quickly locate relevant information for the task at hand.*

### Files

*   **`general-summary.md`** (1 line): Provides a high-level overview of the advanced Kotlin technologies covered in the initial context gathering, including Coroutines, Flow, KMP, Serialization, DSLs, and Kotest.
*   **`setup-summary.md`** (6 lines): Summarizes the key Gradle configuration steps identified for setting up projects involving KMP, Serialization, Coroutines/Flow, and Kotest, based on the gathered context.

*(Note: This KB was populated based on the 'Comprehensive KB (Subfolders)' option selected during mode creation, but the initial synthesis resulted in only top-level summaries.)*

### Indexed Libraries

This section lists libraries for which synthesized knowledge base documents have been generated, typically using external sources like the Vertex AI MCP server.

#### kotlinx-coroutines

*   **Description:** Synthesized KB for kotlinx-coroutines from Vertex AI MCP (Updated: 2025-04-29)
*   **Source:** Vertex AI MCP
*   **Synthesized Documents:**
    *   **`synthesized/setup-summary.md`**: *Kotlinx Coroutines: Basic Setup Summary* - A summary indicating that setup details were not found in the provided source, but outlining the typical process.
    *   **`synthesized/general-summary.md`**: *Kotlinx Coroutines: General Summary* - A concise overview of the kotlinx-coroutines library, its purpose, and key features based on provided documentation context.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.
