Based on the official npm documentation (docs.npmjs.com), here is an explanation of the `npm install` command:

### Purpose of `npm install`

The primary purpose of the `npm install` command is to install packages and their dependencies. npm (Node Package Manager) is the package manager for Node.js, used to discover, install, publish, and manage node programs and their dependencies. `npm install` is one of the most fundamental commands used in npm workflows. [3]

### How `npm install` Works

1.  **Installing Project Dependencies:**
    *   When run within a package directory (a folder containing a `package.json` file) with no arguments (`npm install`), the command reads the `package.json` file. [1], [2]
    *   It installs all the packages listed in the `dependencies` and `devDependencies` sections (unless specific flags are used) into a local `node_modules` folder within the current directory. [1], [2], [4]
    *   If a `package-lock.json` or `npm-shrinkwrap.json` file exists, npm uses it to determine the exact versions of dependencies to install, ensuring a consistent and reproducible build environment. The order of precedence is `npm-shrinkwrap.json`, then `package-lock.json`. [1], [2], [14]

2.  **Installing Specific Packages:**
    *   You can install a specific package by running `npm install <package-name>`. [1], [3], [6]
    *   By default (since npm version 5), this command installs the latest version of the package satisfying the "latest" tag (unless a specific version or tag is specified, e.g., `npm install <package-name>@<version>` or `npm install <package-name>@<tag>`) and adds it to the `dependencies` section in your `package.json` file. [1], [2], [10], [11]

### Common Options

*   **`-D` or `--save-dev`**:
    *   Installs the specified package(s) and adds them to the `devDependencies` section of the `package.json` file. [1], [2], [11]
    *   `devDependencies` are packages needed only for development and testing (e.g., testing frameworks, build tools, linters), not for the application to run in production. [11]
    *   Example: `npm install jest --save-dev`

*   **`-g` or `--global`**:
    *   Installs the package globally on the system, rather than locally within the project's `node_modules` folder. [1], [2], [5]
    *   Globally installed packages are typically command-line tools or utilities that you want to access from anywhere on your system. [5]
    *   Global packages are installed in a system-defined location (e.g., `$npm_config_prefix/lib/node_modules`) and their executables are linked to `$npm_config_prefix/bin`. [3]
    *   Example: `npm install -g npm-check-updates`

*   **`-P` or `--save-prod`**:
    *   Installs the specified package(s) and adds them to the `dependencies` section of the `package.json` file. [1], [2], [11]
    *   This is the default behavior when installing a specific package unless `-D` (or `-O` for optional dependencies) is specified. [1], [2], [11]
    *   `dependencies` are packages required for the application to run in production. [11]
    *   Example: `npm install express --save-prod` (equivalent to `npm install express`)

*   **`--no-save`**:
    *   Installs the specified package(s) but prevents npm from automatically saving them to the `package.json` file. [1], [2], [6], [10]
    *   Example: `npm install lodash --no-save`

*   **`--production`** (or when `NODE_ENV` environment variable is `production`):
    *   When running `npm install` with no arguments, this flag causes npm to install *only* the packages listed in `dependencies` and skip those listed in `devDependencies`. [1], [2]
    *   This is useful for deployment scenarios where development tools are not needed.

### Interaction with `package.json`

*   **Reading:** When `npm install` is run without arguments, it reads `package.json` to identify the project's dependencies (both `dependencies` and `devDependencies`, unless `--production` is used) and their required version ranges (using semantic versioning or `semver`). [1], [2], [4], [11]
*   **Writing:** When `npm install <package-name>` is run (without `--no-save`), it modifies `package.json` by adding or updating the entry for the installed package in either `dependencies` (default or with `--save-prod`) or `devDependencies` (with `--save-dev`). [1], [2], [11]

### Interaction with `package-lock.json`

*   **Purpose:** The `package-lock.json` file records the exact versions of every direct and transitive dependency that were installed in the `node_modules` tree. Its primary goal is to ensure that installations are reproducible across different machines and environments. [1], [2], [14]
*   **Reading:** If a `package-lock.json` file exists when `npm install` is run, npm uses this file to determine the exact dependency tree to install, ignoring `package.json` for resolving version ranges (it still verifies compatibility). This ensures that the same versions are installed every time. [1], [2], [13], [14]
*   **Writing:** `npm install` will create or update the `package-lock.json` file whenever it modifies the `node_modules` directory (e.g., when installing new packages, updating existing ones, or installing a project for the first time). It reflects the exact state of the installed dependency tree. [1], [2], [14] Committing `package-lock.json` to source control is highly recommended. [14]

*(Source: Primarily based on the npm documentation available at docs.npmjs.com, specifically the pages for `npm install`, `package.json`, `package-lock.json`, and related concepts.)* [1], [2], [11], [14], [15]