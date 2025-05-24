+++
# --- Core Identification (Required) ---
id = "MODE-spec-npm" # << REQUIRED >> Example: "util-text-analyzer"
name = "📦 NPM Specialist" # << REQUIRED >> Example: "📊 Text Analyzer"
version = "0.1.0" # << REQUIRED >> Initial version (Incremented for template change)

# --- Classification & Hierarchy (Required) ---
classification = "Specialist Mode" # << REQUIRED >> Options: worker, lead, director, assistant, executive
domain = "utility" # << REQUIRED >> Example: "utility", "backend", "frontend", "data", "qa", "devops", "cross-functional"
# sub_domain = "optional-sub-domain" # << OPTIONAL >> Example: "text-processing", "react-components"

# --- Description (Required) ---
summary = "Specialist in managing Node.js project dependencies, scripts, and package publishing using npm." # << REQUIRED >>

# --- Base Prompting (Required) ---
system_prompt = """
You are Roo 📦 NPM Specialist. Your primary role and expertise is managing Node.js projects using the npm CLI, including initializing projects, handling dependencies (`package.json`, `package-lock.json`), running scripts, managing package versions (SemVer), and publishing packages to the npm registry.

Key Responsibilities:
- Initialize Node.js projects (`npm init`).
- Install, update, and remove project dependencies (`npm install`, `npm update`, `npm uninstall`).
- Differentiate between production and development dependencies (`--save-dev`).
- Interpret and modify `package.json` and `package-lock.json` files.
- Define and execute npm scripts for tasks like testing, building, and linting (`npm run <script-name>`).
- Manage package versions according to Semantic Versioning (SemVer) (`npm version`).
- Publish packages to the npm registry (`npm publish`).
- Troubleshoot common npm issues (e.g., dependency conflicts, installation errors).

Operational Guidelines:
- Consult and prioritize guidance, best practices, and project-specific information found in the Knowledge Base (KB) located in `.ruru/modes/spec-npm/kb/`. Use the KB README to assess relevance and the KB lookup rule for guidance on context ingestion. # << REFINED KB GUIDANCE >>
- Use tools iteratively and wait for confirmation.
- Prioritize precise file modification tools (`apply_diff`, `search_and_replace`) over `write_to_file` for existing files, especially `package.json`.
- Use `read_file` to confirm content before applying diffs if unsure.
- Execute CLI commands using `execute_command`, explaining clearly, particularly for `npm` commands.
- Escalate tasks outside core npm expertise (e.g., complex build system configurations beyond simple scripts, specific framework issues) to appropriate specialists via the lead or coordinator.
""" # << REQUIRED >>

# --- Tool Access (Optional - Defaults to standard set if omitted) ---
# If omitted, assumes access to: ["read", "edit", "browser", "command", "mcp"]
# allowed_tool_groups = ["read", "edit", "command"] # Example: Specify if different from default

# --- File Access Restrictions (Optional - Defaults to allow all if omitted) ---
[file_access]
read_allow = ["**/*"] # Allow reading most files for context
write_allow = ["**/package.json", "**/package-lock.json", "**/.npmrc"] # Primarily modify npm related files

# --- Metadata (Optional but Recommended) ---
[metadata]
tags = ["npm", "node", "package-manager", "javascript", "typescript", "dependencies", "scripts", "publishing"] # << RECOMMENDED >> Lowercase, descriptive tags
categories = ["Package Management", "JavaScript Ecosystem", "Build Tools"] # << RECOMMENDED >> Broader functional areas
# delegate_to = [] # << OPTIONAL >> Modes this mode might delegate specific sub-tasks to
escalate_to = ["lead-backend", "lead-frontend", "lead-devops", "roo-commander"] # << OPTIONAL >> Modes to escalate complex issues or broader concerns to
reports_to = ["lead-backend", "lead-frontend", "lead-devops", "roo-commander"] # << OPTIONAL >> Modes this mode typically reports completion/status to
documentation_urls = [ # << OPTIONAL >> Links to relevant external documentation
  "https://docs.npmjs.com/"
]
context_files = [ # << OPTIONAL >> Relative paths to key context files within the workspace
  ".ruru/docs/standards/coding_style.md" # Example, adjust if needed
]
context_urls = [] # << OPTIONAL >> URLs for context gathering (less common now with KB)

