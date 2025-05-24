+++
id = "CMD-RULE-META-TOOL-HANDLING-V3" # Adjusted ID for Commander, incremented version
title = "Roo Commander: Rule - Meta-Discussion Tool Output Handling" # Adjusted Title
context_type = "rules"
scope = "Handling the display or referencing of tool usage during meta-discussions"
target_audience = ["roo-commander"] # Target Commander
granularity = "guideline"
status = "active"
last_updated = "2025-05-02" # Updated date
tags = ["rules", "meta-discussion", "tool-use", "safety", "roo-commander", "logging", "analysis", "file-output"] # Added roo-commander tag
related_context = [
    ".roo/rules/03-standard-tool-use-xml-syntax.md",
    ".roo/rules/08-logging-procedure-simplified.md" # Logging rule for file creation
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Prevents accidental tool execution during analysis/troubleshooting"
+++

# Rule: Meta-Discussion Tool Output Handling

**Objective:** To prevent accidental tool execution when discussing or analyzing previous interactions, logs, or mode behavior that involves tool usage syntax, while still allowing access to exact syntax details when necessary.

**Applies To:** `roo-commander` (A corresponding rule MUST exist for `prime-coordinator`).

**Rule:**

1.  **Identify Context:** When processing user input, provided content (like chat logs or file content), or formulating responses, carefully assess if the context clearly indicates a **meta-discussion** or if the response is purely conversational/explanatory. This includes:
    *   Analyzing or reviewing past chat logs or MDTM task logs.
    *   Troubleshooting mode behavior or errors related to tool use.
    *   Discussing potential improvements to modes, rules, or workflows involving tool interactions.
    *   Responding to user feedback about specific tool interactions.
    *   Any situation where the user explicitly states they are discussing *past* tool use and do *not* want tools executed.
    *   **Crucially:** Any internal thought process or response formulation that involves *considering* or *describing* a tool call, but *not* intending to execute it immediately as the *sole* XML block in the response.

2.  **Strictly Avoid Direct Tool XML Output in Chat:** If the context is identified as a meta-discussion OR if the output is part of conversational text rather than an intended tool execution:
    *   **ABSOLUTELY MUST NOT** output text formatted according to the standard tool usage XML syntax directly into the chat response, unless it is the *single, final XML block intended for immediate execution* by the system.
    *   **MUST NOT** output text that mimics the tool usage XML syntax directly into the chat response, even if escaped (e.g., using backticks or other methods). This includes describing tool usage by showing partial or example XML.

3.  **Describe or Offer File Output:** When referencing a specific tool use from the analyzed content or internal consideration:
    *   **Default Action:** Describe the tool use in plain text or standard Markdown, focusing on the *action*, *tool name*, and key *parameters* without using the XML structure. Adhere to Rule `RULE-TOOL-REPRESENTATION-V1`.
        *   *Example Description:* "In the log, the mode then used the `read_file` tool, specifying the path `.ruru/workflows/WF-REPOMIX-V2/README.md`."
        *   *Example Description:* "I considered using `ask_followup_question` to clarify the path, but decided against it."
    *   **Alternative (Offer File Output):** If a simple description seems insufficient, or if the exact XML syntax might be important for the discussion (e.g., debugging complex parameters), **offer to write the detailed tool usage information (including the raw XML block) to a temporary file.**
        *   Propose this to the user using plain text, *not* by including a tool block in the proposal itself.
        *   If the user agrees:
            *   Generate a unique filename (e.g., `YYYYMMDDHHMMSS-tool-details.txt`).
            *   Use `write_to_file` to save the detailed information (including the raw XML) to `.ruru/docs/meta_discussion/[filename]`. Ensure this directory exists or can be created.
            *   Report the full path of the created file to the user.
            *   Log the creation of this file (Rule `08-logging-procedure-simplified.md`).

4.  **Self-Correction Check (CRITICAL):** Before sending **ANY** response, perform a final check on the generated content. If the response contains **ANY** text for *any* tool name, including `ask_followup_question` that is *not* the single, intended tool call for execution in the *next* turn, **ABSOLUTELY MUST** rephrase the response to describe the tool use (as per point 3a) or remove the offending XML entirely. This acts as a final, critical safety net against accidental XML leakage, especially for tools like `ask_followup_question` used conversationally or descriptively. **Do not output tool XML unless it is the explicit action you intend to take next.**

**5. Rationale:** This approach prioritizes safety by strictly keeping executable syntax out of the main chat flow during meta-discussions and conversational explanations. It provides a default descriptive method, a secondary option to safely export exact details to a file upon user request, and a strengthened final self-correction check, facilitating deeper analysis when needed without risking accidental execution.