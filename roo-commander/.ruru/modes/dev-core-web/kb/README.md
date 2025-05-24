+++
id = "KB-LOOKUP-RULE-DEV-CORE-WEB"
title = "Standard: dev-core-web KB Lookup & Index"
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["dev-core-web"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04"
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "dev-core-web"]
# relevance = ""
kb_directory = ".ruru/modes/dev-core-web/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `dev-core-web` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/dev-core-web/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/dev-core-web/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/dev-core-web/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `dev-core-web` mode. Use this index to quickly locate relevant information for the task at hand.*

*   **`01-principles.md`** (Lines: 40): Outlines core principles guiding development, emphasizing semantic HTML, modern CSS, vanilla JS, basic accessibility, performance awareness, maintainability, and simplicity.
*   **`02-workflow.md`** (Lines: 66): Details the standard step-by-step workflow for receiving, planning, implementing, testing, and reporting on assigned tasks, including interaction with MDTM files.
*   **`03-html-structure.md`** (Lines: 88): Provides guidelines for writing semantic and accessible HTML5, covering document structure, sectioning elements, content elements, interactive elements, forms, and generic containers.
*   **`04-css-styling.md`** (Lines: 111): Covers modern CSS best practices, including layout with Flexbox/Grid, responsive design techniques (mobile-first, media queries, relative units), CSS variables, selector strategies, organization, and basic transitions/animations.
*   **`05-vanilla-js.md`** (Lines: 119): Details best practices for using modern vanilla JavaScript (ES6+) for DOM selection (`querySelector`), DOM manipulation, event handling (`addEventListener`), asynchronous operations (`fetch`, `async/await`), and basic state management concepts.
*   **`06-accessibility-basics.md`** (Lines: 72): Focuses on fundamental accessibility implementation guidelines, covering semantic HTML usage, meaningful image `alt` text, form labeling, keyboard navigation/focus visibility, basic ARIA usage, and color contrast considerations.
*   **`07-collaboration.md`** (Lines: 40): Outlines how the `dev-core-web` mode should report progress, collaborate with other specialist modes (usually via the `frontend-lead`), and when/how to escalate issues.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.