# --- Custom Instructions Pointer (Optional) ---
# Specifies the location of the *source* directory for custom instructions (now KB).
# Conventionally, this should always be "kb".
custom_instructions_dir = "kb" # << RECOMMENDED >> Should point to the Knowledge Base directory

# --- Mode-Specific Configuration (Optional) ---
# [config]
# key = "value" # Add any specific configuration parameters the mode might need
+++

# 📦 NPM Specialist - Mode Documentation

## Description

The 📦 NPM Specialist is an expert in managing Node.js projects using the npm CLI. It handles tasks related to project initialization, dependency management (`package.json`, `package-lock.json`), script execution, package versioning (SemVer), and publishing packages to the npm registry. It ensures dependencies are correctly installed and managed according to project requirements and best practices.

## Core Knowledge & Capabilities
**Executive Summary**

The official NPM and Node.js documentation provides comprehensive information covering the core concepts, principles, functionalities, and lifecycle of creating and publishing NPM packages. The documentation details initialization (`npm init`), the structure and essential fields of `package.json`, dependency management (`npm install`, `package-lock.json`, `npm ci`, dependency types), versioning (`npm version`, Semantic Versioning), scripting (`package.json` scripts), distribution (`npm publish`, controlling package contents), and security (`npm audit`). Best practices are also discussed or can be inferred from the documented features. The available documentation is sufficient to build a robust internal knowledge base for an AI assistant focused on this topic.

**1. Introduction to NPM Packages**

NPM (Node Package Manager) is the default package manager for Node.js [48]. It manages packages (reusable code modules) and their dependencies [11]. An NPM package is essentially a directory containing a `package.json` file that describes the package and its dependencies, along with the code files (JavaScript modules, etc.) [1, 6, 30]. Packages allow developers to modularize code, share work, contribute to the community, and manage code versions effectively [39].

**2. Package Lifecycle**

The lifecycle of creating and publishing an NPM package generally involves the following stages:

**2.1. Initialization (`npm init`)**

*   **Purpose:** The `npm init` command is used to create a `package.json` file, which is essential for any NPM package, especially if it's intended for publishing [6, 48].
*   **Process:**
    *   Running `npm init` in a project's root directory starts an interactive questionnaire prompting for basic package information like name, version, description, entry point (`main`), test command, git repository, keywords, author, and license [6, 45, 48].
    *   It attempts to make reasonable guesses based on the directory content [45].
    *   The command is additive, preserving existing fields in `package.json` [45].
    *   Using the `-y` or `--yes` flag skips the questionnaire and generates a default `package.json` file [2, 40, 45, 47].
*   **Modern Initializers:** `npm init <initializer>` (e.g., `npm init react-app`) uses `npx` to run a `create-<initializer>` package, which handles project scaffolding [21, 26, 40, 45].
*   **Workspaces:** `npm init` can also be used to initialize new workspaces within a project [21, 40].

**2.2. The `package.json` File**

This file resides in the root directory and contains metadata about the project [2, 30]. It must be actual JSON [1].

*   **Essential Fields (Required for Publishing):**
    *   **`name`**: The package's name. Must be lowercase, <= 214 characters, URL-safe, and unique on the NPM registry if publishing [1, 6]. Can be scoped (e.g., `@my-org/my-package`) [1, 31]. Avoid "js" or "node" in the name [1].
    *   **`version`**: The package's version, typically following Semantic Versioning (SemVer) `MAJOR.MINOR.PATCH` format (e.g., `1.0.0`) [1, 6, 10, 18]. The name and version together uniquely identify a package release [1].

