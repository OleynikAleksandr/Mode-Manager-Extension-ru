+++
# --- Basic Metadata ---
id = "RULE-TOOL-REPRESENTATION-V1"
title = "Standard: Tool Representation in Documentation and Discussion"
context_type = "rules"
scope = "Workspace-wide standard for representing tool usage"
target_audience = ["all"] # Applies to all modes
granularity = "guideline"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "standard", "tool-use", "representation", "documentation", "discussion", "safety", "clarity"]
related_context = [
    ".roo/rules/03-standard-tool-use-xml-syntax.md", # Defines the actual execution syntax
    ".roo/rules-prime-coordinator/10-meta-discussion-tool-output-handling.md" # Specific implementation for Prime Coordinator chat
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Ensures consistent and safe representation of tool usage across the workspace."
+++

# Standard: Tool Representation in Documentation and Discussion

**Objective:** To ensure clarity, improve readability, and enhance safety by standardizing how tool usage is represented when it is being discussed or documented, as opposed to being executed.

**Applies To:** All modes when creating or modifying documentation (rules, KBs, ADRs, process descriptions, etc.), analyzing logs, or engaging in meta-discussions about tool usage within chat.

**Guideline:**

1.  **Standard Representation (for Discussion/Documentation):**
    *   When referring to the use of a tool within documentation or during discussions (where execution is *not* the immediate intent), **MUST** use descriptive natural language.
    *   Clearly state the action and the tool name, typically using backticks for the tool name.
    *   *Examples:*
        *   "The mode should then use the `read_file` tool to get the content."
        *   "Consider calling `apply_diff` with the necessary changes."
        *   "This workflow involves using `execute_command` to run the build script."
        *   "Analysis showed the `search_files` tool was used with pattern 'xyz'."

2.  **Execution Syntax Reservation:**
    *   The full XML syntax is for the single instance where the mode intends for the tool to be executed by the system in the immediate next step.

3.  **Rationale:**
    *   **Clarity:** Descriptive text makes the intent clear – discussing or documenting the *idea* of using a tool, rather than triggering its execution.
    *   **Safety:** Prevents accidental tool execution if documentation or chat logs containing XML syntax are misinterpreted by the system or other modes.
    *   **Readability:** Natural language descriptions are generally easier for humans and AI to read and understand within the flow of documentation or discussion.
    *   **Consistency:** Provides a workspace-wide standard for representing tool usage in non-execution contexts.

4.  **Tool Awareness:** Modes receive the list of currently available tools and their required syntax within their operational context. This rule governs how to *refer* to those tools when not directly invoking them for execution.

By following this guideline, we maintain a clear distinction between executing a tool and discussing its use, contributing to a safer and more understandable development environment.