+++
# --- Basic Metadata (KB Article) ---
id = "KB-ROOCOM-SESSION-INTERACTIONS-V1"
title = "Roo Commander: Session Interaction Workflows & Intent Recognition"
context_type = "kb_article"
scope = "Defines Roo Commander's behavior for enhanced session management interactions."
status = "draft"
version = "1.0"
last_updated = "2025-06-07" # {{YYYY-MM-DD}}
authors = ["Prime Coordinator", "Roo Commander"]
tags = [
    "session-management",
    "user-interaction",
    "workflow",
    "intent-recognition",
    "roo-commander",
    "kb"
]
related_rules = [
    ".roo/rules/11-session-management.md", # RULE-SESSION-MGMT-STANDARD-V7
    # Add specific roo-commander rules that will govern these workflows once created
]
related_templates = [
    ".ruru/templates/toml-md/19_mdtm_session.md",
    ".ruru/templates/toml-md/50_session_summary.md"
]
related_concepts = [
    ".ruru/docs/concepts/session_interaction_whitepaper_v1.md"
]
template_schema_doc = ".ruru/templates/toml-md/08_ai_context_source.README.md" # Using this as a base for KB structure
# --- KB Specific ---
kb_article_type = "procedural_guide" # Options: "procedural_guide", "conceptual_overview", "troubleshooting", "best_practices"
target_audience = ["roo-commander"] # This KB is primarily for Roo Commander's own operational logic
complexity = "medium"
# --- Review & Approval (Optional) ---
# reviewed_by = ""
# review_date = "" # YYYY-MM-DD
# approved_by = ""
# approval_date = "" # YYYY-MM-DD
+++

# Roo Commander: Session Interaction Workflows & Intent Recognition

## 1. Purpose

This Knowledge Base (KB) article details the workflows and logic Roo Commander employs for enhanced session management interactions, as outlined in the "[Whitepaper: Session Interaction Enhancements & Intent Recognition](/.ruru/docs/concepts/session_interaction_whitepaper_v1.md)". It covers explicit user commands (e.g., `!sessions`) and intent-driven session actions.

## 2. Triggering Session Management Interactions

Roo Commander will listen for the following triggers to initiate session management dialogues:

*   **Explicit Command:** `!sessions` (primary trigger).
*   **Question-like Triggers:** `sessions?`, `session options?`
*   **Natural Language Keywords:** Phrases like "manage sessions", "session help", "what can I do with sessions?".

Upon detecting such a trigger, Roo Commander will present the user with a menu of options, typically using the `ask_followup_question` tool.

## 3. Session Management Menu & Workflows

The following options will be presented:

### 3.1. Start New Session

*   **User Selection:** "Start New Session" / "Create a new session"
*   **Workflow:**
    1.  **Prompt for Goal:** Roo Commander uses `ask_followup_question` to ask: "What is the primary goal or title for this new session?"
    2.  **Receive Goal:** User provides the session goal.
    3.  **Initiate Session Creation (Delegation):** Roo Commander initiates the session creation process as per `RULE-SESSION-MGMT-STANDARD-V7`. This involves:
        *   Generating a unique `RooComSessionID` (e.g., `SESSION-[SanitizedGoal]-[YYMMDDHHMMSS]`).
        *   Determining the session path: `.ruru/sessions/[RooComSessionID]/`.
        *   **Delegation to `prime-txt` or `agent-session-setup` (if available):**
            *   **Task:** "Create new session directory structure and initial files."
            *   **Details:**
                *   Create main session directory: `[SessionPath]`.
                *   Create `[SessionPath]artifacts/`.
                *   Create standard artifact subdirectories within `artifacts/` (notes, learnings, etc.) as per `.ruru/docs/standards/session_artifact_guidelines_v1.md`.
                *   Copy `.ruru/templates/plain-md/session_artifact_subdir_readme.md` to each, renaming to `README.md` and replacing `[This Subdirectory Type]`. (Consider `cp -r .ruru/templates/session_artifact_scaffold/. [SessionPath]artifacts/` if scaffold exists).
                *   Create `[SessionPath]session_log.md` using template `.ruru/templates/toml-md/19_mdtm_session.md`, populating `id`, `title` (from user goal), `status = "🟢 Active"`, `start_time`, `coordinator = "roo-commander"`.
    4.  **Confirmation:** Roo Commander confirms to the user: "New session '[User Goal]' started with ID: `[RooComSessionID]`. This is now the active session."
    5.  Roo Commander internally sets this `RooComSessionID` as the active session.

### 3.2. Resume Session

*   **User Selection:** "Resume Session" / "Continue a previous session"
*   **Workflow:**
    1.  **List Sessions (Delegation to `agent-context-resolver` or direct `list_files` & parse):**
        *   Roo Commander needs to identify existing sessions. It can delegate to `agent-context-resolver` ("List available sessions with their titles and statuses") or directly use `list_files` on `.ruru/sessions/` and then `read_file` for each `session_log.md` to parse `title` and `status`.
        *   Filter for sessions with status "🟢 Active" or "⏸️ Paused".
    2.  **Present Options:** Roo Commander uses `ask_followup_question` to present a list of resumable sessions (e.g., "`[RooComSessionID] - [Title] (Status)`").
    3.  **User Selects ID.**
    4.  **Activate Session:**
        *   Roo Commander sets the selected `RooComSessionID` as the active session.
        *   If the session status was "⏸️ Paused", update its `session_log.md` to `status = "🟢 Active"` (delegated to `prime-txt` or via direct file edit if simple).
        *   **Context Loading:** Key information from the resumed session (e.g., last few log entries, linked summary if available, key artifacts) should be loaded into Roo Commander's working context.
        *   Confirm to user: "Resumed session '[Session Title]' (`[RooComSessionID]`)."

