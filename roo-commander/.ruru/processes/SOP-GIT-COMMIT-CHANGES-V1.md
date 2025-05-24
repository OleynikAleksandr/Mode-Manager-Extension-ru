+++
# --- Basic Metadata ---
id = "SOP-GIT-COMMIT-CHANGES-V1"
title = "SOP: Commit Specified File/Folder Changes"
status = "active"
created_date = "2025-05-02" # Assuming current date
updated_date = "2025-05-02" # Assuming current date
version = "1.0"
tags = ["sop", "git", "commit", "prime-coordinator", "dev-git"]
template_schema_doc = ".ruru/templates/toml-md/15_sop.README.md" # Link to schema documentation

# --- Ownership & Context ---
# author = "" # Optional: Can be added if specific author is known
owner = "Roo Commander"
related_context = [".roo/rules/04-mdtm-workflow-initiation.md", "dev-git"] # As specified
# related_tasks = [] # Optional: Link related MDTM tasks if any

# --- SOP Specific Fields ---
objective = "To define the standard procedure for committing specific file or folder changes to the Git repository using the dev-git mode."
scope = "Standard procedure for committing specific changes via Git Manager. This applies when prime-coordinator needs to ensure only specified files/folders are included in a commit."
roles = ["prime-coordinator", "dev-git"]

# --- AI Interaction Hints (Optional) ---
# context_type = "process_definition"
# target_audience = ["prime-coordinator", "dev-git"] # Already covered by roles
# granularity = "detailed"
+++

# SOP: Commit Specified File/Folder Changes

## 1. Objective 🎯

*   To define the standard procedure for committing specific file or folder changes to the Git repository using the `dev-git` mode, ensuring only intended changes are staged and committed.

## 2. Scope Boundaries ↔️

*   **In Scope:** Committing changes to specified files or folders within the current workspace repository via the `dev-git` mode, initiated by `prime-coordinator`. Includes staging only the specified paths and using a provided commit message.
*   **Out of Scope:** Branching, merging, pushing, pulling, resolving conflicts, stashing, or any other Git operations not explicitly mentioned. Committing *all* staged changes (use a different procedure).

## 3. Roles & Responsibilities 👤

*   **`prime-coordinator`:**
    *   Receives or determines the need to commit specific changes.
    *   Verifies the list of file/folder paths and the commit message.
    *   Initiates the task by delegating to `dev-git` via `new_task`.
    *   Receives confirmation or error reports from `dev-git`.
*   **`dev-git`:**
    *   Receives delegation from `prime-coordinator` with paths and commit message.
    *   **MUST** verify the status of specified paths using `git status --short [paths...]`.
    *   Stages *only* the specified paths if changes exist using `git add [paths...]`.
    *   Commits the staged changes using `git commit -m "[message]"`.
    *   Reports the outcome (success with hash, or no changes found) back to `prime-coordinator`.

## 4. Reference Documents 📚

*   `.ruru/modes/dev-git/` (General documentation for the Git Manager mode)
*   `.roo/rules/04-mdtm-workflow-initiation.md` (If delegation involves MDTM)
*   Git documentation (External)

## 5. Procedure Steps 🪜

**Trigger:** User (typically `prime-coordinator`) requests to commit specific files/folders with a provided commit message.

**Input:**
*   `file_paths`: A list of relative file or folder paths (e.g., `["src/component.js", "docs/guide.md"]`).
*   `commit_message`: A string containing the commit message.

**Steps:**

1.  **Verify Request (`prime-coordinator`)**
    *   **Action:** Ensure the list of `file_paths` and the `commit_message` are clear, complete, and appropriate.
    *   **Inputs:** User request details.
    *   **Outputs:** Verified `file_paths` and `commit_message`.

