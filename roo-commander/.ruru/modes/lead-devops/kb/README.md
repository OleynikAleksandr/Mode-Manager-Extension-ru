+++
    id = "KB-LOOKUP-RULE-LEAD-DEVOPS"
    title = "Standard: lead-devops KB Lookup & Index"
    context_type = "rules"
    scope = "Mode-specific knowledge base access"
    target_audience = ["lead-devops"]
    granularity = "rule"
    status = "active"
    last_updated = "2025-05-04" # Updated date
    # version = "3.0" # Optional: Indicate version change
    # related_context = []
    tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "lead-devops"] # Added mode tag
    # relevance = ""
    kb_directory = ".ruru/modes/lead-devops/kb/" # Updated kb_directory
    +++
    
    # Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)
    
    **Applies To:** `lead-devops` mode # Updated mode_slug
    
    **Rule:**
    
    Before attempting a task, assess its complexity and novelty.
    
    1.  **Task Assessment:**
        *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
        *   Consider your confidence level in executing the task without specific guidance.
    
    2.  **Conditional KB Consultation:**
        *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
            *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/lead-devops/kb/` # Updated kb_directory
            *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
        *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
            *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
            *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
        *   **ELSE IF** assessment is **unclear**:
            *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.
    
    **KB Scan Procedure (If Triggered by Step 2):**
    
    1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
    2.  **Scan KB:**
        *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/lead-devops/kb/README.md` for an overview and structure guidance. # Updated kb_directory
        *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/lead-devops/kb/`. # Updated kb_directory
        *   c. **Prioritize Top-Level:** Review relevant top-level `.md` files first.
        *   d. **Explore Subdirectories:** If keywords, task context, or the `README.md` suggest relevance, explore pertinent subdirectories. Look for `README.md` or index files within them.
        *   e. **Review Content:** Read the content of potentially relevant files identified.
    3.  **Apply Knowledge / Execute:**
        *   **IF** sufficient information was found in the KB: Integrate it into your task execution plan and response. Proceed with execution.
        *   **ELSE IF** KB was consulted but insufficient (and task was complex/uncertain): Proceed to Step 4.
        *   **ELSE (KB was skipped for simple task):** Proceed with execution using core capabilities and general knowledge.
    
    **4. Information Gathering (If KB Insufficient for Complex/Uncertain Task):**
        *   **Identify Information Need:** Clearly state what specific information or clarification is missing to proceed reliably.
        *   **Propose Next Steps:** Use the ask_followup_question tool to propose information-gathering actions to the coordinator/user. Suggestions **MUST** include context-appropriate options like:
            *   "Search external documentation/web using [Specific MCP Tool, e.g., `vertex-ai-mcp-server/answer_query_websearch`] for [topic/error]." (Mention specific tool and query).
            *   "Read a specific file if you can provide the path."
            *   "Ask for clarification on [specific aspect of the task]."
            *   "Attempt the task using general knowledge (state potential risks/uncertainties)."
        *   **Await Guidance:** Do not proceed with the original task until guidance is received on how to gather the missing information.
    
    ## Knowledge Base Index
    
    *This section provides an overview and index of the knowledge base documents available for the `lead-devops` mode. Use this index to quickly locate relevant information for the task at hand.* # Updated mode_slug
    
    ## Knowledge Base Files
    
    Below is a list of the available knowledge base documents:
    
    *   **`01-core-principles-workflow.md`** (44 lines)
        *   Outlines the core operational principles, standard workflow steps, and foundational knowledge required for the DevOps Lead role.
    *   **`02-infrastructure-iac.md`** (25 lines)
        *   Details the responsibilities for managing infrastructure using Infrastructure as Code (IaC) principles, including key activities, IaC tenets, and relevant technologies.
    *   **`03-cicd-deployment.md`** (28 lines)
        *   Covers the responsibilities for managing CI/CD pipelines, including design, delegation, deployment strategies, verification, optimization, and security considerations.
    *   **`04-containerization.md`** (25 lines)
        *   Outlines the responsibilities for overseeing application containerization strategy and implementation, covering configuration reviews, design, delegation, image management, and verification.
    *   **`05-monitoring-logging.md`** (27 lines)
        *   Describes the responsibilities for overseeing monitoring, logging, and alerting systems, covering strategy, configuration review, delegation, alert management, analysis, and verification.
    *   **`06-security-compliance.md`** (28 lines)
        *   Focuses on integrating security (DevSecOps) and ensuring compliance throughout the DevOps lifecycle, emphasizing collaboration with the security lead and covering infrastructure, pipeline, and container security.
    *   **`07-collaboration-delegation.md`** (50 lines)
        *   Outlines how the DevOps Lead collaborates with other roles, delegates tasks to specialist workers, monitors progress, reviews work, and handles escalations.
    *   **`08-cloud-platforms.md`** (23 lines)
        *   Covers the oversight of cloud platform usage (AWS, Azure, GCP), emphasizing collaboration with Cloud Architects, platform awareness, service selection guidance, and verification.
    *   **`09-error-handling-recovery.md`** (24 lines)
        *   Details the coordination of responses to operational issues, incident triage, handling deployment failures and outages, supporting security incidents, and overseeing backup and recovery strategies.
    *   **`10-cost-optimization.md`** (30 lines)
        *   Outlines the responsibilities for promoting and overseeing cost optimization strategies for cloud resources and DevOps tooling.
    
    *(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*
    
    
    **Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.