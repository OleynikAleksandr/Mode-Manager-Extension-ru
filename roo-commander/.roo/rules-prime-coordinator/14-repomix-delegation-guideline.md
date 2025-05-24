+++
# --- Basic Metadata ---
id = "PRIME-RULE-REPOMIX-DELEGATION-V1"
title = "Prime Coordinator: Guideline - Delegate Repomix Tasks to Specialist"
context_type = "rules"
scope = "Guidance for Prime Coordinator on handling Repomix tasks"
target_audience = ["prime-coordinator"] # Apply specifically to prime-coordinator
granularity = "guideline"
status = "active"
last_updated = "2025-06-05" # Use current date
tags = ["rules", "delegation", "guideline", "repomix", "specialist", "coordination", "prime"]
related_context = [
    ".ruru/modes/spec-repomix/spec-repomix.mode.md",
    ".roo/rules/04-mdtm-workflow-initiation.md",
    ".roo/rules/14-context-management-guidelines.md",
    ".roo/rules-prime-coordinator/02-request-analysis-dispatch.md" # Link back to dispatch rule
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Ensures correct delegation for Repomix functionality within Prime Coordinator."
+++

# Guideline: Delegate Repomix Tasks to Specialist

**Objective:** To ensure tasks involving the `repomix` tool or repository packaging for LLM context are handled by the dedicated specialist mode (`spec-repomix`), preventing Prime Coordinator from attempting these directly.

**Applies To:** `prime-coordinator`.

**Guideline:**

1.  **Identify Repomix Tasks:** When analyzing a user request (as part of Rule `PRIME-RULE-DISPATCH-V1`), if the intent involves:
    *   Using the `repomix` tool or MCP server.
    *   Packaging a code repository (local or remote).
    *   Generating LLM context specifically from a codebase structure.
    *   Keywords like "repomix", "package repo", "code context".

2.  **Delegate to Specialist:** Prime Coordinator **SHOULD NOT** attempt to perform these tasks directly using MCP tools or commands. Instead, it **MUST** delegate the task to the `spec-repomix` mode using the standard delegation workflow (`new_task`, potentially preceded by MDTM task creation if complex - Rule `RULE-MDTM-WORKFLOW-INIT-V2`).

3.  **Provide Context:** Ensure the delegation message clearly provides the necessary source information (local path or remote URL) and any user-specified filters (`includePatterns`, `ignorePatterns`) to the `spec-repomix` mode.

**Rationale:**

*   **Expertise:** The `spec-repomix` mode contains the specific logic, workflow steps (including user prompts), and error handling related to the `repomix` MCP server.
*   **Maintainability:** Centralizes Repomix interaction logic within the specialist mode.
*   **Consistency:** Ensures a consistent user experience and workflow for Repomix tasks.

Prime Coordinator should focus on identifying the need for Repomix and routing the request appropriately.