### `npm version` Command

The `npm version` command is used to increment the version number of a package contained within a directory. It modifies the version property in the `package.json` file and, if present, also updates the `package-lock.json` and `npm-shrinkwrap.json` files to reflect the new version.

**Purpose:**

*   **Version Management:** Its primary purpose is to manage the package version according to Semantic Versioning (SemVer) rules. This helps communicate the nature of changes made between releases (bug fixes, new features, breaking changes).
*   **Automation:** It automates the process of updating version numbers across relevant project files.
*   **Integration with Git:** It integrates with Git for version tagging and committing, streamlining the release process.

**Interaction with `package.json`:**

*   The command directly reads the current version from the `package.json` file.
*   It updates the `version` field within `package.json` to the new calculated or specified version.
*   It also updates associated lockfiles (`package-lock.json`, `npm-shrinkwrap.json`) to ensure consistency.

*(Source: npm Docs - npm-version [6, 9], npm Docs - package.json [15])*

**Interaction with Git:**

*   **Repository Check:** If executed within a Git repository, `npm version` first checks if the working directory is clean (no uncommitted changes). This check can be bypassed using the `-f` or `--force` flag.
*   **Commit:** By default, it creates a new Git commit with a message like "vx.y.z", where x.y.z is the new version number.
    *   A custom commit message can be provided using the `-m` or `--message` option. The string `%s` in the message will be replaced with the new version number (e.g., `npm version patch -m "Bump version to %s"`).
*   **Tag:** It creates an annotated Git tag for the new version (e.g., `v1.2.3`).
*   **Control Flags:**
    *   The commit and tag behavior is controlled by the `git-tag-version` configuration, which defaults to `true`.
    *   To prevent the Git commit and tag creation, use the `--no-git-tag-version` flag. Setting `git-tag-version` to `false` also disables the commit.
*   **Signed Tags:** If the `sign-git-tag` configuration is set to `true` (or the `--sign-git-tag` flag is used), the command will create a GPG-signed Git tag (using `git tag -s`). This requires GPG keys to be configured in Git.
*   **Commit Hooks:** By default (`commit-hooks=true`), Git commit hooks will be run during the version commit process.

*(Source: npm Docs - npm-version [6, 9], npm Docs - Updating your published package version number [3])*

**Common Usage Patterns:**

The `npm version` command accepts different arguments to specify the desired version update:

*   **Semantic Versioning Increments:** These arguments increment the version based on SemVer rules (MAJOR.MINOR.PATCH):
    *   `npm version patch`: Increments the patch version (e.g., `1.0.0` -> `1.0.1`). Typically used for backward-compatible bug fixes.
    *   `npm version minor`: Increments the minor version and resets the patch version to 0 (e.g., `1.0.1` -> `1.1.0`). Typically used for adding backward-compatible functionality.
    *   `npm version major`: Increments the major version and resets minor and patch versions to 0 (e.g., `1.1.0` -> `2.0.0`). Typically used for changes that break backward compatibility.
*   **Prerelease Increments:**
    *   `npm version prepatch`, `npm version preminor`, `npm version premajor`: Increments the respective version part and adds a prerelease identifier (e.g., `1.0.0` -> `1.0.1-0` with `prepatch`).
    *   `npm version prerelease`: Increments the prerelease identifier (e.g., `1.0.1-0` -> `1.0.1-1`).
    *   The prerelease identifier (like `alpha`, `beta`, `rc`) can be specified using the `preid` configuration option.
*   **Specific Version:**
    *   `npm version <valid_semver_string>`: Sets the version to an exact, valid SemVer string (e.g., `npm version 3.1.4`).
*   **From Git:**
    *   `npm version from-git`: Attempts to read the latest Git tag and uses that as the new version.

*(Source: npm Docs - npm-version [6, 9], npm Docs - About semantic versioning [1], npm Docs - Updating your published package version number [3])*

**Lifecycle Scripts:**

`npm version` executes package scripts defined in `package.json` at specific points in its process:

1.  **`preversion`:** Runs before the version is changed. It has access to the *old* version in `package.json`. Useful for running tests before versioning.
2.  **(Version Bump, Git Commit, Git Tag):** The core actions of the command happen here.
3.  **`version`:** Runs after the version has been changed (and after the commit/tag). It has access to the *new* version in `package.json`. Useful for incorporating the new version into generated files.
4.  **`postversion`:** Runs after all other steps, including the `version` script and Git operations. Useful for cleanup or pushing the commit and tag to a remote repository.

*Note:* If scripts generate or modify files that should be included in the version commit, they must explicitly use `git add` to stage those files.

*(Source: npm Docs - npm-version [6])*