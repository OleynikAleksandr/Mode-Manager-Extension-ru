+++
id = "KB-LOOKUP-RULE-BAAS-FIREBASE" # Updated ID
title = "Standard: baas-firebase KB Lookup & Index" # Updated title
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["baas-firebase"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Placeholder for dynamic date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "baas-firebase"] # Added tags
# relevance = ""
kb_directory = ".ruru/modes/baas-firebase/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `baas-firebase` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `{{kb_directory}}`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `{{kb_directory}}README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `{{kb_directory}}`.
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

*This section provides an overview and index of the knowledge base documents available for the `baas-firebase` mode. Use this index to quickly locate relevant information for the task at hand.*

*   **`01-core-principles-workflow.md`**: Defines the role, core operational principles, standard workflow, key considerations, and error handling approach.
*   **`02-authentication.md`**: Covers implementing common user authentication flows (Email/Password, OAuth) using the Web v9 SDK.
*   **`03-firestore-security-rules.md`**: Details how to write, structure, and test Firestore Security Rules.
*   **`04-storage-security-rules.md`**: Details how to write, structure, and test Cloud Storage Security Rules.
*   **`05-cloud-functions.md`**: Explains Cloud Functions triggers, setup, development (Node.js/Python), Admin SDK usage, deployment, local testing, and best practices.
*   **`06-hosting.md`**: Focuses on configuring Firebase Hosting via `firebase.json`, including rewrites, redirects, headers, and deployment.
*   **`07-cli-and-sdk.md`**: Covers common Firebase CLI commands for project management, emulators, deployment, and usage of the Web SDK v9 (Modular).
*   **`08-testing-emulators.md`**: Explains how to set up and use the Firebase Emulator Suite for local development and testing, including connecting the app and testing security rules.
*   **`09-cost-optimization.md`**: Provides strategies for managing and reducing costs across Firestore, Cloud Functions, Storage, Authentication, and Hosting.
*   **`10-collaboration-escalation.md`**: Outlines how the mode collaborates with other roles and the process for escalating issues.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.