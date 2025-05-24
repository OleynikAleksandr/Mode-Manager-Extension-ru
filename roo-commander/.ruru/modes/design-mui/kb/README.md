+++
id = "KB-LOOKUP-RULE-DESIGN-MUI-V3" # Updated ID based on template version
title = "Standard: design-mui KB Lookup & Index" # Updated title
context_type = "rules"
scope = "Mode-specific knowledge base access"
target_audience = ["design-mui"]
granularity = "rule"
status = "active"
last_updated = "2025-05-04" # Use current date
# version = "3.0" # Optional: Indicate version change
# related_context = []
tags = ["kb-lookup", "knowledge-base", "rule", "template", "conditional", "research", "mcp", "design-mui"] # Added mode tag
# relevance = ""
kb_directory = ".ruru/modes/design-mui/kb/"
+++

# Knowledge Base (KB) Lookup Rule (Conditional + Info Gathering)

**Applies To:** `design-mui` mode

**Rule:**

Before attempting a task, assess its complexity and novelty.

1.  **Task Assessment:**
    *   Briefly evaluate the task: Is it simple, routine, and low-risk (e.g., standard command, minor text edit)? Or is it complex, novel, high-risk, or ambiguous?
    *   Consider your confidence level in executing the task without specific guidance.

2.  **Conditional KB Consultation:**
    *   **IF** the task is assessed as **complex, novel, high-risk, or uncertain**:
        *   **MUST** consult the dedicated Knowledge Base (KB) directory for this mode located at: `.ruru/modes/design-mui/kb/`
        *   Follow the KB Scan Procedure below. If the KB is insufficient, proceed to Step 4 (Information Gathering).
    *   **ELSE IF** the task is assessed as **simple, routine, and low-risk**:
        *   KB consultation is **OPTIONAL**. Proceed directly to Step 3 (Apply Knowledge / Execute).
        *   *(Optional but Recommended):* Briefly note in logs/reasoning that KB was skipped due to task simplicity.
    *   **ELSE IF** assessment is **unclear**:
        *   Ask the coordinator/user for guidance on whether KB consultation is needed before proceeding. If directed to consult and KB is insufficient, proceed to Step 4.

**KB Scan Procedure (If Triggered by Step 2):**

1.  **Identify Keywords:** Determine the key concepts, tools, or procedures relevant to the current task.
2.  **Scan KB:**
    *   a. **Read `README.md`:** Always start by reading the `.ruru/modes/design-mui/kb/README.md` for an overview and structure guidance.
    *   b. **List Contents:** Identify relevant files and subdirectories within `.ruru/modes/design-mui/kb/`.
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

*This section provides an overview and index of the knowledge base documents available for the `design-mui` mode. Use this index to quickly locate relevant information for the task at hand.*

- **`01-core-workflow.md`** (Lines: 131): Introduces MUI Core (v5+), covering installation, basic usage, key features, operational principles, and a detailed workflow for implementing UI tasks. It also summarizes key concepts like the different MUI ecosystems, styling methods, theming, and Next.js integration.
- **`02-setup-theming.md`** (Lines: 235): Explains how to customize MUI Core and Joy UI using theming, covering `createTheme`/`ThemeProvider` for Core and `extendTheme`/`CssVarsProvider` for Joy UI. Details the structure of theme objects (palette, typography, components) and how to apply them globally.
- **`03-styling-sx-styled.md`** (Lines: 169): Covers applying custom styles using the `sx` prop for one-off adjustments and the `styled()` API for creating reusable styled components, comparing their use cases and syntax with examples.
- **`04-core-layout.md`** (Lines: 158): Details MUI's layout components (`Box`, `Container`, `Grid`, `Stack`), explaining their purpose and usage with examples for structuring page content and achieving responsive designs.
- **`05-core-inputs.md`** (Lines: 200): Describes common MUI Core input components like Buttons, TextFields, Selection Controls (Checkbox, Radio, Switch), Select dropdowns, Sliders, and Autocomplete, showing basic usage and key props.
- **`06-core-navigation.md`** (Lines: 229): Details MUI Core components for navigation patterns like AppBars, Drawers, Menus, Tabs, and Breadcrumbs, showing basic implementation and state management concepts.
- **`07-core-data-display.md`** (Lines: 151): Covers MUI Core components for displaying data, including Typography, Lists, Tables, Cards, Avatars, Badges, Chips, and Tooltips, with usage examples.
- **`08-core-feedback.md`** (Lines: 183): Describes MUI Core components for user feedback, such as Alert, Dialog, Snackbar, Progress indicators, and Skeleton placeholders, with examples.
- **`09-joy-ui-intro.md`** (Lines: 202): Introduces Joy UI as an alternative design system within MUI, covering its setup (`CssVarsProvider`), key differences from MUI Core (CSS variables, different aesthetic), and examples of common Joy UI components like Button, Input, Card, and Typography.
- **`10-base-ui-intro.md`** (Lines: 180): Introduces MUI Base, which provides unstyled ("headless") components and hooks for building custom design systems, focusing on accessibility and functionality without imposing specific styles. It covers installation, usage of unstyled components with custom styling, and leveraging functionality hooks like `useSwitch`.
- **`11-accessibility.md`** (Lines: 46): Outlines key accessibility principles (semantic HTML, keyboard navigation, focus management, labels, contrast, ARIA) for MUI components and provides specific considerations for common components like Buttons, TextFields, Modals, and Tables, emphasizing the importance of testing.
- **`12-react-nextjs-integration.md`** (Lines: 307): Explains common React patterns (controlled components, state management for open/close) for integrating MUI components and details the setup required for using MUI with Next.js (both App Router and Pages Router) to ensure SSR compatibility.

*(Maintainers: Keep this index up-to-date as KB files are added, removed, or reorganized. Provide a concise, informative summary for each entry to aid AI navigation.)*


**Rationale:** This rule balances efficiency for simple tasks with robust handling of complex/uncertain tasks. It mandates KB consultation when needed and provides a structured way to seek further information (internally or externally via MCP/user) when the KB is insufficient, reducing errors and improving task success rates.