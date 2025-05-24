+++
id = "CONCEPT-CONTEXT-MGMT-V1"
title = "Context Management and Delegation Strategies V1"
status = "draft"
doc_version = "N/A"
content_version = 1.0
audience = ["all"] # Applies to Coordinators and Delegates
last_reviewed = "2025-06-05" # << GENERATED_DATE >>
template_schema_doc = ".ruru/templates/toml-md/09_documentation.README.md"
# owner = ""
tags = ["context-management", "delegation", "workflow", "best-practices", "coordination", "rules", "mcp", "guideline"]
# parent_doc = ""
# related_tasks = []
related_context = [
    ".roo/rules/06-iterative-execution-policy.md",
    ".roo/rules/10-vertex-mcp-usage-guideline.md",
    ".roo/rules/11-session-management.md"
]
+++

# Context Management and Delegation Strategies V1

**Content Revision:** 1.0 | **Last Reviewed:** 2025-06-05

## Introduction / Overview 🎯

*   **What is this document about?** This whitepaper outlines refined strategies and best practices for managing context windows and delegating tasks effectively across different modes (Coordinators and Delegates) within the Roo Commander workspace.
*   **What purpose does it serve?** The goal is to ensure reliable task completion, prevent context window overflows, promote efficient resource utilization (including MCPs), and establish clear communication protocols between modes during complex operations.
*   **Who is the intended audience?** All modes, particularly Coordinator modes (`roo-commander`, `prime-coordinator`) responsible for task delegation and Specialist/Delegate modes responsible for task execution.

## 1. Goal: Reliable and Efficient Task Execution 🏁

The primary objective of these strategies is to proactively manage the limitations inherent in large language model context windows. By implementing thoughtful delegation and context monitoring, we aim to:

*   Minimize task failures due to context overflows.
*   Reduce redundant communication cycles.
*   Optimize the use of computational resources, including external MCP services.
*   Maintain clarity and traceability throughout complex workflows.

These guidelines complement the reactive checkpointing mechanism defined in Rule `06-iterative-execution-policy.md`.

## 2. Coordinator Context Management 🧭

*   **Guideline:** Coordinator modes (e.g., `roo-commander`, `prime-coordinator`) **SHOULD** actively monitor their own context window usage, especially during extended user interactions or sessions.
*   **Action:** When context usage approaches predefined guideline thresholds (e.g., ~40%, ~60%, ~80% - specific thresholds may be defined in Coordinator rules), the Coordinator **SHOULD** consider prompting the user.
*   **Prompting:** Use the `ask_followup_question` tool to suggest potentially concluding the current interaction or session. This prompt could offer options like:
    *   Generating a summary of the session so far.
    *   Saving the current state and pausing.
    *   Identifying a specific, smaller next step to continue.
    *   Continuing despite the high context usage (with the understanding that reliability may decrease).
*   **Rationale:** This provides the user with control and awareness, allowing for a graceful pause or conclusion before context limits are strictly hit, potentially leading to errors or data loss. This aligns with the principles of Session Management (Rule `11-session-management.md`).

## 3. Delegation Principles: Task Breakdown 🧩

*   **Mandate:** Delegators (Coordinators, Leads) **MUST** break down complex work requests into logically small, focused sub-tasks before delegating to specialist modes.
*   **Judgment over Metrics:** The breakdown should be based on a qualitative assessment of the work involved (e.g., implementing a single function, modifying a specific configuration section, writing one documentation section).
*   **No Hard Limits:** Explicitly avoid relying on predicted token counts or arbitrary line limits to define sub-task size. Such predictions are inherently unreliable due to the variability of language generation and code complexity. Focus on logical coherence and manageable units of work.
*   **Clarity:** Each delegated sub-task should have a clear goal and well-defined acceptance criteria (often managed via MDTM checklists).
*   **Rationale:** Smaller, focused tasks are less likely to overwhelm a delegate's context window, easier to track, and reduce the impact of potential errors.

## 4. Delegate Pre-Check: Context Estimation 📉