2.  **Delegate Task (`prime-coordinator`)**
    *   **Action:** Delegate the commit task to the `dev-git` mode.
    *   **Inputs:** Verified `file_paths`, `commit_message`.
    *   **Tools:** `new_task`
    *   **Context:** Provide the `file_paths` list and `commit_message` string clearly in the `<message>` payload for `new_task`.
    *   **Outputs:** Task delegated to `dev-git`.

3.  **Check Status (`dev-git`)**
    *   **Action:** **MUST** check if the specified files/folders have actual changes recognized by Git.
    *   **Inputs:** `file_paths` list from `prime-coordinator`.
    *   **Tools:** `execute_command`
    *   **Command:** `git status --short [path1] [path2] ...` (substitute `[pathN]` with actual paths from the list).
    *   **Context:** Requires access to the project's Git repository.
    *   **Outputs:** Git status output indicating changed/unchanged files within the specified paths.
    *   **Decision:** Proceed to Step 4 if status output shows changes in specified paths. Proceed to Step 5 if status output shows no relevant changes.

4.  **Stage & Commit Changes (`dev-git`)** (If Step 3 showed changes)
    *   **Action:** Stage *only* the specified files/folders, then commit them with the provided message.
    *   **Inputs:** `file_paths` list, `commit_message` string.
    *   **Tools:** `execute_command`
    *   **Commands:**
        1.  `git add [path1] [path2] ...` (substitute `[pathN]` with actual paths)
        2.  `git commit -m "[commit_message]"` (substitute `[commit_message]` with the actual message string, ensuring proper quoting if the message contains special characters). Use `&&` for conditional execution on Linux/macOS, or separate commands for Windows (see Rule `05-os-aware-commands.md`).
    *   **Context:** Requires successful completion of `git add`.
    *   **Outputs:** Successful commit operation, Git commit hash.
    *   **Decision:** Proceed to Step 6 (Report Success). Handle errors (e.g., commit failure) by proceeding to Step 7 (Report Failure).

5.  **Report No Changes (`dev-git`)** (If Step 3 showed no changes)
    *   **Action:** Inform `prime-coordinator` that no changes were detected in the specified paths.
    *   **Inputs:** Result from Step 3.
    *   **Tools:** `attempt_completion`
    *   **Outputs:** Message indicating "No changes detected in specified paths. No commit was made."

6.  **Report Success (`dev-git`)**
    *   **Action:** Report the successful commit and the resulting commit hash back to `prime-coordinator`.
    *   **Inputs:** Commit hash from Step 4.
    *   **Tools:** `attempt_completion`
    *   **Outputs:** Confirmation message including the commit hash.

7.  **Report Failure (`dev-git`)** (If `git add` or `git commit` fails in Step 4)
    *   **Action:** Report the failure encountered during staging or committing back to `prime-coordinator`.
    *   **Inputs:** Error message/details from the failed Git command.
    *   **Tools:** `attempt_completion`
    *   **Outputs:** Error message indicating the step that failed and any available details.

## 6. Error Handling & Escalation ⚠️

*   **`dev-git` Errors:**
    *   If `git status` fails (e.g., not a Git repository), `dev-git` reports the error to `prime-coordinator`.
    *   If `git add` fails (e.g., invalid path), `dev-git` reports the error to `prime-coordinator`.
    *   If `git commit` fails (e.g., empty commit, pre-commit hook failure), `dev-git` reports the error, including any output from Git, to `prime-coordinator`.
*   **Escalation:** All errors encountered by `dev-git` are reported back to `prime-coordinator` for assessment and potential re-instruction or alternative action.

## 7. Validation (PAL) ✅

*   This SOP should be validated by attempting to commit changes to a test file using the described procedure.
*   Verify that `dev-git` correctly checks status, stages only specified files, commits successfully, and reports the hash.
*   Verify that `dev-git` correctly reports when no changes are found.
*   Verify error handling for invalid paths or commit failures.

## 8. Revision History Memento 📜

*   **v1.0 (2025-05-02):** Initial draft.