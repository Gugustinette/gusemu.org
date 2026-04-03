import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Get all links from .md and .ts files in the specified directory and its subdirectories.
 */
async function getAllLinks(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const links: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // Recursively get links from subdirectories and files
    if (entry.isDirectory()) {
      links.push(...(await getAllLinks(fullPath)));
    }
    // Only check .md and .ts files
    else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".ts"))) {
      // Read the file
      const content = await fs.readFile(fullPath, "utf-8");
      // Regular expression to match any html link
      const regex = /http[s]?:\/\/[^\s"']+/g;
      let match;
      // Extract all links from the file content
      while ((match = regex.exec(content)) !== null) {
        // Add the links to the list
        links.push(
          match[0]
            // Remove any trailing characters that are not part of the URL, such as parentheses or quotes
            .split(")")[0]
            .split('"')[0]
            .split("'")[0],
        );
      }
    }
  }

  return links;
}

/**
 * Check if a given link is valid by making a HEAD request to the URL.
 */
async function checkLink(link: string): Promise<boolean> {
  try {
    const response = await fetch(link, {
      method: "HEAD",
      // Set a timeout of 20 seconds for the request
      signal: AbortSignal.timeout(20000),
    });
    const isValid =
      // Response code should be between 200 and 500
      response.status >= 200 &&
      response.status < 500 &&
      // 404 is the only invalid as it could mean the content was removed
      response.status !== 404;
    if (isValid) {
      return true;
    } else {
      throw new Error(`Invalid status code: ${response.status}`);
    }
  } catch (error) {
    console.warn(`Error checking link with HEAD: ${link}`, error);
    // On error, try a standard GET request, as some servers/routes may not support HEAD requests
    try {
      const response = await fetch(link);
      return response.status >= 200 && response.status < 500 && response.status !== 404;
    } catch (error) {
      console.error(`Error checking link with GET: ${link}`, error);
      return false;
    }
  }
}

/**
 * Main function to check all links in the /content and /app directories.
 * A link is considered valid if it returns a status code in the range of 200-499 (excluding 404) when a HEAD request is made to it.
 * The script will log any invalid links and set the process exit code to 1 if any invalid links are found.
 */
async function main() {
  const contentLinks = await getAllLinks(path.join(__dirname, "../content"));
  const appLinks = await getAllLinks(path.join(__dirname, "../app"));
  // Remove duplicates
  const allLinks = [...new Set([...contentLinks, ...appLinks])];

  console.log(`Found ${allLinks.length} unique links. Checking...`);

  for (let i = 0; i < allLinks.length; i++) {
    const link = allLinks[i];
    const isValid = await checkLink(link);
    if (!isValid) {
      console.warn(`Invalid link: ${link}`);
      // Return code
      process.exitCode = 1;
    }

    // Display progress as 10x10 counter
    const progress = i + 1;
    const progressBar = Math.floor((progress / allLinks.length) * 100);
    const filled = Math.floor(progressBar / 10);
    const counter = `[${"█".repeat(filled)}${"░".repeat(10 - filled)}] ${progress}/${allLinks.length}`;
    console.log(counter);
  }

  console.log("Link checking completed.");
}

// Run the main function
main().catch((error) => {
  console.error("Error in main function:", error);
});
