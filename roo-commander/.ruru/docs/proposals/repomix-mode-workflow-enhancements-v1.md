+++
id = "PROPOSAL-REPOMIX-WF-ENHANCE-V1"
title = "Proposal: Repomix Specialist Mode Workflow Enhancements"
context_type = "proposal"
scope = "Proposed changes to spec-repomix mode interaction logic"
target_audience = ["prime-coordinator", "roo-commander", "spec-repomix"]
granularity = "detailed"
status = "proposal"
created_date = "2025-06-05"
authors = ["Prime Coordinator"]
tags = ["proposal", "repomix", "workflow", "enhancement", "spec-repomix", "context", "session-management"]
related_context = [
    ".ruru/modes/spec-repomix/spec-repomix.mode.md",
    ".roo/rules/11-session-management.md",
    ".roo/rules/14-context-management-guidelines.md",
    ".ruru/docs/standards/session_artifact_guidelines_v1.md"
]
template_schema_doc = ".ruru/templates/toml-md/18_proposal.README.md"
+++

# Proposal: Repomix Specialist Mode Workflow Enhancements

## 1. Summary

This document proposes enhancements to the `spec-repomix` mode's workflow to improve user interaction, clarify output handling, manage multiple sources effectively, and integrate better with downstream analysis tasks.

## 2. Proposed Changes

### 2.1. Output Location Clarification

**Current Behavior:** The mode likely saves the output Repomix XML file to a default or implicitly determined location.

**Proposed Behavior:**
1.  Before generating the Repomix file, the mode **MUST** ask the user for the intended destination using `ask_followup_question`.
2.  Suggested options should include:
    *   **Session Artifacts (Default):** Save to `.ruru/sessions/[RooComSessionID]/artifacts/repomix/` (creating the `repomix` subdirectory if needed). Suitable for analysis tied to the current session.
    *   **Workspace Context:** Save to `.ruru/context/repomix/` (creating subdirectory if needed). Suitable for general, reusable context not tied to a specific session or mode.
    *   **Persistent Mode Context:** Save to a temporary location, indicating that if intended as persistent context for a specific mode (e.g., `.ruru/modes/[target-mode]/context/`), the user should instruct the Coordinator to move/rename it post-generation (per Rule `RULE-VERTEX-MCP-USAGE-V1`, Section 2.1).
    *   **Specific Path:** Allow the user to specify a custom workspace-relative path.
3.  The mode will then use the chosen path when calling the `pack_codebase` or `pack_remote_repository` MCP tool (assuming the tool supports specifying an output path, otherwise save to default and report path).

**Rationale:** Aligns with Session Management (`RULE-SESSION-MGMT-STANDARD-V7`) and Context Management (`RULE-CONTEXT-MGMT-GUIDELINES-V2`) standards, providing clarity on artifact purpose and lifecycle.

### 2.2. Handling Multiple Sources

**Current Behavior:** Unclear how the mode handles requests involving multiple source directories or repositories. The underlying MCP tools (`pack_codebase`, `pack_remote_repository`) appear to accept only a single source each.

**Proposed Behavior:**
1.  If the user provides multiple sources (directories or remotes):
2.  The mode **MUST** inform the user that combining sources into a single Repomix file is not directly supported by the current tools.
3.  The mode **MUST** explain that it will generate *separate* Repomix XML files for each source, listing the anticipated output file paths based on the chosen output location strategy (from section 2.1).
4.  The mode **MUST** confirm the user is happy to proceed on this basis using `ask_followup_question`.

**Rationale:** Sets clear expectations based on current tool capabilities and prevents errors or ambiguity.

### 2.3. Post-Processing Integration

**Current Behavior:** The mode's responsibility likely ends after generating the Repomix file(s).

**Proposed Behavior:**
1.  After successfully generating the Repomix XML file(s) and reporting their location(s):
2.  The mode **MUST** ask the user if they wish to proceed with analysis or summarization of the generated file(s) using `ask_followup_question`.
3.  The suggested follow-up actions should be context-aware, considering the potential use cases and limitations:
    *   **General Analysis/Summarization:** Offer delegation to `vertex-ai-mcp-server` (e.g., `answer_query_direct` with file content) or `agent-context-condenser`.
    *   **Context Creation:** Ask about the *purpose* of the analysis:
        *   "Create KB context file(s) for a specific mode?" (If yes, prompt for target mode and guide towards saving in `.ruru/modes/[target-mode]/context/`).
        *   "Add context to the current session artifacts?" (If yes, guide towards saving in `.ruru/sessions/[RooComSessionID]/artifacts/notes/` or similar).
        *   "Create general workspace context file(s)?" (If yes, guide towards saving in `.ruru/context/`).
    *   **Handling Large Files:** The mode should acknowledge potential size limitations for direct AI processing. If a generated Repomix file seems excessively large (based on metrics from the packing tool), the prompt should include options like:
        *   "Attempt full analysis (may fail or be truncated)?"
        *   "Analyze only the summary/metrics?"
        *   "Skip analysis for this large file?"
    *   **Default:** Include a "No further action needed" option.

**Rationale:** Creates a more integrated and useful workflow, bridging the gap between codebase packing and subsequent AI-driven analysis or context generation.

## 3. Implementation Notes

These changes primarily involve modifying the `spec-repomix.mode.md` file, specifically updating its core logic and prompts to incorporate the `ask_followup_question` steps described above at the appropriate points in its workflow. The mode needs to handle the user's responses to guide its actions regarding output location, multiple source handling, and post-processing delegation.