const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT_DIR = path.resolve(__dirname, '..', '..'); // Go up two levels to project root
const TEMP_DIR_NAME = 'kilocode_temp';
const BUILD_DIR = path.join(ROOT_DIR, '.builds'); // Correct: Output to .builds/
const TEMP_DIR = path.join(BUILD_DIR, TEMP_DIR_NAME);
const version = process.argv[2]; // Get version from command line argument
if (!version) {
  console.error("Error: Build version must be provided as the first command line argument.");
  process.exit(1);
}
const ZIP_FILENAME = `kilocode-${version}.zip`; // Correct: Use dynamic version in filename
const ZIP_FILEPATH = path.join(BUILD_DIR, ZIP_FILENAME); // Correct: Use BUILD_DIR and dynamic filename

// --- Configuration ---

const ITEMS_TO_INCLUDE = [
    // '.ruru', // Replaced with specific subdirectories below
    '.ruru/modes',
    '.ruru/templates',
    '.ruru/workflows',
    '.ruru/processes',
    '.ruru/kb',
    '.ruru/docs/standards',
    '.roo',
    'scripts', // Root scripts directory
    '.gitignore',
    '.roomodes',
    'fetch-mcp-readme.md',
    'LICENSE',
    // 'llms.json', // Removed: File does not exist at project root
    'package.json', // Note: package-lock.json is implicitly excluded by not being listed
    'README.md',
    // 'roo-commander-core.repomix.json', // Removed: File does not exist at project root
    // Add other essential root files/dirs if needed
];

// More specific exclusions applied during copy filter
const EXCLUSION_PATTERNS = [
    '.git',
    'node_modules',
    '.staging',
    // 'build', // Removed: This was preventing copying into the .builds/kilocode_temp dir
    '.DS_Store',
    '*.zip',
    '*.log',
    '*~',
    '*.tmp',
    'kilocode-commander-build.zip', // Avoid including previous builds
    TEMP_DIR_NAME, // Avoid recursion if script is run multiple times
    '.ruru/temp', // Exclude temp directory within .ruru
    '.ruru/.builds', // Exclude .builds directory within .ruru
    '.roomodes', // Exclude the source .roomodes file
    '.ruru/archive', // Exclude archive directory within .ruru
    '.ruru/repomix', // Exclude repomix directory within .ruru
    '.ruru/mcp-servers' // Exclude mcp-servers directory within .ruru
];

const EXTENSIONS_TO_REPLACE_CONTENT = ['.js', '.md', '.json', '.yml', '.yaml', '.toml']; // Add other relevant text file extensions

// --- Helper Functions ---

// Simple logging helper
const log = (message) => console.log(`[Build] ${message}`);
const logError = (message, error) => console.error(`[Build Error] ${message}`, error);

// Function to recursively copy files and directories with filtering
async function copyFilesWithFilter(source, destination, filter) {
    try {
        await fs.promises.cp(source, destination, {
            recursive: true,
            filter: (src) => {
                const relativePath = path.relative(ROOT_DIR, src);
                // Basic check: if it's the source directory itself, allow
                if (relativePath === '') return true;
                // Check against exclusion patterns
                return !EXCLUSION_PATTERNS.some(pattern => {
                    // Simple matching for now (can be enhanced with glob patterns if needed)
                    if (pattern.includes('*')) { // Basic wildcard check
                        const regex = new RegExp('^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$');
                        return regex.test(path.basename(relativePath)) || regex.test(relativePath);
                    }
                    return path.basename(relativePath) === pattern || relativePath.startsWith(pattern + path.sep);
                });
            }
        });
    } catch (err) {
        // fs.cp might throw if source doesn't exist, handle gracefully if needed
        if (err.code !== 'ENOENT') {
            throw err; // Re-throw other errors
        }
        log(`Warning: Source item not found, skipping: ${source}`);
    }
}


// Function to recursively replace content in files
async function replaceContentInDir(dirPath) {
    log(`Starting content replacement in ${dirPath}...`);
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const currentPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Recursively process subdirectories
            await replaceContentInDir(currentPath);
        } else if (entry.isFile() && EXTENSIONS_TO_REPLACE_CONTENT.includes(path.extname(entry.name))) {
            try {
                let content = await fs.promises.readFile(currentPath, 'utf8');
                let modified = false;

                // Perform replacements (use regex for more control if needed)
                // Using simple string replacement - be cautious
                const newContentRooDir = content.replace(/\.roo\//g, '.kilocode/');
                if (newContentRooDir !== content) {
                    content = newContentRooDir;
                    modified = true;
                }

                // Update replacement target to .kilocodemodes
                const newContentRoomodes = content.replace(/\.roomodes/g, '.kilocodemodes');
                if (newContentRoomodes !== content) {
                    content = newContentRoomodes;
                    modified = true;
                }

                if (modified) {
                    await fs.promises.writeFile(currentPath, content, 'utf8');
                    // log(`Replaced content in: ${currentPath}`); // Optional: verbose logging
                }
            } catch (err) {
                logError(`Failed to read/write or replace content in ${currentPath}:`, err);
                // Decide if this should be a fatal error
            }
        }
    }
    log(`Finished content replacement in ${dirPath}.`);
}


