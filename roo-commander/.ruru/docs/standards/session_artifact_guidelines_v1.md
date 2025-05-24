+++
# --- Basic Metadata ---
id = "SESSION-ARTIFACT-GUIDELINES-V1"
title = "Standard: Session Artifact Guidelines V1"
context_type = "standard"
scope = "Workspace-wide standard for session artifact structure and naming"
target_audience = ["all"] # Applies to all modes interacting with sessions
granularity = "detailed"
status = "active"
last_updated = "2025-06-05" # Use current date
tags = ["session", "artifacts", "standard", "guidelines", "context", "notes", "v1"]
related_context = [
    ".roo/rules/11-session-management.md", # The main session management rule
    ".ruru/docs/concepts/session_management_v6_whitepaper.md"
]
template_schema_doc = ".ruru/templates/toml-md/14_standard.README.md" # Schema for standard docs
relevance = "High: Defines how to structure and use session artifacts for V6+"
+++

# Standard: Session Artifact Guidelines V1

## 1. Purpose

This document defines the standard structure, naming conventions, and usage guidelines for **Session Artifacts** within the Session Management V6 workflow.

The primary purpose of session artifacts in V6+ is to capture **contextual notes** relevant to the session's goal. These artifacts provide richer, structured context beyond the chronological log entries in `session_log.md`. They are **not** intended for managing edit confirmations as in previous versions.

## 2. Directory Structure

All session artifacts **MUST** reside within the `artifacts/` subdirectory of the specific session directory (e.g., `.ruru/sessions/SESSION-[SanitizedGoal]-[YYMMDDHHMM]/artifacts/`).

The following standard subdirectories **SHOULD** be used to organize artifacts by type:

*   `artifacts/notes/` - General notes, observations, meeting minutes.
*   `artifacts/learnings/` - Key insights, discoveries, or takeaways.
*   `artifacts/environment/` - Details about the system, setup, or configuration relevant to the session.
*   `artifacts/docs/` - Drafts or snippets of documentation generated during the session.
*   `artifacts/research/` - Findings from external searches or investigations (e.g., web searches, documentation lookups).
*   `artifacts/blockers/` - Specific obstacles encountered and potential solutions.
*   `artifacts/questions/` - Questions raised during the session (for users, other modes, or future investigation).
*   `artifacts/snippets/` - Useful code snippets generated or referenced.
*   `artifacts/feedback/` - Direct feedback from the user or observations about user reactions/sentiment captured during the session.
*   `artifacts/features/` - Specific feature ideas or refinements discussed.
*   `artifacts/context/` - Relevant contextual information, including actual context files (e.g., text, data, configuration snippets) or references/links to external resources.
*   `artifacts/deferred/` - Ideas or tasks noted but deferred for later action.

Modes **MAY** create other subdirectories if a clear need arises, but should prefer these standard categories.

## 3. Naming Conventions

Artifact filenames **MUST** follow the convention:

`[TYPE]-[description]-[YYMMDDHHMM].md`

*   **`[TYPE]`:** An uppercase identifier corresponding to the subdirectory (e.g., `NOTE`, `LEARNING`, `ENV`, `DOC`, `RESEARCH`, `BLOCKER`, `QUESTION`, `SNIPPET`, `FDBK`, `FEATURE`, `CONTEXT`, `DEFERRED`).
*   **`[description]`:** A brief, filesystem-safe description of the artifact's content (e.g., `initial_plan`, `api_rate_limit_details`, `db_schema_v2`, `python_requests_example`). Use underscores (`_`) instead of spaces. Keep it concise.
*   **`[YYMMDDHHMM]`:** Timestamp indicating when the artifact was created.
*   **`.md`:** Artifacts should generally be Markdown files, using TOML+MD format if structured metadata is beneficial for the specific artifact type.

*Examples:*

*   `artifacts/notes/NOTE-initial_planning_session-2506050100.md`
*   `artifacts/learnings/LEARNING-auth_flow_complexity-2506050130.md`
*   `artifacts/snippets/SNIPPET-fetch_data_hook-2506050200.md`
*   `artifacts/research/RESEARCH-react_server_components_comparison-2506050215.md`
*   `artifacts/context/CONTEXT-api_schema_v1-2506050230.json`
*   `artifacts/feedback/FDBK-ui_element_xyz-2506050245.md`

## 4. Artifact Type Guidance (Intended Content)

*   **NOTE:** General observations, meeting summaries, unstructured thoughts. Use template `.ruru/templates/toml-md/31_session_note.md`.
*   **LEARNING:** Significant insights gained, patterns noticed, "aha!" moments. Use template `.ruru/templates/toml-md/32_session_learning.md`.
*   **ENV:** Specific configuration details, dependency versions, setup steps relevant *to this session*. Use template `.ruru/templates/toml-md/33_session_environment.md`.
*   **DOC:** Draft documentation, README sections, comments. Use template `.ruru/templates/toml-md/34_session_doc_snippet.md`.
*   **RESEARCH:** Summaries of external information gathering, links, key findings. Use template `.ruru/templates/toml-md/35_session_research.md`.
*   **BLOCKER:** Description of an impediment, steps taken, potential workarounds. Use template `.ruru/templates/toml-md/36_session_blocker.md`.
*   **QUESTION:** Specific questions needing answers. Use template `.ruru/templates/toml-md/37_session_qna.md`.
*   **SNIPPET:** Code examples, configuration blocks, useful commands. Use template `.ruru/templates/toml-md/38_session_snippet.md`.
*   **FDBK (Feedback):** Direct quotes or summaries of user input/reactions. Use template `.ruru/templates/toml-md/39_session_feedback_item.md`. Stored in `artifacts/feedback/`.
*   **FEATURE:** Ideas for new features or enhancements sparked during the session. Use template `.ruru/templates/toml-md/40_session_feature_note.md`.
*   **CONTEXT:** Actual context files (text, data, config) or links to external resources. Use template `.ruru/templates/toml-md/41_session_context_item.md` if a structured note is needed, otherwise store raw files directly.
*   **DEFERRED:** Items explicitly postponed for later consideration. Use template `.ruru/templates/toml-md/42_session_deferred.md`.

## 5. Creation Guidance

Modes (especially specialists or coordinators synthesizing information) **SHOULD** consider creating artifacts when:

*   A significant decision is made.
*   A key piece of information is discovered or generated (e.g., research summary, complex snippet).
*   A notable learning or insight occurs.
*   Specific environmental details are crucial for reproducibility or context.
*   User feedback needs to be captured accurately.
*   An idea or question arises that warrants separate tracking.

Aim for artifacts that capture valuable context concisely. Avoid creating artifacts for trivial details already clear from the main log.

## 6. Linking

When an artifact is created:

1.  The event **MUST** be logged in the `session_log.md` file, including the artifact type and a brief description.
2.  The relative path to the artifact (from the session directory root, e.g., `artifacts/notes/NOTE-...`) **MUST** be added to the `related_artifacts` array in the TOML frontmatter of `session_log.md`. This ensures discoverability and linkage.