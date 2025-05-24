+++
id = "framework-spring-kb-lookup-rule-v3" # Updated ID based on template version
title = "KB Lookup Rule for framework-spring (Conditional + Info Gathering)" # Updated title
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["framework-spring"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Set date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "framework-spring", "conditional", "research", "mcp"] # Merged tags
# relevance = ""
kb_directory = ".ruru/modes/framework-spring/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `framework-spring` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/framework-spring/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/framework-spring/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/framework-spring/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `framework-spring` mode. Use this index to quickly locate relevant information for the task at hand.*

*   **`framework-overview.md` (20 lines):** Provides a high-level overview of the Spring Framework's philosophy (IoC/DI, AOP), core concepts, modular architecture, primary use cases, and key benefits, including Spring Boot's role.
*   **`setup-installation-summary.md` (36 lines):** Covers Spring Boot project setup using Initializr, the `@SpringBootApplication` annotation, configuration via `application.properties`/`yml`, externalized configuration, profiles, and type-safe binding with `@ConfigurationProperties`. Includes a typical directory structure.
*   **`routing-summary.md` (23 lines):** Explains how Spring MVC (using `@RequestMapping` variants and `HandlerInterceptor`) and Spring WebFlux (using functional endpoints or annotations with `WebFilter`) handle HTTP request mapping to controller methods, including path variables and parameters.
*   **`request-handling-summary.md` (32 lines):** Details how Spring controllers handle requests, access data (using annotations like `@PathVariable`, `@RequestParam`, `@RequestBody`), generate responses (view resolution, `@ResponseBody`, `ResponseEntity` in MVC/WebFlux), and manage exceptions using `@ExceptionHandler` and `@ControllerAdvice`.
*   **`database-orm-summary.md` (28 lines):** Explains how Spring Data JPA simplifies database access using interface-based repositories, query derivation, `@Query`, custom implementations, projections, specifications, and Query by Example. Also covers auditing, pagination, transactions, and common performance pitfalls.
*   **`middleware-lifecycle-summary.md` (39 lines):** Differentiates between Spring AOP (general method interception for cross-cutting concerns), Spring MVC Interceptors (`HandlerInterceptor` for web requests before/after controller methods), and Spring WebFlux Filters (`WebFilter` for reactive web request interception). Explains their concepts, purpose, definition, registration, and execution flow.
*   **`authentication-authorization-summary.md` (35 lines):** Outlines Spring Security's core concepts, covering authentication mechanisms (Form, Basic, JWT, LDAP, SAML, OAuth2), core components (`AuthenticationManager`, `UserDetailsService`), and configuration via `HttpSecurity`. Also details authorization strategies (RBAC, Permissions, ACLs) and configuration methods (URL-based, Method Security with `@PreAuthorize`/`@PostAuthorize`).
*   **`templating-summary.md` (20 lines):** Describes Spring MVC's integration with server-side template engines (like Thymeleaf, FreeMarker) via `ViewResolver`, data passing using `Model`, and layout/fragment support. Mentions WebFlux support and the common API-focused approach using `@RestController`.
*   **`testing-summary.md` (37 lines):** Describes Spring Boot testing strategies including unit tests (JUnit, Mockito), slice tests (`@WebMvcTest`, `@DataJpaTest`, etc.), and full integration tests (`@SpringBootTest`). Covers key tools like `MockMvc`, `WebTestClient`, `@MockBean`, `TestEntityManager`, Testcontainers, and best practices.
*   **`dependency-injection-summary.md` (43 lines):** Explains the core concepts of Inversion of Control (IoC) and Dependency Injection (DI) in Spring using the `ApplicationContext`. Covers bean definition (`@Component`, `@Bean`), component scanning, injection types (constructor, setter, field - preferring constructor), and resolving ambiguity (`@Primary`, `@Qualifier`).

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.