// --- Main Build Steps ---

async function createKilocodeBuild() {
    log('Starting Kilocode build process...');

    try {
        // 1. Ensure build and temp directories exist and are clean
        log('Cleaning up previous temporary directory if it exists...');
        await fs.promises.rm(TEMP_DIR, { recursive: true, force: true });
        log('Creating temporary directory...');
        await fs.promises.mkdir(TEMP_DIR, { recursive: true });

        // 2. Copy necessary files to temp directory
        log('Copying project files to temporary directory...');
        for (const item of ITEMS_TO_INCLUDE) {
            const sourcePath = path.join(ROOT_DIR, item);
            const destPath = path.join(TEMP_DIR, item);
            if (fs.existsSync(sourcePath)) {
                 log(` -> Copying ${item}...`);
                 await copyFilesWithFilter(sourcePath, destPath);
            } else {
                log(` -> Warning: Source item not found, skipping: ${item}`);
            }
        }
        log('File copying complete.');


        // 3. Rename items within the temp directory
        log('Renaming items...');
        const oldRooPath = path.join(TEMP_DIR, '.roo');
        const newKilocodeDirPath = path.join(TEMP_DIR, '.kilocode'); // Target directory name
        const oldRoomodesPath = path.join(TEMP_DIR, '.roomodes');
        const newKilocodemodesPath = path.join(TEMP_DIR, '.kilocodemodes'); // CORRECTED Target file name

        if (fs.existsSync(oldRooPath)) {
            await fs.promises.rename(oldRooPath, newKilocodeDirPath);
            log(' -> Renamed .roo/ to .kilocode/');
        } else {
             log(' -> Warning: .roo directory not found in temp dir, skipping rename.');
        }

        if (fs.existsSync(oldRoomodesPath)) {
            // Rename to .kilocodemodes
            await fs.promises.rename(oldRoomodesPath, newKilocodemodesPath);
            log(' -> Renamed .roomodes to .kilocodemodes');
        } else {
             log(' -> Warning: .roomodes file not found in temp dir, skipping rename.');
        }
        log('Renaming complete.');


        // 4. Perform content replacement
        log('Performing content replacement...');
        await replaceContentInDir(TEMP_DIR);
        log('Content replacement complete.');


        // 5. Create the zip archive
        log('Creating zip archive...');
        await fs.promises.mkdir(BUILD_DIR, { recursive: true }); // Ensure build dir exists
        const output = fs.createWriteStream(ZIP_FILEPATH);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // Wrap stream finalization in a Promise to ensure cleanup happens after file is closed
        await new Promise(async (resolve, reject) => {
            output.on('close', () => {
                log(`Zip archive created: ${ZIP_FILENAME} (${archive.pointer()} total bytes)`);
                resolve(); // Resolve the promise when the file stream is closed
            });

            output.on('end', () => {
                log('Data has been drained');
            });

            archive.on('warning', (err) => {
                if (err.code === 'ENOENT') {
                    logError('Archive warning (ENOENT):', err);
                } else {
                    reject(err); // Reject on other warnings
                }
            });

            archive.on('error', (err) => {
                reject(err); // Reject on error
            });

            // Pipe archive data to the file
            archive.pipe(output);

            // Append files from the temporary directory
            archive.directory(TEMP_DIR, false);

            // Finalize the archive
            try {
                await archive.finalize();
                log('Zip archive finalization initiated.');
            } catch (finalizeError) {
                reject(finalizeError); // Reject if finalize fails
            }
        }); // End of Promise wrapper

        log('Build process completed successfully!');

    } catch (error) {
        logError('Build failed:', error);
        process.exitCode = 1; // Indicate failure
    } finally {
        // 6. Cleanup the temporary directory (Now guaranteed to run after stream close/error)
        log('Cleaning up temporary directory...');
        try {
            await fs.promises.rm(TEMP_DIR, { recursive: true, force: true });
            log('Temporary directory cleaned up.');
        } catch (cleanupError) {
            logError('Failed to clean up temporary directory:', cleanupError);
        }
    }
}

// Run the build process
createKilocodeBuild();