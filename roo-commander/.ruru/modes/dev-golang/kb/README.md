+++
id = "KB-LOOKUP-RULE-DEV-GOLANG"
title = "Standard: dev-golang KB Lookup & Index"
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["dev-golang"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04"
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "dev-golang"]
# relevance = ""
kb_directory = ".ruru/modes/dev-golang/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `dev-golang` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/dev-golang/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/dev-golang/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/dev-golang/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `dev-golang` mode. Use this index to quickly locate relevant information for the task at hand.*

*   `./general-summary.md`: (Line Count: 4) Brief overview of Golang's core features: simplicity, efficiency, concurrency (goroutines/channels), standard library, tooling, and suitability for backend/systems programming.
*   `./setup-summary.md`: (Line Count: 10) Essential steps for setting up a basic Go project: `go mod init`, write code, `go build`, `go run`, `go mod tidy`, `go install`.
*   `best-practices/`:
    *   `best_practices.md`: (Line Count: 141) Explanation of general Golang best practices (naming, errors, packages, formatting, simplicity, interfaces, avoiding globals).
*   `concurrency/`:
    *   `advanced_concurrency.md`: (Line Count: 201) Deep dive into advanced Go concurrency patterns (pipelines, fan-out/in, worker pools, rate limiting, context), `sync` primitives, best practices, and pitfalls (races, leaks, deadlocks).
*   `libraries/`:
    *   `common_libraries.md`: (Line Count: 198) Overview of common Go standard libraries (`net/http`, `context`, `encoding/json`, `database/sql`, `io`, `os`, `flag`) and popular third-party libraries (Gin, Echo, Cobra, urfave/cli, Viper, GORM, sqlx, zap, logrus).
*   `performance/`:
    *   `optimization.md`: (Line Count: 208) Covers Golang performance optimization techniques including profiling (`pprof`), garbage collection (GC) understanding/tuning, reducing allocations, CPU optimization, memory layout, and common pitfalls.
*   `pitfalls/`:
    *   `pitfalls_antipatterns.md`: (Line Count: 191) Deep dive into common Golang pitfalls and anti-patterns, including concurrency mistakes (data races, leaks, channel misuse), error handling issues, interface pollution, package management complexities, and performance anti-patterns.
*   `testing/`:
    *   `strategies.md`: (Line Count: 178) Deep dive into Golang testing strategies using the standard `testing` package, table-driven tests, integration testing, benchmarking, fixtures, mocking/stubbing techniques, code coverage, and best practices.
*   `tooling/`:
    *   `tooling.md`: (Line Count: 238) Overview of the Go tooling ecosystem, including standard commands (`go build`, `go test`, `go mod`, `go fmt`, `go vet`, `go run`, `go install`, `go generate`), profiling (`pprof`), dependency management (Go Modules), testing patterns, linting (`golangci-lint`), and debugging (`dlv`).

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.