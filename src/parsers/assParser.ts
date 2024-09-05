import { Caption, ParseOptions } from "../config/parseOptions";
import { regexUtils } from "../utils/regexUtils";

/**
 * Parses ASS/SSA subtitle data into a JSON string.
 * @param {string} data - The ASS/SSA subtitle data.
 * @param {ParseOptions} options - Options for parsing.
 * @returns {string} - JSON string of parsed subtitles.
 */
export function parseASS(data: string, options: ParseOptions): string {
  const regex = regexUtils.assRegex;
  const parsedSubs: Caption[] = [];
  let currentLine = 1;
  const matches = data.matchAll(regex);

  for (const match of matches) {
    const { StartTime, EndTime, Content } = match.groups || {};
    if (StartTime && EndTime && Content) {
      const parsed: Caption = {};
      if (options.includeLine) parsed.line = currentLine;
      if (options.includeStart) parsed.start = StartTime;
      if (options.includeEnd) parsed.end = EndTime;
      if (options.includeText) parsed.text = Content.trim();
      parsedSubs.push(parsed);
      currentLine++;
    }
  }

  return JSON.stringify(parsedSubs);
}
