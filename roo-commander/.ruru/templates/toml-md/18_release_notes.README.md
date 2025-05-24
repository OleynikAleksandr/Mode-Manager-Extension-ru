# Schema Documentation: Auto-Generated Release Notes (`18_release_notes.md`)

This document outlines the TOML schema used for **auto-generated** release notes files, typically created by a workflow (e.g., `WF-RELEASE-NOTES-HYBRID-V3`) that analyzes Conventional Commits between Git tags.

## Purpose

To provide a structured template for workflows that automatically generate release notes or changelogs based on commit history. The placeholders (`{{...}}`) are intended to be filled by the generating workflow.

## TOML Schema (Workflow Output)

The generating workflow is expected to populate the following fields within the `+++` TOML block:

*   **`id`** (String, Required)
    *   Unique identifier for the generated release notes document.
    *   Example: `"RELEASE-NOTES-v1.2.0"` (Generated based on `version`).

*   **`title`** (String, Required)
    *   Title of the release notes document.
    *   Example: `"Release Notes - v1.2.0"` (Generated based on `version`).

*   **`version`** (String, Required)
    *   The target version tag for which the notes are generated.
    *   Provided as input to the workflow.

*   **`release_date`** (String, Required)
    *   The date the workflow was executed or the intended release date.
    *   Format: `YYYY-MM-DD`.

*   **`status`** (String, Required)
    *   The status of the generated notes.
    *   Typically set to `"draft"` by the workflow, potentially updated later.

*   **`tags`** (Array of Strings, Required)
    *   Keywords including `"release-notes"`, `"changelog"`, and the `version`.

*   **`related_tags`** (Array of Strings, Required)
    *   The Git tags (`[previous_tag, target_tag]`) used by the workflow to determine the commit range for generation.
    *   Provided as input to the workflow.

*   **`summary`** (String, Optional)
    *   A brief overall summary. May be auto-generated or left blank for manual addition.

*   **`related_context`** (Array of Strings, Optional)
    *   Links to relevant planning documents or other context.

## Markdown Body Structure

The Markdown body contains placeholders to be filled by the generating workflow:

*   `# Release Notes - {{version}}`: Populated with the `version`.
*   `**Release Date:** {{release_date}}`: Populated with the `release_date`.
*   `**Generated from:** \`{{previous_tag}}\`...\`{{target_tag}}\``: Populated with `related_tags`.
*   Sections for different commit types (`## ✨ New Features`, `## 🐛 Bug Fixes`, etc.): The workflow parses Conventional Commits between the `related_tags` and populates these sections with formatted commit details (scope, subject, hash, linked task IDs).
*   Breaking changes (`BREAKING CHANGE:` footer) should also be parsed and added to a dedicated section if found.

## Related Context

*   `WF-RELEASE-NOTES-HYBRID-V3`: Example workflow that might use this template.
*   Conventional Commits specification: Defines the commit message format used for parsing.