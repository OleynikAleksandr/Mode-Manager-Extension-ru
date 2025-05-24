+++
# --- Basic Metadata ---
id = "CONCEPT-SESSION-MGMT-V5-WHITEPAPER-V1"
title = "Whitepaper: Session Management V5 Workflow"
context_type = "documentation"
scope = "Explains the proposed Session Management V5 workflow for Roo Commander and Prime Coordinator"
target_audience = ["all"] # Developers, Coordinators, Users
granularity = "detailed"
status = "draft" # Initial draft
last_updated = "2025-05-02" # Use current date from environment_details (approx)
tags = ["session-management", "workflow", "coordination", "traceability", "context", "mdtm", "artifacts", "prime-coordinator", "roo-commander", "v5"]
related_context = [
    ".roo/rules/04-mdtm-workflow-initiation.md",
    ".ruru/docs/standards/mdtm_standard.md" # Assuming this exists
]
# template_schema_doc = ".ruru/templates/toml-md/NN_documentation.README.md" # Placeholder if a specific template exists
+++

# Whitepaper: Session Management V5 Workflow

## 1. Introduction & Goal

This whitepaper outlines the proposed "Session Management V5" workflow designed for Roo Commander and Prime Coordinator interactions.

**Goal:** The primary objective is to significantly enhance traceability, context management, and continuity across user interactions. This addresses limitations inherent in relying solely on conversational history (which can become large and unwieldy) or standalone MDTM tasks (which track specific work units but not the overarching user goal). Session Management V5 aims to provide a structured, persistent record of a user's interaction focused on achieving a particular objective.

## 2. Core Idea: The Session Log

The central concept is the introduction of an optional, structured **Session Log**. This log is implemented as a Markdown file using the TOML-based MDTM format and is associated with a specific user goal or a defined period of interaction. It acts as a central hub linking related activities, artifacts, and decisions made during that session.

## 3. Session State Awareness & Initiation

*   **Detection:** Coordinators (Prime Coordinator and Roo Commander) will be enhanced to detect whether a user interaction is part of an ongoing session or represents a new goal. This might involve checking for recently active session logs or explicitly asking the user.
*   **Initiation Prompt:** When a new interaction begins that seems likely to involve multiple steps or generate artifacts, the Coordinator will prompt the user: "Would you like to start a session log for this goal? This helps track progress and related files. (Yes/No/Quick Task)".
*   **User Choice:**
    *   **"Yes":** The user defines a brief goal for the session. The Coordinator generates a unique Session ID (e.g., `SESS-[YYYYMMDD-HHMMSS]`). A dedicated directory is created: `.ruru/sessions/[RooComSessionID]/`. Within this directory, the primary `session_log.md` file is created using an MDTM-like template.
    *   **"No" / "Quick Task":** The interaction proceeds without a dedicated session log, suitable for simple, single-step requests.
*   **Session Directory Structure:**
    ```
    .ruru/
    └── sessions/
        └── SESS-20250502-153000/  # Example Session ID
            ├── session_log.md     # The main log file (MDTM format)
            └── artifacts/         # Subdirectory for generated/related files
                └── proposed_edit_file_abc_1.md
                └── research_notes_api_xyz.txt
    ```

## 4. The Session Log File (`session_log.md`)

The `session_log.md` file utilizes the familiar TOML+Markdown (MDTM) format for structure and traceability.

*   **TOML Frontmatter:**
    *   `id`: The unique Session ID (e.g., `"SESS-20250502-153000"`).
    *   `title`: User-defined goal for the session (e.g., `"Refactor user authentication module"`).
    *   `status`: Tracks the session state (`"🟢 Active"`, `"⏸️ Paused"`, `"🏁 Completed"`, `"🔴 Error"`).
    *   `start_time`: Timestamp of session creation.
    *   `end_time`: Timestamp of session completion/pausing.
    *   `coordinator`: ID of the coordinating mode (Prime or Roo).
    *   `related_tasks`: An array listing IDs of formal MDTM tasks spawned during this session (e.g., `["TASK-DEV-PY-20250502-154500"]`).
    *   `related_artifacts`: An array listing paths to files stored in the session's `artifacts/` directory (relative to the session dir, e.g., `["artifacts/proposed_edit_file_abc_1.md"]`).
    *   `tags`: Keywords related to the session goal.
*   **Markdown Body:**
    *   **Goal/Description:** Expanded description of the session's objective.
    *   **Log Entries:** A chronologically ordered list of significant events, decisions, delegations, confirmations, errors, and results. Each entry should be timestamped.

## 5. Artifact Management

