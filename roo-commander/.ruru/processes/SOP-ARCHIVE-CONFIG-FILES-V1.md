+++
# --- Basic Metadata ---
id = "SOP-ARCHIVE-CONFIG-FILES-V1"
title = "SOP: Archive Configuration Files"
status = "draft"
created_date = "2025-05-02" # Today's date
updated_date = "2025-05-02" # Today's date
version = "1.0"
tags = ["sop", "archive", "configuration", "rules", "kb", "cleanup"]
template_schema_doc = ".ruru/templates/toml-md/15_sop.README.md" # Link to schema documentation

# --- Ownership & Context ---
# author = "" # Optional: Can be added later if needed
owner = "Roo Commander" # Default owner
related_context = [".ruru/archive/", ".roo/rules/", ".ruru/modes/"]
# related_tasks = [] # Optional: Can be added later if needed

# --- SOP Specific Fields ---
objective = "Define a clear process for moving configuration files to a designated archive location instead of deleting them, ensuring they are removed from active use but preserved for history."
scope = "Standard procedure for archiving unused or outdated configuration files (rules, KBs, mode files, etc.)"
roles = ["prime-coordinator", "prime-txt", "prime-dev", "roo-commander", "dev-git"] # Roles involved in the process

# --- AI Interaction Hints (Optional) ---
context_type = "process_definition"
target_audience = ["prime-coordinator", "prime-txt", "prime-dev", "roo-commander"] # As specified
granularity = "detailed"
+++

# SOP: Archive Configuration Files

## 1. Objective 🎯

*   Define a clear process for moving configuration files (rules, KBs, mode definitions, etc.) to a designated archive location instead of deleting them.
*   Ensure archived files are removed from active use by build processes or runtime lookups but are preserved for historical reference and potential future restoration.

## 2. Scope Boundaries ↔️

*   **In Scope:** Archiving text-based configuration files managed within the `.roo/` and `.ruru/` directories (e.g., `.md`, `.toml`, `.json`).
*   **Out of Scope:** Deleting files permanently, archiving binary files, archiving files outside the specified configuration directories, managing Git history itself (beyond committing the archive action).

## 3. Roles & Responsibilities 👤

*   **`roo-commander` / `prime-coordinator`:**
    *   Identifies configuration file(s) needing archival.
    *   Initiates the archiving process.
    *   Determines the correct archive sub-directory.
    *   Delegates file moving and reference updating tasks.
    *   Verifies the overall process completion.
*   **`prime-txt` / `prime-dev`:**
    *   Executes file system commands (`mkdir`, `mv`) to move files to the archive location, as instructed.
    *   Updates index files, build scripts, or other configurations to remove references to the archived files, as instructed.
*   **`dev-git`:**
    *   Commits the file move and any reference updates to the repository with a standardized commit message.

## 4. Reference Documents 📚

*   Archive Location: `.ruru/archive/` (with subdirectories like `rules/`, `kb/`, `modes/`)
*   Configuration Source Locations: `.roo/rules/`, `.ruru/modes/`, `.ruru/kb/`, etc.
*   Build Scripts (Potential References): `scripts/build_roomodes.js` (Example - specific scripts may vary)
*   Index Files (Potential References): Various `README.md` or index files within `.roo/` or `.ruru/`.

## 5. Procedure Steps 🪜

**Step 1: Identify File(s) for Archival (Responsible: `roo-commander` / `prime-coordinator`)**
1.  **Action:** Determine which configuration file(s) are outdated, unused, or superseded and should be archived.
2.  **Inputs:** Knowledge of project structure, file purpose, recent changes.
3.  **Tools:** File system browsing, `list_files`, `search_files`.
4.  **Context:** Understanding of which files are actively used vs. deprecated.
5.  **Outputs:** A list of file paths to be archived.
6.  **Decision:** Proceed to Step 2.

