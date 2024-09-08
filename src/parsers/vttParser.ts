import { Caption, ParseOptions } from "../config/parseOptions";
import { regexParse } from "../utils/regexUtils";

/**
 * Parses VTT subtitle data into a JSON string.
 * @param {string} data - The VTT subtitle data.
 * @param {ParseOptions} options - Options for parsing.
 * @returns {string} - JSON string of parsed subtitles.
 */
export function parseVTT(data: string, options: ParseOptions): string {
  const regex = regexParse.vtt;
  const parsedSubs: Caption[] = [];
  let currentLine = 1; // Keep this in the case that the VTT files doesn't have line numbers
  const matches = data.matchAll(regex);

  for (const match of matches) {
    const { StartTime, EndTime, Content } = match.groups || {};
    if (StartTime && EndTime && Content) {
      const parsed: Caption = {};
      if (options.includeLine) parsed.line = currentLine;
      if (options.includeStart) parsed.start = StartTime;
      if (options.includeEnd) parsed.end = EndTime;
      if (options.includeText) parsed.text = Content.replace(/\r?\n/g, " ").trim();
      parsedSubs.push(parsed);
      currentLine++;
    }
  }

  return JSON.stringify(parsedSubs);
}
