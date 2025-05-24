# Session Artifacts: [This Subdirectory Type]

## Purpose

This directory stores a specific type of artifact related to the parent session. Refer to the directory name (e.g., `notes`, `learnings`, `code`) to understand the intended content type.

These artifacts capture key information like decisions, learnings, environment details, research findings, code snippets, errors, etc., providing richer context beyond the main session log.

See the main guidelines document for details on standard artifact types and their purpose:
[.ruru/docs/standards/session_artifact_guidelines_v1.md](/.ruru/docs/standards/session_artifact_guidelines_v1.md)

## File Naming Convention

Files should generally follow the convention: `[TYPE_PREFIX]-[Topic]-[YYMMDDHHMM].[ext]`

*   `[TYPE_PREFIX]`: Corresponds to the artifact type (e.g., `NOTE`, `LEARNING`, `CODE`).
*   `[Topic]`: A short, descriptive, filesystem-safe topic.
*   `[YYMMDDHHMM]`: Timestamp of creation.
*   `[ext]`: Appropriate file extension (e.g., `.md`, `.py`, `.json`).

**Consult the main guidelines document linked above for the specific prefix and conventions recommended for this directory.**

## Recommended Templates

If applicable, use the relevant TOML+MD template from `/.ruru/templates/toml-md/` (e.g., `31_session_note.md`, `32_session_learning.md`).

## Usage

*   Create artifacts here as needed during the session.
*   Ensure the artifact file path (relative to the session directory, e.g., `artifacts/[subdir_name]/[filename]`) is added to the `related_artifacts` array in the main `session_log.md`.

## User Contribution

Users can manually add relevant files to this directory, following the naming conventions specified in the main guidelines document.