**Step 2: Determine Archive Location (Responsible: `roo-commander` / `prime-coordinator`)**
1.  **Action:** Based on the original location/type of the file(s), determine the appropriate sub-directory within `.ruru/archive/` (e.g., `.ruru/archive/rules/` for a rule file).
2.  **Inputs:** List of files to archive, knowledge of archive structure.
3.  **Tools:** N/A.
4.  **Context:** Standard archive structure.
5.  **Outputs:** Target archive directory path(s).
6.  **Decision:** Proceed to Step 3.

**Step 3: Create Archive Sub-directory (If Needed) (Responsible: `prime-txt` / `prime-dev`)**
1.  **Action:** Check if the target archive sub-directory exists. If not, create it.
2.  **Inputs:** Target archive directory path.
3.  **Tools:** `execute_command` (using `mkdir -p [path]`).
4.  **Context:** Target path provided by coordinator.
5.  **Outputs:** Target archive directory exists.
6.  **Decision:** Proceed to Step 4.

**Step 4: Move File(s) to Archive (Responsible: `prime-txt` / `prime-dev`)**
1.  **Action:** Move the identified file(s) from their original location to the target archive directory.
2.  **Inputs:** List of source file paths, target archive directory path.
3.  **Tools:** `execute_command` (using `mv [source_path] [target_path]`).
4.  **Context:** Source and target paths provided by coordinator.
5.  **Outputs:** File(s) moved from original location to archive.
6.  **Decision:** Proceed to Step 5.

**Step 5: Verify File Move (Responsible: `prime-txt` / `prime-dev` / `prime-coordinator`)**
1.  **Action:** Confirm that the file(s) no longer exist in the original location and are present in the target archive directory.
2.  **Inputs:** Original paths, target archive path.
3.  **Tools:** `list_files`.
4.  **Context:** N/A.
5.  **Outputs:** Confirmation of successful move.
6.  **Decision:** If successful, proceed to Step 6. If failed, investigate and retry Step 4 or escalate.

**Step 6: Update References (Crucial) (Responsible: `prime-dev` / `prime-txt` / `prime-coordinator`)**
1.  **Action:** Identify and update any files (build scripts, index files, other configurations) that explicitly reference the *original path* of the archived file(s). Remove or comment out these references. **This is critical to prevent errors.**
2.  **Inputs:** Original path(s) of archived file(s), knowledge of potential referencing files (e.g., build scripts, index READMEs).
3.  **Tools:** `search_files`, `read_file`, `apply_diff` / `write_to_file`.
4.  **Context:** Understanding of how configuration files are loaded or indexed. May require specific knowledge of build processes.
5.  **Outputs:** Updated reference files with archived file references removed.
6.  **Decision:** This step might be complex and require careful checking or delegation to a mode with specific knowledge (`prime-dev`). Once complete, proceed to Step 7.

**Step 7: Commit Changes (Responsible: `dev-git`)**
1.  **Action:** Stage the changes (file moves and reference updates) and commit them using a standardized message.
2.  **Inputs:** List of modified/moved files.
3.  **Tools:** `dev-git` mode (using its commit capabilities).
4.  **Context:** Standard commit message format (e.g., "chore: archive [file/rule name(s)]").
5.  **Outputs:** Changes committed to the repository.
6.  **Decision:** Archiving process complete. Report back to initiator.

## 6. Error Handling & Escalation ⚠️

*   **File Not Found:** If a file identified for archival cannot be found at the source path, verify the path and filename. Escalate to the initiator (`roo-commander` / `prime-coordinator`) if the file is missing unexpectedly.
*   **Permission Errors:** If `mv` or `mkdir` commands fail due to permissions, report the error. This may require manual intervention.
*   **Reference Update Issues:** If updating references is complex or causes errors, pause the process and escalate to `prime-coordinator` or `roo-commander` for guidance or manual review. Do not commit potentially broken reference updates.

## 7. Validation (PAL) ✅

*   **Verification:** Step 5 explicitly covers verifying the file move.
*   **Reference Check:** Step 6 involves checking and updating references. A subsequent build or test run (if applicable) can serve as further validation that archived files are no longer causing issues.
*   **Commit:** Step 7 ensures the changes are tracked.

## 8. Revision History Memento 📜

*   **v1.0 (2025-05-02):** Initial draft.