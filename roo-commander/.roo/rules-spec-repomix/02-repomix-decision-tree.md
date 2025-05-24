+++
# --- Basic Metadata ---
id = "RULE-REPOMIX-DECISION-TREE-V4" # Updated ID for version change
title = "Rule: Repomix Source Identification & SOP Delegation" # Updated title
context_type = "rules"
scope = "Mandatory workflow for identifying sources and delegating to the appropriate SOP for execution via configuration file within spec-repomix mode" # Updated scope
target_audience = ["spec-repomix"]
granularity = "procedure"
status = "active"
last_updated = "2025-05-03" # Updated date
tags = ["rules", "repomix", "workflow", "config-file", "cli", "spec-repomix", "source-handling", "sop-delegation"] # Updated tags
related_context = [
    ".ruru/processes/SOP-REPOMIX-GITHUB-V1.md", # SOP for GitHub sources
    ".ruru/processes/SOP-REPOMIX-LOCAL-V1.md",  # SOP for Local sources
    ".ruru/modes/spec-repomix/kb/01-repomix-usage-corrections.md", # KB for general usage details
    ".roo/rules/05-os-aware-commands.md" # For command generation
    ]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Defines the mandatory repomix execution logic, routing to specific SOPs based on source type" # Updated relevance description
+++

# Rule: Repomix Source Identification & SOP Delegation

This rule outlines the standard procedure for the `spec-repomix` mode to process **all** requests involving the `repomix` tool.

**Objective:** To ensure all `repomix` executions use a configuration file (`repomix --config <path>`) for consistency and robustness. The mode must first identify the source type and then **delegate the entire process** (config generation, execution, cleanup) to the appropriate Standard Operating Procedure (SOP). Direct CLI argument usage for sources or complex parameters is **prohibited**.

**Workflow:**

1.  **Identify Source Type:**
    *   Analyze the input source string(s) provided in the request.
    *   If a source string starts with `https://github.com/`, identify it as a **GitHub URL**.
    *   If a source string appears to be a local filesystem path (e.g., starts with `./`, `/`, `../`, contains OS-specific separators, or is explicitly described as local), identify it as a **Local Path**.
    *   If the source type is unclear or ambiguous (e.g., just `owner/repo`, a generic name), identify it as **Ambiguous**.

2.  **Delegate to SOP:**
    *   Based on the source type identified in Step 1:
        *   **GitHub URL:** **MUST** follow the procedure defined in **`.ruru/processes/SOP-REPOMIX-GITHUB-V1.md`**. This SOP covers URL parsing, cloning, conditional config generation (repo vs. subfolder), execution, and cleanup.
        *   **Local Path:** **MUST** follow the procedure defined in **`.ruru/processes/SOP-REPOMIX-LOCAL-V1.md`**. This SOP covers path validation, config generation, execution, and cleanup.
        *   **Ambiguous:** **MUST** use the `ask_followup_question` tool to clarify with the user whether the source is a GitHub reference or a local path. **DO NOT** default to assuming it's in the workspace or any other location. Once the user clarifies, proceed by following the appropriate SOP (GitHub or Local) as described above.
    *   The referenced SOP contains all necessary steps, including how to gather parameters, generate the configuration JSON, write the temporary file, execute `repomix --config`, handle errors, and perform cleanup.

3.  **Create Configuration File:**
    *   *(This step is now handled within the delegated SOP)*.
    *   Use the `write_to_file` tool to save the generated JSON configuration object (obtained by following the KB procedure in Step 2) to the temporary file path. Ensure the directory `.ruru/temp/` exists.

4.  **Construct CLI Command:**
    *   *(This step is now handled within the delegated SOP)*.

5.  **Execute Command:**
    *   *(This step is now handled within the delegated SOP)*.

6.  **Result Handling:**
    *   *(This step is now handled within the delegated SOP)*. The SOP defines how to handle success/failure and report back.

7.  **Cleanup Step (Recommended):**
    *   *(This step is now handled within the delegated SOP)*.