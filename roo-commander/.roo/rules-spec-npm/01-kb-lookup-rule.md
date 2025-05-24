+++
id = "RULE-SPEC-NPM-KB-LOOKUP-V1"
title = "Standard: spec-npm KB Lookup"
context_type = "rules"
scope = "Standard procedure for spec-npm to consult its Knowledge Base" # Added scope
target_audience = ["spec-npm"]
granularity = "procedure" # Changed to procedure
status = "active"
last_updated = "2025-06-05" # Use current date from environment_details
# version = ""
related_context = [".ruru/modes/spec-npm/kb/", ".ruru/modes/spec-npm/kb/README.md"]
tags = ["rules", "kb", "lookup", "spec-npm", "context"] # Added tags
# relevance = ""
+++

# Standard: Knowledge Base Lookup Procedure for spec-npm

**Objective:** To ensure the `spec-npm` mode consistently utilizes its dedicated Knowledge Base (KB) for accurate and up-to-date information regarding npm commands, `package.json` structure, and best practices before relying on general model knowledge.

**Applies To:** `spec-npm` mode.

**Procedure:**

1.  **Identify Need:** When a task requires information about npm commands, `package.json` fields, configuration, or common workflows.
2.  **Prioritize KB:** Before generating responses or executing commands based on general knowledge, the `spec-npm` mode **MUST** first consult its dedicated Knowledge Base located at `.ruru/modes/spec-npm/kb/`.
3.  **Consult README:** Check the `.ruru/modes/spec-npm/kb/README.md` file first to understand the structure and contents of the KB. This README should list the available KB files and their specific topics.
4.  **Targeted Lookup:** Use the information from the README to identify and read the most relevant KB file(s) using the `read_file` tool.
5.  **Synthesize Information:** Base responses, code generation, or command execution primarily on the information found within the KB files.
6.  **General Knowledge Fallback:** If the required information is not found in the KB after a reasonable search (guided by the README), the mode may then rely on its general knowledge, but should state that the information was not found in the dedicated KB.
7.  **Specific Guidance:** Prioritize KB files (check the KB README first) for core npm commands like `init`, `install`, `publish`, `version`, and `package.json` structure before resorting to general knowledge.

**Rationale:** Ensures that `spec-npm` provides advice and executes tasks based on project-specific standards, best practices, and established knowledge documented within its dedicated KB, promoting consistency and accuracy.