*   **Guideline:** Upon receiving a delegated task (especially via MDTM), the delegate mode **SHOULD** perform a quick, high-level estimation of the potential context cost required to complete it.
*   **Estimation Factors:** Consider factors like:
    *   The complexity described in the task.
    *   The number and estimated size of files to be read or modified.
    *   The anticipated length of generated code or text.
    *   The need for potential research or tool use.
*   **Action if Too Large:** If the initial estimation suggests the task is likely too large to be completed reliably within the delegate's own context checkpoint thresholds (e.g., likely to exceed ~40-50% usage quickly, as per Rule `06`), the delegate **MUST** respond *before* starting significant work.
*   **Response:** Use the `ask_followup_question` tool to communicate back to the delegator, clearly stating that the task appears too large and requesting it be broken down further. Provide specific suggestions for breakdown if possible.
*   **Rationale:** This proactive check prevents delegates from wasting resources attempting tasks that are likely to fail due to context limits. It shifts the responsibility for breakdown back to the delegator *before* execution begins.

## 5. Leveraging MCPs for Context Offloading ☁️

*   **Guideline:** All modes **SHOULD** actively seek opportunities to leverage Model Context Protocol (MCP) servers to manage the primary context window size.
*   **Examples:**
    *   Use `vertex-ai-mcp-server` tools (like `answer_query_websearch`, `explain_topic_with_docs`, `save_doc_snippet`) for research, validation, or retrieving specific information instead of loading large documents or web pages directly into the main context.
    *   Use `repomix` MCP tools (`pack_codebase`, `pack_remote_repository`) to get condensed summaries or analyses of codebases instead of reading numerous files.
    *   Use summarization capabilities (potentially via Vertex AI or other future MCPs) to condense large inputs or intermediate results.
*   **Guiding Context:** When using MCP tools, provide sufficient *guiding context* within the tool arguments (e.g., specific queries, topics, URLs) to ensure the MCP can perform its task effectively without needing excessive back-and-forth. Refer to Rule `10-vertex-mcp-usage-guideline.md` for specific guidance on Vertex AI MCP usage.
*   **Rationale:** Offloading tasks like research, summarization, and code analysis to specialized MCPs keeps the primary context window focused on the core task logic and coordination, improving reliability.

## 6. Internal Work Unit Tracking (Optional) 🔢

*   **Guideline:** For modes executing complex, multi-step processes *within a single delegation*, consider using internal tracking markers (e.g., simple numbering like "Step 1/3:", "Processing item 2:") in logs or intermediate `attempt_completion` messages.
*   **Rationale:** This improves clarity for the coordinator and the user, making it easier to understand progress within a potentially longer execution turn, especially if it doesn't align perfectly with MDTM checklist items.

## 7. Relationship to Iterative Execution (Rule 06) 🔄

*   **Complementary:** These strategies are primarily **proactive and preventative**. They focus on *planning* (task breakdown by delegator), *pre-checking* (context estimation by delegate), and *offloading* (MCP usage) to *avoid* hitting context limits in the first place.
*   **Rule 06 (Iterative Execution Policy):** This rule provides the **reactive mechanism** for handling situations where, despite proactive measures, a delegate's context usage approaches its threshold *during* execution. It defines the procedure for checkpointing, summarizing progress, and handing back control for the next iteration.
*   **Synergy:** Together, these proactive strategies and the reactive checkpointing of Rule 06 form a comprehensive approach to managing context limitations and ensuring robust task execution.

## Summary / Key Takeaways 💡

*   Proactive context management is crucial for reliable AI-driven workflows.
*   Coordinators monitor their context and prompt users at thresholds.
*   Delegators **MUST** break down tasks based on logic, not unreliable token predictions.
*   Delegates **MUST** pre-check task size and push back if too large *before* starting.
*   Leverage MCPs strategically to offload context-heavy operations.
*   These guidelines complement the reactive checkpointing defined in Rule 06.

## Related Links / Further Reading 🔗

*   `.roo/rules/06-iterative-execution-policy.md`
*   `.roo/rules/10-vertex-mcp-usage-guideline.md`
*   `.roo/rules/11-session-management.md`
*   `.ruru/docs/concepts/session_management_v6_whitepaper.md` (If applicable, for session context)