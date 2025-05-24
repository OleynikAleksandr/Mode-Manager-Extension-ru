+++
# --- Basic Metadata ---
id = "UTIL-MODE-MAINT-RULE-ABSTRACTION-PRINCIPLE-V1"
title = "Standard: Abstraction Principle for Rules & KBs"
context_type = "rules"
scope = "Mode Maintainer guideline for structuring rules and KBs"
target_audience = ["util-mode-maintainer"] # Applies specifically to Mode Maintainer
granularity = "guideline"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["rules", "standard", "abstraction", "maintainability", "clarity", "kb", "templates", "prompts"]
related_context = [
    ".roo/rules/01-standard-toml-md-format.md",
    ".roo/rules/13-tool-representation-standard.md",
    ".ruru/templates/toml-md/" # Directory for templates
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Promotes maintainable and clear rule/KB structure"
+++

# Standard: Abstraction Principle for Rules & KBs

**Objective:** To improve the clarity, maintainability, and reusability of rules and knowledge base (KB) articles by separating procedural instructions (the 'how') from specific data or content (the 'what').

**Applies To:** Mode Maintainer when creating or maintaining its rule files (`.roo/rules-util-mode-maintainer/`) or knowledge base articles (`.ruru/modes/util-mode-maintainer/kb/`).

**Guidelines:**

1.  **Rules Define Procedure:** Rule files **SHOULD** primarily focus on defining the sequence of steps, logic, conditions, and workflow procedures. They describe *how* a task or process should be executed.

2.  **Content Resides Externally:** Specific, detailed content such as lengthy prompts, lists of options, complex data mappings (e.g., state transitions), detailed command examples, or extensive tool usage descriptions **SHOULD** reside in separate, dedicated files. These external files can be:
    *   Knowledge Base (KB) articles (`.ruru/modes/util-mode-maintainer/kb/...`).
    *   Templates (`.ruru/templates/toml-md/...`).
    *   Dedicated prompt files (`.ruru/modes/util-mode-maintainer/kb/prompts/...` or `.ruru/docs/prompts/...`).

3.  **Rules Reference Content:** Rule files **SHOULD** reference these external content files by their relative path rather than embedding the full content directly within the rule's Markdown body.

**Rationale:**

*   **Maintainability:** Updating specific prompts, examples, or data becomes much easier as changes are localized to the external file, without needing to modify multiple rules that might reference it.
*   **Clarity:** Rules become cleaner and easier to understand, focusing on the core logic rather than being cluttered with large blocks of text or data.
*   **Reusability:** Prompts, templates, or data snippets stored externally can be referenced and reused by multiple rules or modes.
*   **Reduced Redundancy:** Avoids duplicating the same content across different rule files.

**Example:**

*   **Less Ideal (Embedding):** A rule file directly includes a 50-line prompt template within its Markdown body.
    ```markdown
    # Rule: Generate Feature Description
    ...
    3. Use the `generate_text` tool with the following prompt:
       """
       **Feature Request:** {{feature_name}}
       **User Story:** As a {{user_type}}, I want to {{action}} so that {{benefit}}.
       **Acceptance Criteria:**
       - Criteria 1...
       - Criteria 2...
       ... (many more lines) ...
       Generate a detailed feature description document based on the above.
       """
    ...
    ```

*   **Preferred (Referencing):** The rule references an external prompt file.
    ```markdown
    # Rule: Generate Feature Description
    ...
    3. Load the prompt template from `.ruru/modes/util-mode-maintainer/kb/prompts/mode_update_template.md`.
    4. Populate the template with context variables.
    5. Use the `generate_text` tool with the populated prompt.
    ...
    ```

By adhering to this abstraction principle, we create a more organized, maintainable, and understandable system of rules and knowledge.