+++
id = "ROOCOM-RULE-SESSION-INTENT-V1"
title = "Roo Commander: Session Management Intent Recognition & Handling"
context_type = "rules"
scope = "Governs how Roo Commander detects and initiates session management workflows based on user input and intent."
target_audience = ["roo-commander"]
granularity = "procedure"
status = "draft"
last_updated = "2025-06-07" # {{YYYY-MM-DD}}
tags = ["rules", "roo-commander", "session-management", "intent-recognition", "workflow-trigger"]
related_context = [
    ".ruru/modes/roo-commander/kb/15_session_interaction_workflows.md",
    ".ruru/docs/concepts/session_interaction_whitepaper_v1.md",
    ".roo/rules/11-session-management.md" # RULE-SESSION-MGMT-STANDARD-V7
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
+++

# Roo Commander: Session Management Intent Recognition & Handling

## 1. Objective

This rule defines how Roo Commander identifies user intent related to session management (e.g., starting, pausing, resuming, summarizing sessions) and initiates the appropriate workflows by consulting its knowledge base.

## 2. Trigger Identification

Roo Commander **MUST** monitor user input for explicit commands and natural language cues related to session management.

*   **Explicit Commands:**
    *   `!sessions`
    *   `sessions?`
    *   `/session` (and subcommands like `/session start`, `/session summary`, `/session resume`, `/session pause`, `/session complete`, `/session extend`)
*   **Natural Language Keywords/Phrases (Examples - to be expanded based on training/observation):**
    *   Intent: Start New Session: "new session", "start a new session for...", "let's begin a new session"
    *   Intent: Pause Session: "let's pause", "pause for now", "take a break", "hold session"
    *   Intent: Resume Session: "resume session", "continue [session ID/title]", "let's pick up where we left off on [session ID/title]", "load session"
    *   Intent: Summarize Session: "summarize this session", "what did we do?", "create a summary for [session ID/title]", "session recap"
    *   Intent: End/Complete Session & Summarize: "work on this tomorrow", "continue this later", "wrap this up", "we're done with this", "finish session", "end session"
    *   Intent: Extend from Summary: "start from summary", "use summary for new session", "base new session on [summary file]"

## 3. Intent Confirmation

*   Upon detecting a potential session-related intent, Roo Commander **MUST** use the `ask_followup_question` tool to:
    1.  Clearly state the inferred intent.
    2.  Provide the user with options to confirm, deny, or clarify the intent.
    *   *Example for "work on this tomorrow":* "It sounds like you want to pause the current session `[ActiveSessionID]` and create a summary to pick up later. Is that correct? Options: [Yes, summarize and pause], [Just pause, no summary], [No, that's not what I meant]"
    *   *Example for `!sessions` or `sessions?`:* "How would you like to manage sessions? Options: [Start New Session], [Resume Session], [Summarize Session], [Extend from Summary], [Cancel]"

## 4. Workflow Initiation via KB Consultation

*   Once the user confirms the intent (or selects an option from the menu), Roo Commander **MUST** consult its primary knowledge base article for session interactions: **`.ruru/modes/roo-commander/kb/15_session_interaction_workflows.md`**.
*   This KB article contains the detailed step-by-step procedures for each confirmed session management action.
*   Roo Commander **MUST** follow the procedures outlined in this KB to execute the requested session management workflow.

## 5. Delegation

*   As detailed in the KB (`.ruru/modes/roo-commander/kb/15_session_interaction_workflows.md`), Roo Commander **SHOULD** delegate specific sub-tasks within these workflows to appropriate specialist modes when necessary. This includes, but is not limited to:
    *   File creation/modification for session logs and artifacts (e.g., to `prime-txt` or a dedicated session setup agent).
    *   Generation of session summaries (to `agent-session-summarizer`).
    *   Listing available sessions or summaries (potentially to `agent-context-resolver` or via direct file system tools if simpler).

## 6. Logging

*   All session management actions initiated, intents confirmed, and significant workflow steps (including delegations) **MUST** be logged to the active `session_log.md` (if a session is active) as per `RULE-SESSION-MGMT-STANDARD-V7` and KB `.ruru/modes/roo-commander/kb/12-logging-procedures.md`.

This rule ensures that Roo Commander handles session-related requests consistently, leverages its knowledge base for detailed procedures, and maintains user control through confirmation.