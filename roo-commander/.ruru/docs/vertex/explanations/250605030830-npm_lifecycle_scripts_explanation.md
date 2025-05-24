Based on the official npm documentation (`docs.npmjs.com`), here is an explanation of npm lifecycle scripts:

### Definition in `package.json`

npm lifecycle scripts are defined within the `"scripts"` property of your `package.json` file. This property is an object (dictionary) where each key represents a lifecycle event or an arbitrary script name, and the corresponding value is the command string to be executed for that script.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "preinstall": "echo Running preinstall...",
    "install": "node-gyp rebuild",
    "postinstall": "echo Running postinstall...",
    "prestart": "echo Preparing to start...",
    "start": "node server.js",
    "poststart": "echo Server started.",
    "pretest": "eslint .",
    "test": "jest",
    "posttest": "echo Tests finished.",
    "prepublishOnly": "npm test && npm run build",
    "prepare": "npm run build",
    "custom-script": "echo Running a custom script"
  }
}
```

These scripts can be executed using the `npm run <script-name>` command (or `npm run-script <script-name>`). For certain standard lifecycle scripts (`test`, `start`, `stop`, `restart`), you can omit the `run` keyword (e.g., `npm start`).

*(Source: docs.npmjs.com/cli/v10/using-npm/scripts, docs.npmjs.com/cli/v10/configuring-npm/package-json#scripts)*

### Pre & Post Scripts

For any script defined in the `scripts` object (including built-in lifecycle scripts and custom scripts), you can define `pre` and `post` scripts. These are executed automatically before and after the main script, respectively.

For example, if you have a script named `compress`:

```json
"scripts": {
  "precompress": "echo Compressing files...",
  "compress": "gzip assets/*",
  "postcompress": "echo Compression complete."
}
```

Running `npm run compress` will execute `precompress`, then `compress`, and finally `postcompress`.

*(Source: docs.npmjs.com/cli/v10/using-npm/scripts#pre--post-scripts)*

### Lifecycle Scripts: Purpose and Execution

npm defines several special lifecycle script names that are executed automatically during specific npm operations. Here are some key ones:

**Publishing & Packing:**

*   **`prepare`** (since npm@4.0.0):
    *   Runs BEFORE the package is packed (`npm pack`).
    *   Runs BEFORE the package is published (`npm publish`).
    *   Runs on local `npm install` when run without arguments in the package root.
    *   Runs when installing git dependencies. If a git dependency has a `prepare` script, its `dependencies` and `devDependencies` will be installed first, then the `prepare` script runs before the package is finally installed.
    *   Runs *after* `prepublish` but *before* `prepublishOnly`.
    *   Intended for build steps or other preparations needed before the package is used.
*   **`prepublish`** (Deprecated since npm@4.0.0):
    *   Historically ran before publishing *and* on `npm install`. This behavior was confusing.
    *   Now, it does *not* run during `npm publish`. It *does* run during `npm ci` and `npm install`. Use `prepare` or `prepublishOnly` instead.
*   **`prepublishOnly`**:
    *   Runs BEFORE the package is prepared and packed, ONLY on `npm publish`.
    *   Useful for final checks or build steps specific to publishing.
*   **`prepack`**:
    *   Runs BEFORE a tarball is packed (triggered by `npm pack`, `npm publish`, and when installing git dependencies).
*   **`postpack`**:
    *   Runs AFTER the tarball has been generated and moved to its final destination.
*   **`publish`**, **`postpublish`**:
    *   Run AFTER the package is successfully published.

**Installation:**

*   **`preinstall`**:
    *   Runs BEFORE the package is installed.
*   **`install`**:
    *   Runs AFTER the package is installed.
    *   Defaults to `node-gyp rebuild` if a `binding.gyp` file is present and no `install` or `preinstall` script is defined. Generally, avoid custom `install` scripts unless compiling native addons (prefer `.gyp` files for that).
*   **`postinstall`**:
    *   Runs AFTER the package is installed.
*   **`dependencies`**:
    *   Runs AFTER any npm operation that modifies the `node_modules` directory, *if* changes occurred. Runs after `package.json` and lock files are updated.

**Running / Testing / Stopping:**

*   **`prestart`**, **`start`**, **`poststart`**:
    *   Run by the `npm start` command.
    *   `start` defaults to `node server.js` if a `server.js` file exists in the package root.
*   **`prestop`**, **`stop`**, **`poststop`**:
    *   Run by the `npm stop` command.
*   **`pretest`**, **`test`**, **`posttest`**:
    *   Run by the `npm test` command.
*   **`prerestart`**, **`restart`**, **`postrestart`**:
    *   Run by the `npm restart` command. If `restart` is not defined, `npm restart` will run the `stop` and then `start` scripts.

**Versioning:**

*   **`preversion`**: Runs BEFORE bumping the package version. Has access to the old version.
*   **`version`**: Runs AFTER bumping the version, but BEFORE committing. Has access to the new version.
*   **`postversion`**: Runs AFTER bumping the version and AFTER committing. Useful for cleanup or pushing tags/commits.

**Uninstallation:**

*   **`preuninstall`**, **`uninstall`**: Run BEFORE the package is uninstalled.
*   **`postuninstall`**: Run AFTER the package is uninstalled.

*(Source: docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts, docs.npmjs.com/cli/v10/commands/npm-version)*

### Execution Order Examples

The documentation provides specific execution orders for common commands:

*   **`npm install`**:
    1.  `preinstall`
    2.  `install`
    3.  `postinstall`
    4.  `prepublish` (if present, deprecated behavior)
    5.  `prepare`
*   **`npm pack`**:
    1.  `prepare`
    2.  `prepack`
    3.  `postpack`
*   **`npm publish`**:
    1.  `prepublishOnly`
    2.  `prepare`
    3.  `prepack`
    4.  `publish`
    5.  `postpublish`
*   **`npm test`**:
    1.  `pretest`
    2.  `test`
    3.  `posttest`
*   **`npm start`**:
    1.  `prestart`
    2.  `start`
    3.  `poststart`
*   **`npm stop`**:
    1.  `prestop`
    2.  `stop`
    3.  `poststop`
*   **`npm version`**:
    1.  `preversion`
    2.  `version`
    3.  `postversion`

*(Source: docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-operation-order, docs.npmjs.com/cli/v10/commands/npm-version)*

### Notes

*   Scripts run in a separate child process.
*   The `node_modules/.bin` directory is added to the `PATH` environment variable, allowing you to run executables from dependencies directly by name.
*   Environment variables like `npm_lifecycle_event` (the name of the script being run) and variables from the `package.json` `config` object are available to scripts.
*   You can prevent scripts from running during installation using the `--ignore-scripts` flag with `npm install` or `npm ci`.

*(Source: docs.npmjs.com/cli/v10/using-npm/scripts#environment, docs.npmjs.com/cli/v10/commands/npm-install#ignore-scripts)*