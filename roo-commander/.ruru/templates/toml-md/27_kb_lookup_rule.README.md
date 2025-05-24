# Schema Documentation: KB Lookup Rule Template (`27_kb_lookup_rule.md`)

This document outlines the TOML schema used for defining a standard Knowledge Base (KB) lookup rule for a specific mode. This rule governs how the mode consults its internal KB before proceeding with tasks, especially complex or uncertain ones, and how it handles situations where the KB is insufficient.

## Purpose

To provide a standardized, reusable rule template that encourages modes to leverage their dedicated knowledge base (`.ruru/modes/[mode_slug]/kb/`) for guidance, improving reliability and consistency. It also defines a fallback mechanism for information gathering when the KB lacks necessary details.

## TOML Schema

The following fields are defined within the `+++` TOML block:

*   **`id`** (String, Required)
    *   Unique identifier for the rule instance.
    *   Example: `"RURU-RULE-KB-LOOKUP-{{mode_slug}}-V1"`.

*   **`title`** (String, Required)
    *   Human-readable title for the rule.
    *   Example: `"{{Mode Name}} KB Lookup Rule (Conditional + Info Gathering)"`.

*   **`context_type`** (String, Required)
    *   Must be `"rules"`.

*   **`scope`** (String, Required)
    *   Describes the rule's applicability.
    *   Example: `"Mode-specific knowledge base access"`.

*   **`target_audience`** (Array of Strings, Required)
    *   Specifies the mode slug this rule applies to. Uses placeholder `{{mode_slug}}`.
    *   Example: `["dev-python"]`.

*   **`granularity`** (String, Required)
    *   Must be `"rule"`.

*   **`status`** (String, Required)
    *   Lifecycle status: `"active"`, `"draft"`, etc.

*   **`last_updated`** (String, Required)
    *   Date of last modification. Uses placeholder `{{current_date}}`.

*   **`version`** (String, Optional)
    *   Semantic version for the rule definition itself.

*   **`related_context`** (Array of Strings, Optional)
    *   Links to other relevant rules, KBs, or documents.

*   **`tags`** (Array of Strings, Required)
    *   Keywords for search and categorization. Should include `"kb-lookup"`, `"knowledge-base"`, `"rule"`.

*   **`relevance`** (String, Optional)
    *   Brief description of the rule's importance.

*   **`kb_directory`** (String, Required)
    *   The relative path to the mode's specific KB directory. Uses placeholder `{{mode_slug}}`.
    *   Format: `.ruru/modes/{{mode_slug}}/kb/`.

## Markdown Body Structure

The Markdown body defines the procedural logic:

*   `# Knowledge Base (KB) Lookup Rule ...`: Main heading.
*   `**Applies To:** \`{{mode_slug}}\` mode`: Specifies the target mode.
*   `**Rule:**`: Introduces the core logic.
    *   `1. Task Assessment`: Describes evaluating task complexity and confidence.
    *   `2. Conditional KB Consultation`: Defines the IF/ELSE logic for deciding whether to consult the KB based on the assessment.
    *   `KB Scan Procedure`: Outlines the steps for scanning the KB directory (reading README, listing files, prioritizing, exploring).
    *   `3. Apply Knowledge / Execute`: Describes actions based on KB findings (or skipping).
    *   `4. Information Gathering`: Defines the fallback procedure using `ask_followup_question` with specific suggestions (external search via MCP, file reading, user clarification) when the KB is insufficient for complex/uncertain tasks.
*   `## Knowledge Base Index`: A placeholder section intended to be manually maintained within the *actual rule file* (not the template) to index the contents of the mode's specific KB directory.
*   `**Rationale:**`: Explains the benefits of the rule.

## Related Context

*   `.roo/rules/10-vertex-mcp-usage-guideline.md`: Guideline for using MCP tools like Vertex AI for external searches.
*   Mode-specific KB directory: `{{kb_directory}}`.