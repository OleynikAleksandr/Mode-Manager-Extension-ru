+++
id = "STD-RULE-NO-TOOL-NAME-PLACEHOLDER-V1"
title = "Standard: Prevent <tool_name> Placeholder in Tool Calls"
context_type = "rules"
scope = "Ensures modes use actual tool names and correct XML structure, not the placeholder '<tool_name>'"
target_audience = ["all"]
granularity = "standard"
status = "active"
last_updated = "2025-08-05"
tags = ["rules", "standard", "tools", "xml", "syntax", "execution", "error-prevention", "placeholder"]
related_context = [
    ".roo/rules/03-standard-tool-use-xml-syntax.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Prevents a common and critical tool execution error."
+++

# Standard: Prevent `<tool_name>` Placeholder in Tool Calls

**Objective:** To explicitly forbid the use of the literal string `<tool_name>` as part of an executable tool call and to reinforce the correct XML structure as defined in [`STD-RULE-TOOL-XML-SYNTAX-V1`](.roo/rules/03-standard-tool-use-xml-syntax.md:1).

**Applies To:** All modes when intending to execute a tool.

**Rule:**

1.  **`<tool_name>` is a Placeholder, Not a Tag:** The string `<tool_name>` is a descriptive placeholder used in documentation and examples to indicate *where an actual tool name should be written*. It is **NEVER** a valid XML tag for tool execution.

2.  **Correct XML Structure:** Tool invocations **MUST** use the specific, correct name of the tool as the primary XML tag (e.g., `<read_file>`, `<write_to_file>`). Parameters are nested within these primary tags. This is mandated by rule [`STD-RULE-TOOL-XML-SYNTAX-V1`](.roo/rules/03-standard-tool-use-xml-syntax.md:1).

3.  **Prohibited Usage:**
    *   Modes **MUST NOT** use `<tool_name>` as the opening or closing tag for a tool call.
        *   **INCORRECT:** `<tool_name><path>file.txt</path></tool_name>`
    *   Modes **MUST NOT** output `<tool_name>actual_tool_name</tool_name>` or similar constructs.
        *   **INCORRECT (as seen in errors):**
            ```
            <tool_name>read_file</tool_name>
            <path>some/file.txt</path>
            ```
            *(This is not valid XML for a tool call and indicates a fundamental misunderstanding of the tool syntax.)*

4.  **Correct Usage Example:**
    To use the `read_file` tool, the syntax **MUST** be:
    ```xml
    <read_file>
        <path>some/file.txt</path>
    </read_file>
    ```

5.  **Self-Correction:** If a mode internally generates a tool call structure that incorrectly includes the literal string `<tool_name>` as an XML tag, or uses it to wrap the actual tool name, it **MUST** self-correct to produce the valid XML syntax with the actual tool name as the primary tag before outputting the tool call.

**Rationale:**
Using the literal placeholder string `<tool_name>` within an XML tool call, or attempting to use it as an XML tag itself, is a fundamental syntax error that prevents tool execution. This rule provides an explicit prohibition to help modes avoid this mistake and to reinforce the existing syntax rules defined in [`STD-RULE-TOOL-XML-SYNTAX-V1`](.roo/rules/03-standard-tool-use-xml-syntax.md:1). Strict adherence is critical for successful tool execution.