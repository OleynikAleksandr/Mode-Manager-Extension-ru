+++
# --- Step Metadata ---
step_id = "WF-STANDARDIZE-KB-READMES-V1-01-PROCESS" # (String, Required) Unique ID for this step.
title = "Step 01: Process Single Mode KB README" # (String, Required) Title of this specific step.
description = """
(String, Required) Processes a single mode's `kb/README.md` file.
Reads the existing file, extracts the KB file index, reads the standard
template (`27_kb_lookup_rule.md`), merges the index into the template,
updates TOML metadata, and overwrites the original file.
This step is intended to be run iteratively for each path found in Step 00.
"""

# --- Flow Control ---
depends_on = ["WF-STANDARDIZE-KB-READMES-V1-00-START"] # (Array of Strings, Required) Needs the list of paths.
# next_step = "01_process_mode_readme.md" # (String, Optional) Points back to self for iteration (handled by orchestrator).
next_step = "99_finish.md" # (String, Optional) Points to finish after loop (orchestrator decides when loop ends).
error_step = "EE_handle_error.md" # (String, Optional) Filename to jump to if this step fails for a specific file.

# --- Execution ---
delegate_to = "util-mode-maintainer" # (String, Optional) Suitable for file reading, parsing, merging, and writing based on templates.

# --- Interface ---
inputs = [ # (Array of Strings, Optional) Data/artifacts needed.
    "current_readme_path: The relative path to the specific mode KB README file being processed in this iteration (from `mode_readme_paths` output of Step 00).",
    "standard_template_path: '.ruru/templates/toml-md/27_kb_lookup_rule.md'", # Explicitly state the template path
]
outputs = [ # (Array of Strings, Optional) Data/artifacts produced by this step.
    "processed_readme_path: The path of the README file that was updated.",
    "status_message: Confirmation message for the processed file (e.g., 'Updated [path]' or 'Error processing [path]').",
]

# --- Housekeeping ---
last_updated = "[DATE]" # (String, Required) Date of last modification. Use placeholder.
template_schema_doc = ".ruru/templates/toml-md/25_workflow_step_standard.md" # (String, Required) Link to this template definition.
+++

# Step 01: Process Single Mode KB README

## Actions

(Input: `current_readme_path`)

1.  **Extract Mode Info:**
    *   `- [ ]` Parse `current_readme_path` to extract the `mode_slug` (e.g., from `.ruru/modes/[mode-slug]/kb/README.md`).
    *   `- [ ]` Determine the `kb_directory` path (e.g., `.ruru/modes/[mode-slug]/kb/`).
2.  **Read Existing File:**
    *   `- [ ]` Use `read_file` to get the content of `current_readme_path`. Store as `existing_content`. Handle potential file not found errors gracefully (log and skip).
3.  **Extract KB Index:**
    *   `- [ ]` Parse `existing_content` (Markdown part) to find the section listing KB files (look for headings like `## Knowledge Base Files`, `## File Index`, `## KB Files`, etc.).
    *   `- [ ]` Extract the Markdown list (including file names and summaries) under that heading. Store as `extracted_kb_index`. If not found, `extracted_kb_index` is empty or a placeholder message.
4.  **Read Standard Template:**
    *   `- [ ]` Use `read_file` to get the content of `.ruru/templates/toml-md/27_kb_lookup_rule.md`. Store as `template_content`. Handle potential errors.
5.  **Construct New Content:**
    *   `- [ ]` Parse `template_content` into `template_toml` and `template_markdown_body`.
    *   `- [ ]` **Update TOML:** Modify `template_toml` fields:
        *   `id`: Set to `KB-LOOKUP-RULE-[MODE_SLUG]` (using extracted `mode_slug`, ensure it's uppercase or consistently formatted).
        *   `title`: Set to `Standard: [Mode Slug] KB Lookup & Index`.
        *   `target_audience`: Set to `["[mode_slug]"]`.
        *   `last_updated`: Set to current date (`[DATE]`).
        *   `tags`: Add `[mode_slug]` to the existing tags array.
        *   `kb_directory`: Set to the determined `kb_directory` path.
    *   `- [ ]` **Merge Markdown:** Find the `## Knowledge Base Index` heading in `template_markdown_body`. Replace the placeholder text below it with the `extracted_kb_index`. Ensure the `**Rationale:**` section remains at the end. Store as `new_markdown_body`.
    *   `- [ ]` Combine the updated TOML (within `+++` delimiters) and `new_markdown_body` into `new_full_content`.
6.  **Write Update:**
    *   `- [ ]` Use `write_to_file` to overwrite `current_readme_path` with `new_full_content`. Handle potential errors.
7.  **Prepare Output:**
    *   `- [ ]` Set `processed_readme_path` to `current_readme_path`.
    *   `- [ ]` Set `status_message` (e.g., "Successfully updated [current_readme_path]" or "Error processing [current_readme_path]: [error details]").

## Acceptance Criteria

*   The file at `current_readme_path` exists and has been overwritten successfully.
*   The new content follows the structure of template `27_kb_lookup_rule.md`.
*   The TOML metadata (`id`, `title`, `target_audience`, `last_updated`, `tags`, `kb_directory`) is correctly updated for the specific mode.
*   The original KB file index (if found) is present under the `## Knowledge Base Index` heading in the new content.
*   A status message indicating success or failure for this specific file is generated.

## Error Handling

*   If `current_readme_path` cannot be read, log error, set appropriate `status_message`, and skip processing this path.
*   If the template file `.ruru/templates/toml-md/27_kb_lookup_rule.md` cannot be read, log a critical error and potentially halt the workflow or proceed to `error_step`.
*   If parsing fails (TOML or Markdown), log error, set appropriate `status_message`, and skip processing this path.
*   If writing the file fails, log error, set appropriate `status_message`, and potentially proceed to `error_step`.