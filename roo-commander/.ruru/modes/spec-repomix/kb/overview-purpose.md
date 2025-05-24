+++
# --- Basic Metadata ---
id = "KB-REPOMIX-OVERVIEW-V2" # New ID
title = "Repomix Specialist: Overview and Purpose" # New title
context_type = "knowledge_base"
scope = "High-level overview of the repomix tool and the specialist mode's function" # New scope
target_audience = ["spec-repomix", "all"] # Broaden audience
status = "active"
last_updated = "2025-05-05" # Use current date
tags = ["repomix", "kb", "overview", "purpose", "mcp", "context-generation", "llm"] # New tags
related_context = [
    ".roo/rules-spec-repomix/01-repomix-workflow.md",
    ".ruru/modes/spec-repomix/kb/01-decision-tree.md"
    ]
template_schema_doc = ".ruru/templates/toml-md/14_kb_article.README.md"
relevance = "High: Explains the fundamental goal of the mode."
+++

# Overview and Purpose

The `spec-repomix` mode utilizes the **Repomix service** (accessed via MCP tools like `pack_codebase` and `pack_remote_repository`) to package the contents of a code repository (local directory or remote GitHub repo) into a single, consolidated file.

The primary purpose is to create context files optimized for Large Language Models (LLMs), addressing the need to provide comprehensive codebase information to AI models in a condensed and structured format. This mode abstracts the underlying details of invoking Repomix, focusing on using the MCP interface.