*   The `artifacts/` subdirectory within the session folder (`.ruru/sessions/[RooComSessionID]/artifacts/`) serves as a dedicated storage location for files generated or relevant during the session.
*   Examples include:
    *   Proposed file changes awaiting confirmation.
    *   Research notes gathered via MCP tools.
    *   Configuration snippets.
    *   Diagram source files (e.g., Mermaid).
*   Storing these artifacts within the session directory ensures they are persistent and directly linked to the session's context via the `related_artifacts` field in the `session_log.md`. This prevents loss of context if chat history scrolls or is cleared.

## 6. Revised Confirmation Workflow (Prime Edits)

This workflow leverages the session artifacts directory for safer and more traceable edits, particularly for `prime-txt` and `prime-dev`:

1.  **Coordinator Proposes:** The Coordinator (e.g., Prime Coordinator) determines a file change is needed.
2.  **Write to Artifact:** Instead of directly asking `prime-txt`/`dev` to write, the Coordinator first writes the *entire proposed file content* or a *diff* to a temporary file within the current session's `artifacts/` directory (e.g., `.ruru/sessions/[RooComSessionID]/artifacts/proposed_edit_[target_filename]_[timestamp].md`).
3.  **Log Artifact:** The Coordinator logs the creation of this artifact file in the `session_log.md` and updates the `related_artifacts` list in the TOML block.
4.  **Ask User Confirmation:** The Coordinator uses `ask_followup_question` to ask the user: "I propose the following changes to `[target_filepath]`. Please review the proposed content/diff here: `.ruru/sessions/[RooComSessionID]/artifacts/[artifact_filename]`. Do you approve?"
5.  **User Response:** The user reviews the artifact file and responds (Yes/No).
6.  **Coordinator Instructs Executor:**
    *   **If Yes:** The Coordinator instructs the appropriate Prime Editor (`prime-txt` or `prime-dev`) to apply the changes *using the content from the confirmed artifact file*. Crucially, this instruction includes `[BYPASS_CONFIRMATION]` because the user has already confirmed via the Coordinator. The executor reads the artifact and applies the change using `write_to_file` or `apply_diff`.
    *   **If No:** The Coordinator logs the rejection in the session log and discusses alternatives with the user.
7.  **Log Execution:** The Coordinator logs the execution (or rejection) outcome in the `session_log.md`.
8.  **Optional Skip:** For very simple, non-critical, or non-protected file edits (e.g., adding a comment to a non-rule file), the Coordinator *may* optionally skip the artifact step and use the standard Prime Editor confirmation flow, but the artifact flow is preferred for traceability and safety.

## 7. Logging within the Session

The Markdown body of `session_log.md` becomes the primary location for detailed, chronological logging of the interaction flow. Key events logged include:

*   Session start/end/pause.
*   User prompts and significant responses.
*   Delegations to specialist modes (including MDTM Task IDs).
*   Creation and confirmation of artifacts.
*   Results received from specialist modes.
*   Errors encountered.
*   Key decisions made.

This provides a much richer narrative trace than just MDTM task checklists alone.

## 8. Applicability (Prime vs. Roo Commander)

*   **Prime Coordinator:** This workflow is highly beneficial for power users interacting via Prime Coordinator, offering fine-grained control and maximum traceability. Session logging might be suggested more proactively.
*   **Roo Commander:** The core concepts apply, but the initiation might be more streamlined or context-dependent for a more user-friendly experience. Roo Commander might default to "Quick Task" more often unless the user explicitly requests detailed tracking or the task complexity clearly warrants it.

## 9. Benefits

*   **Enhanced Traceability:** Provides a clear, persistent record of an entire interaction flow towards a specific goal.
*   **Improved Context Management:** Reduces reliance on volatile chat history; key information and artifacts are linked and persisted.
*   **Structured Artifact Linking:** Ensures generated files, research, and proposed changes are not lost and are easily associated with the relevant context.
*   **Better Handling of Complex/Multi-Step Tasks:** Complements MDTM by providing the overarching narrative and linking individual task units.
*   **Safer Confirmation:** The artifact-based confirmation workflow adds a layer of safety and review before executing file modifications.
*   **Continuity:** Allows users and Coordinators to pause and resume complex interactions more easily by reviewing the session log.

## 10. Relationship to MDTM Tasks

Session Logs **complement**, not replace, formal MDTM task files.
*   **Session Log:** Tracks the *overall user interaction* and goal, linking various activities and artifacts. It's the narrative thread.
*   **MDTM Task:** Tracks a *specific, well-defined unit of work* delegated to a specialist, focusing on checklist completion and status. It's a work package.

A single session may involve zero, one, or multiple MDTM tasks, all linked back through the `related_tasks` field in the `session_log.md`.