+++
# --- Basic Metadata ---
id = "CMD-RULE-SESSION-IMPL-V7" # Incremented version
title = "Roo Commander: Session Management V7 Implementation" # Updated title
context_type = "rules"
scope = "Mode-specific implementation of the workspace session management standard."
target_audience = ["roo-commander"]
granularity = "procedure"
status = "active"
last_updated = "2025-06-05" # Use current date
tags = ["session", "logging", "implementation", "roo-commander", "confirmation", "skip-confirm", "v7"] # Added v7 tag
related_context = [
    ".roo/rules/11-session-management.md", # Points to V7 standard
    ".ruru/docs/standards/session_artifact_guidelines_v1.md", # Added artifact guidelines
    ".ruru/templates/toml-md/19_mdtm_session.md",
    ".roo/rules-prime-coordinator/03-meta-dev-workflow-simplified.md" # Reference to the simplified workflow rule
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md" # Assuming standard AI rule template schema
relevance = "High: Defines how roo-commander handles sessions and confirmations"
+++

# Roo Commander: Session Management V7 Implementation

This rule details how `roo-commander` implements the standard Session Management Workflow V7 (`.roo/rules/11-session-management.md`).

1.  **Session State Detection:** Implement logic to detect session state (New, Continue, New-Ref, None) based on chat history or future system signals. Maintain the active `RooComSessionID` if applicable.

2.  **Session Initiation (New Session):**
    *   **Prompting First:** Unless the initial task is clearly trivial, **MUST** first prompt the user regarding session log creation (per Rule 11, Section 3) using `ask_followup_question` with options like: "Create log with goal: [Suggest goal]", "Create log (no goal)", "Proceed without log (default)".
    *   **Default Behavior:** If the user selects the default option ("Proceed without log") or doesn't explicitly opt-in via the prompt, the default is **not** to create a session log.
    *   **Creation:** If user explicitly opts-in via the prompt, follow **V7** Rule 11, Section 3 procedure (create folder `.ruru/sessions/SESSION-[SanitizedGoal]-[YYMMDDHHMM]/`, subfolder `artifacts/`, `session_log.md` using template `19_mdtm_session.md`, log initiation). Retain `RooComSessionID`.
3.  **Logging:** If a session is active (`RooComSessionID` is set), append concise log entries for events listed in Rule 11, Section 5 to the `session_log.md` using `insert_content` (line 0). Ensure contextual note artifact paths are relative (e.g., `artifacts/notes/NOTE-...`) and update `related_artifacts` in the TOML header via `apply_diff` or similar when notes are created.
4.  **Confirmation Workflow (Prime Edits via `prime-txt`/`dev`):**
    *   Follow Rule 11, Section 5: Prepare `TARGET_PATH`, `NEW_CONTENT`.
    *   **Assess Risk/Complexity:** Evaluate the proposed edit (`NEW_CONTENT` for `TARGET_PATH`).
    *   **Confirmation Skip Logic:**
        *   **Default Behavior:** Skip confirmation (using `ask_followup_question`) for edits assessed by Coordinator as **highly routine, simple, AND low-risk**. This should be the common case for Roo Commander edits delegated to Prime workers. Log the decision and rationale (e.g., "Skipped confirm - low risk edit") to the active Session Log (if any). Proceed directly to Delegation (Step 4.1).
        *   **MUST Confirm** if the edit is assessed as complex, high-risk, potentially destructive, or if user confirmation is explicitly desired for traceability. If confirming, use `ask_followup_question` to present the proposed change and get user approval. Log the request/response (if session active). If No, stop.
    *   **4.1. Delegation:** Instruct `prime-txt`/`dev` via `new_task`.
        *   If confirmation was skipped: "Apply changes to `[TARGET_PATH]`: [Provide NEW_CONTENT or clear instructions]. **Confirmation skipped by Coordinator - low risk.** No re-confirm needed."
        *   If confirmation was done via `ask_followup_question`: "Apply changes to `[TARGET_PATH]`: [Provide NEW_CONTENT or clear instructions]. **User confirmed via prompt. No re-confirm needed.**"
        *   Log delegation (if session active).
    *   **4.2. Await & Log Result:** Await `attempt_completion` from the executor. Log the outcome (success/failure) in `session_log.md` (if session active).
5.  **Continuing/Referencing:** Implement logic to handle user requests or future commands (`/continue_session`) to load and use existing `RooComSessionID`s.
