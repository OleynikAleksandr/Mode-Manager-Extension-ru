+++
id = "ROO-CMD-KB-INIT-ACTION-MAP-V1"
title = "Roo Commander: KB - Initial Action Mapping"
context_type = "knowledge-base"
scope = "Mapping user selections from initial-options-prompt.md to specific KB procedures or actions"
target_audience = ["roo-commander"]
granularity = "reference"
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["kb", "mapping", "initialization", "workflow", "routing", "roo-commander"]
related_context = [
    ".ruru/modes/roo-commander/kb/prompts/initial-options-prompt.md",
    ".roo/rules-roo-commander/02-initialization-workflow-rule.md"
    ]
template_schema_doc = ".ruru/templates/toml-md/18_kb_article.README.md"
relevance = "Critical: Links user intent from initial prompt to specific procedures"
+++

# Initial Action Mapping

This document maps the final option numbers selected by the user (based on `.ruru/modes/roo-commander/kb/prompts/initial-options-prompt.md`) to the corresponding Knowledge Base (KB) procedure file or direct action (like `switch_mode`).

**Mapping:**

*   **1.1:** `.ruru/modes/roo-commander/kb/initial-actions/01-start-new-project.md`
*   **1.2:** `.ruru/modes/roo-commander/kb/initial-actions/02-onboard-existing-project.md`
*   **1.3:** `.ruru/modes/roo-commander/kb/initial-actions/03-clone-onboard.md`
*   **1.4:** `.ruru/modes/roo-commander/kb/initial-actions/04-use-existing-files.md`
*   **2.1:** `.ruru/modes/roo-commander/kb/initial-actions/05-plan-design.md`
*   **2.2:** `.ruru/modes/roo-commander/kb/initial-actions/06-fix-bug.md`
*   **2.3:** `.ruru/modes/roo-commander/kb/initial-actions/07-refactor-code.md`
*   **2.4:** `.ruru/modes/roo-commander/kb/initial-actions/08-write-docs.md`
*   **3.1:** `.ruru/modes/roo-commander/kb/initial-actions/09-review-status.md`
*   **3.2:** `.ruru/modes/roo-commander/kb/initial-actions/11-execute-delegate.md`
*   **4.1:** `.ruru/modes/roo-commander/kb/initial-actions/00-install-mcp.md`
*   **4.2:** `switch_mode` to `agent-mode-manager` # Corrected slug
*   **4.3:** `switch_mode` to `util-workflow-manager`
*   **4.4:** `.ruru/modes/roo-commander/kb/initial-actions/12-manage-config.md`
*   **4.5:** `.ruru/modes/roo-commander/kb/initial-actions/13-update-preferences.md`
*   **4.6:** `.ruru/modes/roo-commander/kb/initial-actions/4.6-initiate-github-release-workflow.md`
*   **5.1:** `.ruru/modes/roo-commander/kb/initial-actions/10-research-topic.md`
*   **5.2:** `.ruru/modes/roo-commander/kb/initial-actions/14-learn-capabilities.md`
*   **5.3:** `.ruru/modes/roo-commander/kb/initial-actions/15-join-community.md`
*   **5.4:** `.ruru/modes/roo-commander/kb/initial-actions/16-something-else.md`

**Usage:**

The `roo-commander` mode consults this file in Step 4 of the initialization workflow (`.roo/rules-roo-commander/02-initialization-workflow-rule.md`) after obtaining the user's final selection. It parses this mapping to determine the correct KB procedure file to execute or the specific action to take.