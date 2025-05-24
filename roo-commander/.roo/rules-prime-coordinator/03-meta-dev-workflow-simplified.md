+++
id = "PRIME-RULE-METADEV-SIMPLE-V9" # Incremented version (reflecting removal of protected paths)
title = "Prime Coordinator: Rule - Meta-Development Workflow Trigger (Simplified)"
context_type = "rules"
scope = "Routing requests to modify Roo Commander configuration files"
target_audience = ["prime"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-02" # Updated date
tags = ["rules", "workflow", "meta-development", "configuration", "safety", "prime", "confirmation", "auto-apply", "generated-files", "direct-apply", "complex-syntax"] # Added tag
related_context = [
    "01-operational-principles.md",
    "02-request-analysis-dispatch.md",
    "07-logging-confirmation-simplified.md",
    # Removed: ".ruru/modes/prime-coordinator/kb/05-meta-dev-staging-confirm-auto-apply.md", # Staging KB ref (Removed in V7)
    ".ruru/modes/prime-coordinator/kb/07-meta-dev-direct-auto-apply-operational.md", # Operational KB ref
    "prime-txt", "prime-dev",
    "build_roomodes.js", # Related build script
    ".ruru/workflows/archive/", # Added archive path
    ".ruru/processes/archive/",  # Added archive path
    # V5: Removed automatic archiving for .ruru/workflows and .ruru/processes in Direct Auto-Apply.
    # V6: Confirmed removal of automatic archiving for .ruru/workflows and .ruru/processes in Direct Auto-Apply (no body change needed).
    # V7: Removed Staging Workflow; all non-generated edits use Direct Auto-Apply with worker confirmation.
    # V8: Added check for complex syntax before direct delegation in Direct Auto-Apply.
    # V9: Removed PROTECTED_CORE_PATHS definition and logic.
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Core workflow for configuration changes"
+++

# Rule: Meta-Development Workflow Trigger (Simplified)

This rule defines how to handle requests (Type A from Rule `02`) to modify Roo Commander configuration files, implementing a simplified workflow based on path sensitivity.

**Procedure:**

1.  **Receive Request:** Obtain the target file path (`TARGET_PATH`) and desired changes/instructions.
2.  **Define Path Patterns:**
    *   `GENERATED_CONFIG_PATHS` = patterns matching: `.roomodes*`. (These are generated files, editing directly is discouraged). # Retain this check
3.  **Check Path & Execute Appropriate Workflow:**
    *   **IF `TARGET_PATH` matches `GENERATED_CONFIG_PATHS`:** Initiate **Generated File Handling**.
        *   *Brief:* **Do not proceed with direct edit.** Ask the user for confirmation, explaining that this file is auto-generated. Strongly suggest running the appropriate build script (e.g., `node build_roomodes.js`) instead of manual editing. If the user insists on manual editing *after* the warning, proceed with the "Direct Auto-Apply Workflow (Operational)" below.
    *   **ELSE (All other non-generated config files):** Initiate the **Direct Auto-Apply Workflow (Operational)**.
        *   *Brief:* Check if `desired changes`/instructions contain complex syntax (e.g., XML). **If YES:** Write content to a temp file (e.g., `.ruru/temp/`), delegate to worker (`prime-txt`/`prime-dev`) instructing them to read the temp file. **If NO:** Delegate edit directly to worker with content in the message. Worker applies change directly (worker's internal confirmation rule still applies) -> Worker reports completion/failure.
        *   Consult **KB `.ruru/modes/prime-coordinator/kb/07-meta-dev-direct-auto-apply-operational.md`** for the detailed procedure.

**Key Objective:** Ensure safety for configuration files by relying on the worker's confirmation step (which may be skipped by the Coordinator for low-risk edits per Rule 11) before any write action via the Direct Auto-Apply workflow. Discourage direct editing of generated files (`GENERATED_CONFIG_PATHS`) by suggesting build scripts first. Handle complex syntax safely during delegation.