### 3.3. Summarize Session

*   **User Selection:** "Summarize Session"
*   **Workflow:**
    1.  **Prompt for Session Choice:** Roo Commander uses `ask_followup_question`: "Which session would you like to summarize? (Options: Current Active Session, Choose from a list)".
    2.  **Identify Target Session:**
        *   If "Current Active Session": Use the active `RooComSessionID`.
        *   If "Choose from a list": List sessions (as in 3.2.1) and let user select.
    3.  **Delegate to `agent-session-summarizer`:**
        *   **Task:** "Summarize session `[TargetSessionID]`."
        *   **Details:**
            *   Instruct agent to read `[TargetSessionPath]session_log.md` and relevant files in `[TargetSessionPath]artifacts/`.
            *   Use template `.ruru/templates/toml-md/50_session_summary.md`.
            *   Save summary to `[TargetSessionPath]artifacts/summaries/SESSUM-[TargetSessionID]-[Timestamp].md`.
    4.  **Report Path:** `agent-session-summarizer` reports completion. Roo Commander informs user: "Session `[TargetSessionID]` summarized. Summary saved at: `[PathToSummaryFile]`."

### 3.4. Extend from Summary / Start New Session with Summary Context

*   **User Selection:** "Extend from Summary" / "Start new session using a summary"
*   **Workflow:**
    1.  **List Summaries (Delegation or `list_files`):**
        *   Roo Commander lists available summary files (e.g., from `.ruru/sessions/*/artifacts/summaries/SESSUM-*.md`). This might involve `list_files` and parsing titles from the summaries.
    2.  **User Selects Summaries:** User selects one or more summary files.
    3.  **Initiate New Session:** Follow workflow 3.1 (Start New Session), prompting for a new goal.
    4.  **Link Summaries:** In the TOML frontmatter of the *new* `session_log.md`:
        *   Add paths of selected summaries to `related_artifacts` (with `artifact_type = "source_summary"`) or a dedicated `source_summaries = ["path/to/summary1.md"]` array.
    5.  **Context Priming:** The content of the selected summaries should be prioritized for loading into the new session's initial context by Roo Commander.
    6.  Confirm: "New session '[NewGoal]' started, incorporating context from selected summaries."

## 4. Intent-Driven Session Actions

Roo Commander will attempt to recognize user intent for session management from natural language. **All inferred intents MUST be confirmed with the user via `ask_followup_question` before execution.**

*   **Intent: Pause Session**
    *   **Example Phrases:** "Let's pause for now," "I need to step away," "Pause session."
    *   **Action:**
        1.  Confirm: "Okay, you'd like to pause the current session `[ActiveSessionID]`. Is that correct?"
        2.  If yes: Update `session_log.md` status to `"⏸️ Paused"`, record `end_time`. (Delegate to `prime-txt` or direct edit).
        3.  Inform: "Session `[ActiveSessionID]` paused."

*   **Intent: Pause & Summarize for Later (e.g., "Work on this tomorrow")**
    *   **Example Phrases:** "We can pick this up tomorrow," "Let's continue this later."
    *   **Action:**
        1.  Confirm: "Got it. You'd like to pause session `[ActiveSessionID]` and resume later. Would you like me to summarize it first for easier continuation?"
        2.  If yes (or by default if configured): Execute Summarize Session workflow (3.3) for the active session.
        3.  After summarization (if any), update `session_log.md` status to `"⏸️ Paused"`, record `end_time`.
        4.  Inform: "Session `[ActiveSessionID]` summarized and paused. Ready when you are."

*   **Intent: Complete Session**
    *   **Example Phrases:** "Let's wrap this up," "We're done with this," "Complete session."
    *   **Action:**
        1.  Confirm: "Alright, you'd like to complete and close session `[ActiveSessionID]`. Shall I generate a final summary?"
        2.  If yes (or default): Execute Summarize Session workflow (3.3).
        3.  Update `session_log.md` status to `"🏁 Completed"`, record `end_time`.
        4.  Inform: "Session `[ActiveSessionID]` completed and logged. Summary (if generated) is at `[PathToSummary]`."

## 5. Delegation Notes

*   **Session Creation/Setup:** Can be delegated to `prime-txt` or a future `agent-session-setup`.
*   **Listing Sessions/Summaries:** Can involve `agent-context-resolver` or direct file system operations by Roo Commander if simpler.
*   **Summarization:** Explicitly delegated to `agent-session-summarizer`.
*   **File Modifications (status updates in logs):** Delegated to `prime-txt` or handled by Roo Commander directly for simple TOML changes if its rules permit.

This KB article will guide the implementation of these features within Roo Commander.