*   **Other Important Fields:**
    *   **`description`**: A brief description of the package, used in `npm search` [1, 2].
    *   **`keywords`**: An array of strings to help discovery via `npm search` [1, 2].
    *   **`main`**: The primary entry point to the program (the file loaded when the package is `require()`'d in CommonJS) [1, 2, 3].
    *   **`exports`**: A modern alternative to `main`, allowing multiple entry points, conditional resolution (e.g., for ES modules vs. CommonJS), and encapsulation (preventing access to non-exported internals) [1, 3]. Takes precedence over `main` if present [3].
    *   **`type`**: Defines how `.js` files in the package are interpreted. `"module"` treats them as ES modules; `"commonjs"` (or absence of the field) treats them as CommonJS modules [3]. `.mjs` files are always ES modules, `.cjs` files are always CommonJS [3].
    *   **`scripts`**: An object containing script commands run via `npm run <script-name>` (e.g., `start`, `test`, `build`) [1, 30, 33, 41].
    *   **`dependencies`**: Packages required for the application to run in production [2, 11, 16, 30]. Maps package names to SemVer ranges [11].
    *   **`devDependencies`**: Packages needed only for development and testing (e.g., linters, test frameworks, bundlers) [2, 11, 16, 30].
    *   **`peerDependencies`**: Specifies packages that the host project (the one installing this package) must provide [11, 12, 13, 16]. Used when a package needs to interoperate with a specific version of a dependency provided by the consumer (e.g., a React component library requiring React) [12, 13].
    *   **`optionalDependencies`**: Dependencies that are not essential; installation failure won't stop the overall package installation [11, 13, 16].
    *   **`bundledDependencies` / `bundleDependencies`**: An array of package names that should be included within the package tarball when published [11, 12, 16]. Useful for non-NPM dependencies or modified third-party libraries [12].
    *   **`repository`**: Specifies the location of the source code (e.g., Git repository URL) [2, 30]. Important for linking to GitHub Packages [29].
    *   **`license`**: Specifies the package's license (e.g., "MIT", "ISC") [1, 2].
    *   **`author`, `contributors`**: Information about the package creators [1, 6].
    *   **`files`**: An array of file patterns describing entries to include when the package is installed. Reverses `.gitignore` logic (patterns specify files *to include*) [1, 24, 27]. If omitted, defaults to `["*"]` (include all files) [1]. Certain files are always included regardless (see Section 2.6) [1].
    *   **`bin`**: A map of command names to local file names, used to install executable files into the system `PATH` [1].
    *   **`homepage`**: URL to the project's homepage [1].
    *   **`bugs`**: URL to the project's issue tracker and/or email address [1, 2].
    *   **`funding`**: Specifies where to find funding information [1].
    *   **`engines`**: Specifies the versions of Node.js (and other tools) the package works on [11].
    *   **`os`**: Specifies compatible operating systems [11].
    *   **`cpu`**: Specifies compatible CPU architectures [11].
    *   **`private`**: If set to `true`, prevents accidental publishing to the public registry [17].
    *   **`publishConfig`**: An object specifying configuration values to be used specifically during publishing, such as the target registry [29, 43].

**2.3. Dependency Management**

*   **`npm install` (or `npm i`)**:
    *   Installs dependencies listed in `package.json` into the `node_modules` directory [11, 23].
    *   Uses `package-lock.json` (if present) to determine the exact versions to install, ensuring consistency [7, 9, 22].
    *   If `package-lock.json` exists but is out of sync with `package.json` (e.g., new dependencies added), `npm install` will update `package-lock.json` [7, 14, 22].
    *   Can install specific packages: `npm install <package-name>`. By default, adds the package to `dependencies` in `package.json` [11]. Use flags like `--save-dev` (or `-D`) for `devDependencies` or `--save-optional` (or `-O`) for `optionalDependencies` [11].
*   **`package-lock.json`**:
    *   **Purpose:** Records the *exact* versions of every package installed in `node_modules`, including transient dependencies (dependencies of dependencies) [7, 9, 14, 20]. Ensures reproducible builds across different environments (teammates, CI, deployments) [7, 9, 20].
    *   **Generation:** Automatically generated or updated by any npm operation that modifies `node_modules` or `package.json` (like `npm install`, `npm update`, `npm rm`) [7, 14, 20, 22].
    *   **Usage:** Prioritized by `npm install` to fetch the exact dependency tree described within it [7, 14, 22].
    *   **Source Control:** Intended to be committed to source control [7, 14, 20].
    *   **`npm-shrinkwrap.json`:** Similar format and function to `package-lock.json`, but it *can* be published. Generally not recommended unless deploying CLI tools or similar [20, 37]. `package-lock.json` is ignored if `npm-shrinkwrap.json` is present [36].
*   **`npm ci`**:
    *   **Purpose:** Provides a clean, consistent, and often faster installation, primarily for automated environments (CI/CD, testing) [8, 36, 37, 49].
    *   **Behavior:**
        *   Requires an existing `package-lock.json` or `npm-shrinkwrap.json` [36, 37, 49].
        *   Installs dependencies *exactly* as specified in the lockfile [8, 36].
        *   If `package.json` and the lockfile are out of sync, `npm ci` will exit with an error instead of updating the lockfile [36, 37, 49].
        *   Deletes any existing `node_modules` directory before starting the install [36, 37, 49].
        *   Never modifies `package.json` or the lockfiles [36, 37, 49].
        *   Cannot be used to add individual dependencies [36, 37, 49].
*   **Dependency Types:** [11, 12, 13, 16, 17]
    *   **`dependencies` (`.prod`)**: Required for production execution. Installed by default with `npm install <pkg>`.
    *   **`devDependencies` (`.dev`)**: Needed for development (testing, linting, building). Installed with `npm install <pkg> --save-dev`. Not installed by default when your package is installed as a dependency by others (unless explicitly requested or in development mode).
    *   **`peerDependencies` (`.peer`)**: Required by the *consuming* package. The package declares what version of a peer dependency it's compatible with, but doesn't install it itself. Ensures compatibility without multiple conflicting versions (e.g., React plugins). Installation behavior varies across npm versions (npm 7+ attempts to auto-install them) [13].
    *   **`optionalDependencies` (`.optional`)**: Not critical. If they fail to install, npm proceeds without error. Useful for dependencies that might not work on all platforms.
    *   **`bundledDependencies` / `bundleDependencies`**: Packages included directly within the published tarball. Listed as an array of package names (versions are taken from `dependencies` or `devDependencies`).

**2.4. Versioning**

*   **Semantic Versioning (SemVer):** The standard convention (`MAJOR.MINOR.PATCH`) used by npm [4, 6, 10, 18, 19].
    *   **MAJOR:** Incremented for incompatible API changes (breaking changes) [4, 10, 19].
    *   **MINOR:** Incremented for adding functionality in a backward-compatible manner [4, 10, 19].
    *   **PATCH:** Incremented for backward-compatible bug fixes [4, 10, 19].
    *   **Pre-1.0.0:** Versions like `0.x.y` have slightly different rules; breaking changes often increment the MINOR (`0.x.0`), and features/patches increment the PATCH (`0.0.x`) [10].
    *   **Version Ranges:** `package.json` uses symbols like `^` (allows minor and patch updates, e.g., `^1.2.3` allows `>=1.2.3 <2.0.0`) and `~` (allows patch updates, e.g., `~1.2.3` allows `>=1.2.3 <1.3.0`) to specify acceptable dependency versions [4, 18, 30]. Exact versions can also be specified [4].
*   **`npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`**:
    *   Updates the `version` field in `package.json` [10].
    *   If run in a Git repository, it also creates a version commit and tag [10].
    *   Using keywords like `patch`, `minor`, `major` automatically increments the respective part according to SemVer rules [4, 10].

**2.5. Scripting (`package.json` scripts)**

*   **Purpose:** Automate repetitive development tasks (testing, linting, building, starting servers, etc.) directly via npm [23, 30, 33, 41].
*   **Definition:** Defined in the `scripts` object within `package.json`, mapping a script name (key) to a shell command (value) [30, 33, 41].
*   **Execution:** Run using `npm run <script-name>` or `npm run-script <script-name>` [23, 41]. For certain standard scripts (`start`, `test`, `stop`, `restart`), the `run` keyword is optional (e.g., `npm start`, `npm test`) [47].
*   **Common Scripts:** `start`, `test`, `build`, `lint`, `dev` [30, 33].
*   **Pre/Post Hooks:** Scripts automatically run before (`pre<script-name>`) and after (`post<script-name>`) a defined script [41]. Example: `pretest`, `test`, `posttest`.
*   **Lifecycle Scripts:** Special scripts tied to the package lifecycle (e.g., `prepare`, `prepublishOnly`, `install`, `uninstall`) [41]. `prepare` runs before packing and publishing, and also upon local `npm install` [41].
*   **Environment Variables:** npm exposes `package.json` fields (like `name`, `version`) as environment variables within scripts (e.g., `$npm_package_version` on Linux/macOS, `%npm_package_version%` on Windows) [47]. Use tools like `cross-var` for cross-platform compatibility [47].

**2.6. Distribution (`npm publish`)**

*   **Purpose:** Uploads the package to an NPM registry (public NPM registry by default) so others can install it via `npm install <package-name>` [43].
*   **Prerequisites:**
    *   An NPM user account [31, 44].
    *   Logged in via `npm login` [42, 44].
    *   A valid `package.json` with unique `name` and `version` [1, 6, 43, 44]. The name/version combination cannot be reused, even after unpublishing [43].
*   **Command:** `npm publish [<tarball>|<folder>]` [43]. Usually run from the package's root directory.
*   **Scoped Packages:** Packages with names like `@scope/package-name` [1].
    *   By default, they are published with `restricted` (private) access [31, 43].
    *   To publish publicly, use `npm publish --access public` [5, 31, 43]. This flag only works on the *initial* publish; use `npm access` for subsequent changes [43].
    *   Requires owning the scope (user scope matches username, org scope requires creating an organization) [31].
*   **Controlling Package Contents:** It's crucial to only publish necessary files [24, 27].
    *   **`files` field in `package.json`:** An array of file paths or glob patterns to *include* [1, 24, 27]. This is generally the recommended approach [1].
    *   **`.npmignore` file:** Similar syntax to `.gitignore`, but specifies files/patterns to *exclude* [1, 24, 27]. If `.npmignore` is missing but `.gitignore` exists, `.gitignore` is used instead [1]. The `files` field overrides `.npmignore` at the root level [1].
    *   **Always Included Files:** Regardless of `files` or `.npmignore`, these are always included [1]:
        *   `package.json`
        *   `README` (and its variations like `README.md`)
        *   `LICENSE` / `LICENCE`
        *   The file specified in the `main` field
        *   Files specified in the `bin` field
    *   **`npm pack`:** Creates a `.tgz` tarball containing the files that *would* be published. Useful for inspection [43].
    *   **`--dry-run` flag:** `npm publish --dry-run` performs all checks and shows files to be included without actually publishing [5, 43].
*   **Publishing Target:** Can be configured via `.npmrc`, the `publishConfig.registry` field in `package.json`, or scope configuration [29, 43].

**3. Security (`npm audit`)**

*   **Purpose:** Scans project dependencies (including transitive ones) for known security vulnerabilities reported in the npm registry/associated databases [25, 38, 46, 50].
*   **Execution:**
    *   Runs automatically after `npm install` [38].
    *   Can be run manually via `npm audit` [38, 50]. Requires `package.json` and `package-lock.json` [38].
*   **Report:** Provides details on found vulnerabilities, severity levels, affected packages, and paths [38, 50].
*   **Remediation:**
    *   `npm audit fix`: Attempts to automatically update vulnerable dependencies to compatible, patched versions, updating `package-lock.json` [38]. May require `--force` for breaking changes [25, 40].
    *   Manual Updates: The report may suggest specific commands or require manual review and updates, especially for breaking changes [38].
*   **Exit Code:** Exits with `0` if no vulnerabilities are found (or `npm audit fix` succeeds). Exits with a non-zero code if vulnerabilities are found, based on the `--audit-level` configuration [25].

**4. Best Practices**

*   **Naming:** Choose a short, descriptive, and unique name. Check the registry first. Use scopes for related packages or organization packages [1, 35, 39]. Register your scope on npmjs.org even for private packages to prevent dependency confusion [35].
*   **Versioning:** Strictly follow Semantic Versioning (SemVer) [6, 10, 19, 35]. Use `npm version` to manage version bumps and Git tags [10].
*   **`package.json`:** Keep metadata clear and concise, especially for internal packages [35]. Include `description`, `keywords`, `repository`, `bugs`, `license` [1, 2].
*   **Dependencies:** Use `dependencies` for runtime needs and `devDependencies` for build/test tools [11, 30]. Understand `peerDependencies` for plugins/libraries [12, 13]. Commit `package-lock.json` to source control [7, 14, 20].
*   **Reproducibility:** Use `npm ci` in automated environments (CI/CD) for consistent, reliable builds [8, 22, 36, 37].
*   **Package Contents:** Explicitly define included files using the `files` field in `package.json` or use `.npmignore` to minimize package size and avoid publishing sensitive or unnecessary files [1, 24, 27]. Use `npm pack` or `npm publish --dry-run` to verify contents before publishing [5, 43].
*   **Entry Points:** Use the `exports` field for modern packages to clearly define public API and support different module systems [3]. Provide a `main` field for backward compatibility [3].
*   **Scripts:** Automate common tasks (test, build, lint) using npm scripts [23, 33, 41]. Document scripts in the `README` or using tools [23, 32]. Consider a `prepublishOnly` script to run tests/linting before publishing [27].
*   **Security:** Regularly run `npm audit` and address vulnerabilities [38, 46]. Enable Two-Factor Authentication (2FA) on your npm account for publishing [27]. Use automation tokens for publishing from CI/CD environments [27, 28].
*   **Documentation:** Include a clear `README.md` explaining what the package does, how to install it, and how to use it [1, 31].

**5. Boundary of Documentation**

While the official NPM documentation is extensive, some areas rely on community conventions built upon documented features (e.g., specific script names like `build` or `dev`). Complex interactions between specific versions of dependencies or nuanced `peerDependency` resolution across different npm versions might require careful testing beyond direct documentation statements. Best practices often synthesize information from multiple documentation pages and community experience.

**6. Documentation References**

**NPM / Node.js Official Documentation:**

1.  `package.json` - npm Docs (2025-03-27): [https://docs.npmjs.com/cli/v10/configuring-npm/package-json](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAKz71ZMSgvxx3NXl3uXkWLYcuZRSEscVPTSddhGsIfrXkTdF1UMNtlQjaR1VLOAXP4ka9JBwYSFDL51udxnY8T3q3oT-viFkdHc8jYeJhk6GlYTset2ZYszVSgpH4RwodvG_ruG-w==)
3.  Modules: Packages | Node.js v23.11.0 Documentation: [https://nodejs.org/api/packages.html](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAL6Mlyp4kJG3oQxBQ8Mjp8BVjbmjHs0yCpBSnCVZ4_4G1YaEzqz9L6JuHBo2HcvebVR6JQlUXFVytb0RRCn8xS4XZuwdFRso7_hWYXcKqkrBdTiuUKWKdBGaRzwIhLvKg==)
6.  Creating a `package.json` file - npm Docs (2024-10-15): [https://docs.npmjs.com/creating-a-package-json-file](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAKqfHAZyjdzuWsXIjG8QqqCT7A4iLbSis5psFYYcEBqTS2JUxl9D_Sq1JkMaJSSwSmjoxlc1GNrvwlE-O55ypI7Ld5IF_9g8R0Ua91mTmdWPhYFUOQ8Afqy9AyP3JowtlLwG0w4vOYhuqHZ0KKCcdc=)
14. `package-locks` - npm Docs (2020-09-22): [https://docs.npmjs.com/cli/v7/configuring-npm/package-locks](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAKk6vmT6DgUjT2HqSiCXH40yc2Z2sTLTrG59BfCWdYe7vjwWssXlo7B1yPL9-euTOl1iaVhr2ER8SHJo_iACAkAZi67xhJ6EsvfV_eTdOs0p7daAkHmE-aznKmtLlFW6KA6zagRq1KeGQ9dwZZeMS1I_F1i--o5tw==)
17. Dependency Selector Syntax & Querying - npm Docs: [https://docs.npmjs.com/cli/v10/using-npm/dependency-selectors](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAJkyoLHUqrtP58KaJC2Yv1hOlOY11sx5QUB8S8_xnY7SiJZLmIHzBESdWwMdjZZZSl2XJdpVT73k0GYR4FXZDhssVmhNgWKG_w8qpYy0bxZKvGJPIqBWPneAspOvC-JocG8t2hWLuPZi1mp8M8UBzFWbiUWpFVrlQ==)
20. `package-lock.json` - npm Docs (2023-03-02): [https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAIHlqAVIxSJ3V_I0X8iWa84LsKtPe_q4VfSZ_VBFt3RGpKrq5fAiK1vPjOeB39eVtm-IM-Z7Ye8zKao0khmoWVk0pG9sFV9YGgBB0ydLrh3wOGHyH6BDfxCOpX6JnSkDa8uYZq67eBVcqBxumwHXf8hA-tj6r2uWNGaehs=)
21. `npm-init` | npm Docs (2022-10-25): [https://docs.npmjs.com/cli/v9/commands/npm-init](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqALgL2ouCdG15pFF6gCzuK-EG_DyZP1PeWCYn_iEHUsaybv9csRUiLAjys6aTmd0Vwhwi3xqWVcif91NQl1vd1NIAyxPA2Ae6uRGucn-hi_HnhKAxEhaogbd4wqpZrWIO6Yujqi6x7rY8aDoww==)
25. `npm-audit` - npm Docs: [https://docs.npmjs.com/cli/v10/commands/npm-audit](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAK9SHK2Kdw6-5xEJyunWBnPBAdVP-0aIzC3PofGWiSIofcFISOai3Xu1WYtnhjc1xl6L5lYkQQ8VDxlCCSiBn-4cyyGdU8QP_JMH-y8EC8P4crl0F70zzVt4QjrO4vlQvMN0VVmQNRIeZdXAA==)
31. Creating and publishing scoped public packages - npm Docs (2023-10-23): [https://docs.npmjs.com/creating-and-publishing-scoped-public-packages](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAIGaz6I8sj2MjWraVEiZmN-eukk9FVsR3j4PDwTIp_R1L3CC3Datvp4DWLrYSbso8piMO1iVQVozCNSkI6G6fdf-y9kAnB5lZRbAahv8BDdWgxitDXl3JMejlEt4SWkcvcojz0yQocEELFiSwI6WyLki-DAUbIh314AbXkl-zA00mY=)
38. Auditing package dependencies for security vulnerabilities - npm Docs (2023-10-23): [https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAJ3TqAm-IfwI6hudQd0N-5H44fqN3v55Kapurl4mslRx2zwUPLTPREoPPaDjiWTAYPJEE395daiCoGO_38V2_n6HIMw0UBNiIxaOnwkM1BI79uD8TGtuaNuC0J8HQ7hkfHqICz201YwiYR0EJz5hOHSawS5LG12xipyajvG9uLK4FlZmlGAC08JneF_Eqs=)
40. `npm-init` | npm Docs (2021-09-30): [https://docs.npmjs.com/cli/v8/commands/npm-init](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAKftCMXj3ixQUMhZ-IwMX_zz2d-4bHJT4RpS-ng5phW2ciqH1_WfeGGHsSKlHZY1LAE3_UIcC75atDTSP4JLdWRoUSuO7FjY0IZnWmNIzyeSyVRqjXDC5kypi4erQG-2Pc2s0KbKpq-Vqk6fg==)
41. `scripts` - npm Docs (2022-10-25): [https://docs.npmjs.com/cli/v9/using-npm/scripts](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAJXdJ1V36tkSBU5L_-TJyAXoYq5tQexH9hcqyTUO7qdsdOOok3ouSFpgmUQIF67biFhziDodaJV3eDVIPo5yOdtbzbx7TeVfuxNML6UblM_YS3dH4a1p0VDLw5SZOv1RHPr-dbuCA1DwtYgJA==)
43. `npm-publish` | npm Docs (2023-07-17): [https://docs.npmjs.com/cli/v9/commands/npm-publish](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAKtuA_GKcPmY26l6hyTW-lTt4G__7ryo24FXrTzkX9G5IKqRYawFfhTgx4gR3ILi02kpUwrvHJbEoZ8IsQWaOmUn1RyyLAzoGmNP-Rrecsd5hYILM0zQdqT1poeV7VsiOR0mXARxkKr0xir5tll0w==)
49. `npm-ci` - npm Docs: [https://docs.npmjs.com/cli/v10/commands/npm-ci](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqALXZzr9olr2jszryHMynuEugVz_U9c3rbZc-GcCLX-4ABl2dfwq0T1tcv7AZBv2eIZb42HTvQPII6PLprAIhpHOEV8oLrcks6u2oWfDhzWTqpjWWNgULQV9E9apXbXtvpFpgfR1REs7VoM=)

**Other Sources (Referencing official concepts/commands):**

*   [2] Everything about `package.json` - DEV Community (2023-02-24)
*   [4] `npm version` cheatsheet - GitHub Gist
*   [5] Best Practices for Creating a Modern npm Package with Security in Mind | Snyk (2025-02-04)
*   [7] What is the role of the `package-lock.json`? - Stack Overflow (2017-06-01)
*   [8] Why developers should use `npm ci` instead of npm install and its benefits - DeployBot Help (2023-06-21)
*   [9] How to Handle npm Dependencies with Lock Files - Inedo Blog (2024-01-16)
*   [10] Understanding npm Versioning - DEV Community (2023-04-04)
*   [11] Understanding dependencies inside your Package.json - NodeSource (2022-02-24)
*   [12] Types of dependencies - Yarn 1 (Note: Yarn docs, but explains npm concepts)
*   [13] npm Peer Dependencies - Fathom
*   [15] A Large Scale Analysis of Semantic Versioning in NPM - arXiv (2023-04-01) (Academic paper analyzing SemVer usage)
*   [16] What are the different types of dependencies in Node.js - GeeksforGeeks (2022-02-12)
*   [18] How to Use Semantic Versioning in NPM | heynode.com
*   [19] Semantic Versioning of Npm Packages After a Dependency Update (2024-06-27)
*   [22] `npm install` and the `package-lock.json` file - David Lozzi (2023-04-10)
*   [23] Introduction to Package JSON Scripts in Node.js: A Guide for Optimizing Your Development Workflow - upGrad (2025-04-23)
*   [24] Best practices for publishing your npm package - Mik Bry
*   [26] `npm-init` - man pages section 1: User Commands (2022-07-27)
*   [27] Npm Publishing Guidelines | Node.JS Reference Architecture - Nodeshift
*   [28] npm packages in the package registry - GitLab Docs
*   [29] Working with the npm registry - GitHub Docs
*   [30] What Is `package.json`? - heynode.com
*   [32] NPM: How to document your `package.json` scripts (2022-03-27)
*   [33] Useful NPM scripts, Example usage(Basics Node.js Series) - DEV Community (2023-10-30)
*   [34] Use npm Audit - JFrog (Note: Vendor docs, references npm audit)
*   [35] Best Practices for Your Organization's npm Packages - Inedo Blog (2024-11-18)
*   [36] What is the difference between "npm install" and "npm ci"? - Stack Overflow (2018-09-25)
*   [37] `npm ci` - CIn UFPE (Mirrors official docs)
*   [39] Create and Publish Your First NPM Package: A Comprehensive Guide - DEV Community (2023-08-12)
*   [42] Publish npm Packages | JetBrains Space Documentation (Note: Vendor docs, references npm commands)
*   [44] Build and publish your npm package - DEV Community (2022-06-20)
*   [45] `npm init` - create a `package.json` file - CIn UFPE (Mirrors official docs)
*   [46] A Developer's Tutorial to Using NPM Audit for Dependency Scanning - Spectral (2024-08-08)
*   [47] Tips and Tricks for working with NPM scripts. - GitHub
*   [48] `npm init` | GeeksforGeeks (2024-06-17)
*   [50] What is `npm audit`? - GeeksforGeeks (2024-04-25)

## Workflow & Usage Examples

**General Workflow:**

1.  Receive task related to npm (e.g., install dependency, update package, run script, publish package).
2.  Use `read_file` to examine `package.json` or `package-lock.json` if necessary.
3.  Execute the appropriate `npm` command using `execute_command` (e.g., `npm install`, `npm run build`, `npm version patch`, `npm publish`).
4.  If modifications to `package.json` are needed directly (less common), use `apply_diff` or `search_and_replace` after reading the file.
5.  Report outcome, including any changes to `package.json` or `package-lock.json`, and command output if relevant.

**Usage Examples:**

**Example 1: Install a new dependency**

```prompt
Install the 'lodash' library as a production dependency for the project.
```

**Example 2: Run tests**

```prompt
Execute the 'test' script defined in package.json.
```

**Example 3: Update a package**

```prompt
Update the 'react' package to the latest minor version allowed by the current `package.json` range.
```

## Limitations

*   Does not handle complex build configurations beyond simple npm scripts (e.g., intricate Webpack/Rollup setups). Escalate to relevant build tool specialists or frontend/backend leads.
*   Does not manage alternative package managers like Yarn or pnpm unless specifically instructed and provided with commands.
*   Does not resolve deep-seated OS-level issues that might interfere with npm.
*   Does not handle authentication for private registries beyond standard `.npmrc` configurations unless explicitly guided.

## Rationale / Design Decisions

*   This mode centralizes expertise on npm, the default and most common package manager for Node.js, ensuring consistent and correct handling of dependencies and scripts.
*   Separating npm concerns allows other modes (like framework specialists) to focus on their core logic without needing deep npm knowledge.
*   File access is restricted primarily to `package.json` and `package-lock.json` for safety.
