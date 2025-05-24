+++
id = "KB-LOOKUP-RULE-FRAMEWORK-FASTAPI"
title = "Standard: framework-fastapi KB Lookup & Index"
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["framework-fastapi"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04"
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "framework-fastapi"]
# relevance = ""
kb_directory = ".ruru/modes/framework-fastapi/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `framework-fastapi` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/framework-fastapi/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/framework-fastapi/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/framework-fastapi/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `framework-fastapi` mode. Use this index to quickly locate relevant information for the task at hand.*

1.  [`01-core-principles-workflow.md`](./01-core-principles-workflow.md): General operational guidelines, best practices, and standard workflow steps.
2.  [`02-pydantic-models.md`](./02-pydantic-models.md): Using Pydantic `BaseModel` for data validation, serialization, and documentation.
3.  [`03-path-query-params.md`](./03-path-query-params.md): Defining and validating parameters from URL paths and query strings.
4.  [`04-request-body.md`](./04-request-body.md): Handling request body data, typically JSON, using Pydantic models.
5.  [`05-dependency-injection.md`](./05-dependency-injection.md): Using `Depends` for shared logic, resource management, and code reuse.
6.  [`06-async-await.md`](./06-async-await.md): Best practices for asynchronous path operations and handling I/O-bound tasks.
7.  [`07-error-handling.md`](./07-error-handling.md): Using `HTTPException` and custom exception handlers for graceful error responses.
8.  [`08-middleware.md`](./08-middleware.md): Implementing custom logic to process requests and responses globally.
9.  [`09-project-structure-routing.md`](./09-project-structure-routing.md): Organizing larger applications using `APIRouter` for modular path operations.
10. [`10-security-auth.md`](./10-security-auth.md): Implementing basic security measures and authentication patterns (e.g., OAuth2 Bearer).
11. [`11-orm-sqlmodel.md`](./11-orm-sqlmodel.md): Integrating with databases using SQLModel (SQLAlchemy + Pydantic).
12. [`12-websockets.md`](./12-websockets.md): Implementing real-time bidirectional communication using WebSockets.
13. [`13-background-tasks.md`](./13-background-tasks.md): Running tasks in the background after returning a response using `BackgroundTasks`.
14. [`14-testing.md`](./14-testing.md): Writing automated tests using `pytest` and FastAPI's `TestClient`.
15. [`15-deployment.md`](./15-deployment.md): Considerations for deploying FastAPI applications (ASGI servers, Docker, reverse proxies).
16. [`16-collaboration-escalation.md`](./16-collaboration-escalation.md): Guidelines for collaborating with other modes and escalating tasks when necessary.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.