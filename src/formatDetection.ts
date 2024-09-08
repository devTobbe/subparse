import { regexDetection } from "./utils/regexUtils";

/**
 * Detects the format of a subtitle file based on its content using regular expressions.
 * @param {string} fileContent - The content of the subtitle file to be analyzed.
 * @returns {string} - The detected file format as a string, or "UNKNOWN" if the format cannot be identified.
 */
export function detectFormat(fileContent: string): string {
  for (const [format, regex] of Object.entries(regexDetection)) {
    if (regex.test(fileContent)) {
      return format;
    }
  }
  return "UNKNOWN";
}
