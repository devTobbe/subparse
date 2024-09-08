import { regexDetection } from "./utils/regexUtils";

export function detectFormat(fileContent: string): string {
  for (const [format, regex] of Object.entries(regexDetection)) {
    if (regex.test(fileContent)) {
      return format;
    }
  }
  return "UNKNOWN"
}
