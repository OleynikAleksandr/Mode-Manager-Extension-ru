# Unsplash MCP Server

This project implements a Model Context Protocol (MCP) server that provides tools for interacting with the Unsplash API, allowing users to search for and download photos.

[![Unsplash MCP Server Badge](https://glama.ai/mcp/servers/@shariqriazz/unsplash-mcp-server/badge)](https://glama.ai/mcp/servers/@shariqriazz/unsplash-mcp-server)
*(Note: Replace `@shariqriazz` with the correct username/namespace if needed)*

**Git Repository:** [https://github.com/shariqriazz/upsplash-mcp-server](https://github.com/shariqriazz/upsplash-mcp-server) *(Please update if this is not the correct URL)*

## Features

*   Provides MCP tools to interact with the Unsplash API.
*   Search for photos based on queries, pagination, and orientation.
*   Download photos at specified resolutions (raw, full, regular, small).
*   Requires an Unsplash Access Key configured via environment variables.
*   Downloads photos to a local `unsplash/` directory within the workspace.

## Tools Provided

*   **`search_photos`**: Searches for photos on Unsplash.
    *   **Input Schema:**
        ```json
        {
          "type": "object",
          "properties": {
            "query": { "type": "string", "description": "The search term(s)." },
            "page": { "type": "number", "description": "Page number (default: 1).", "default": 1 },
            "per_page": { "type": "number", "description": "Items per page (default: 10, max: 30).", "default": 10, "maximum": 30 },
            "orientation": { "type": "string", "enum": ["landscape", "portrait", "squarish"], "description": "Filter by orientation." }
          },
          "required": ["query"]
        }
        ```
    *   **Output:** Returns JSON data containing search results and a formatted text summary with image links.

*   **`download_photo`**: Downloads an Unsplash photo to the workspace's `unsplash/` folder after triggering the download tracking event.
    *   **Input Schema:**
        ```json
        {
          "type": "object",
          "properties": {
            "photo_id": { "type": "string", "description": "The ID of the photo to download." },
            "resolution": { "type": "string", "enum": ["raw", "full", "regular", "small"], "description": "Desired resolution (default: raw).", "default": "raw" },
            "filename": { "type": "string", "description": "Optional filename (e.g., my-image.jpg). Defaults to sanitized description or {photo_id}.jpg." }
          },
          "required": ["photo_id"]
        }
        ```
    *   **Output:** Returns a success message with the path to the downloaded file.

*(Note: Schemas are illustrative. The server exposes the exact schemas via MCP.)*

## Prerequisites

*   Node.js (v18+ recommended)
*   Bun (`npm install -g bun`)
*   Unsplash Account and API Access Key ([https://unsplash.com/developers](https://unsplash.com/developers))

## Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/shariqriazz/upsplash-mcp-server.git # Update URL if needed
    cd upsplash-mcp-server
    ```
2.  **Install Dependencies:**
    ```bash
    bun install
    ```
3.  **Configure Environment:**
    *   Create a `.env` file in the project root (or copy `.env.example` if provided).
    *   Add your Unsplash Access Key:
        ```dotenv
        UNSPLASH_ACCESS_KEY="YOUR_UNSPLASH_ACCESS_KEY"
        ```
4.  **Build the Server:**
    ```bash
    bun run build
    ```
    This compiles the TypeScript code to `build/index.js`.

## Usage (Standalone / NPX)

**Standalone (Local Build):**

You can run the compiled server directly using `bun` or `node`. Ensure the `UNSPLASH_ACCESS_KEY` environment variable is set in your shell or `.env` file.

```bash
# Ensure UNSPLASH_ACCESS_KEY is set
bun run build/index.js
# OR
node build/index.js
```

**Using NPX (If Published to npm):**

If this package is published to npm (e.g., as `unsplash-mcp-server`), you could run it directly using `npx`.

```bash
# Ensure UNSPLASH_ACCESS_KEY is set in your environment
npx -y unsplash-mcp-server
```
*Note: This requires the package to be published on npm under the specified name.*

## Running with Cline

1.  **Configure MCP Settings:** Add or update the configuration in your Cline MCP settings file (e.g., `.roo/mcp.json` or global settings). You have two primary options:

    **Option A: Using Bun/Node (Direct Path - Recommended for Local Development)**

    This method uses `bun` (or `node`) to run the compiled script directly from your local project directory.

    ```json
    {
      "mcpServers": {
        "unsplash-mcp-server": {
          "command": "bun", // Or "node"
          "args": [
            // Use the absolute path to the compiled index.js in your project
            "/path/to/your/upsplash-mcp-server/build/index.js"
          ],
          "env": {
            // Required: Ensure this matches your .env or is set here
            "UNSPLASH_ACCESS_KEY": "YOUR_UNSPLASH_ACCESS_KEY" // Replace with your actual key
          },
          "disabled": false,
          "alwaysAllow": [
             "search_photos",
             "download_photo"
             // "trigger_download" // Include if this tool exists and is separate
          ],
          "timeout": 3600 // Optional: Timeout in seconds (e.g., 1 hour)
        }
        // Add other servers here...
      }
    }
    ```
    *   **Important:** Replace `/path/to/your/upsplash-mcp-server/build/index.js` with the correct absolute path on your system.
    *   Replace `"YOUR_UNSPLASH_ACCESS_KEY"` with your actual key. Remove comments from the actual JSON file.

    **Option B: Using NPX (Requires Package Published to npm)**

    This method uses `npx` to automatically download and run the server package from the npm registry. This is convenient if you don't want to clone the repository locally or prefer using the published version.

    ```json
    {
      "mcpServers": {
        "unsplash-mcp-server": {
          "command": "npx",
          "args": [
            "-y", // Auto-confirm installation
            "unsplash-mcp-server" // Assumed npm package name - update if different
          ],
          "env": {
            // Required: Ensure this is set here or in your environment
            "UNSPLASH_ACCESS_KEY": "YOUR_UNSPLASH_ACCESS_KEY" // Replace with your actual key
          },
          "disabled": false,
          "alwaysAllow": [
             "search_photos",
             "download_photo"
          ],
          "timeout": 3600 // Optional: Timeout in seconds
        }
        // Add other servers here...
      }
    }
    ```
    *   Ensure the `env` block contains the necessary `UNSPLASH_ACCESS_KEY`.
    *   Update `"unsplash-mcp-server"` in `args` if the published npm package name is different.

2.  **Restart/Reload Cline:** Cline should detect the configuration change and start the server based on your chosen method.

3.  **Use Tools:** You can now use the `search_photos` and `download_photo` tools via Cline.

## Development

*   **Watch Mode:** `bun run watch` (Typically starts the server and restarts on file changes)
*   **Linting:** `bun run lint` (Checks code for style and potential errors)
*   **Formatting:** `bun run format` (Formats code according to project standards)

*(Note: Assumes standard `package.json` scripts like `watch`, `lint`, `format`. Update if your scripts differ.)*

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.