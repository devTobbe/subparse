import { Caption, ParseOptions } from "../config/parseOptions";
import { regexParse } from "../utils/regexUtils";

/**
 * Parses SRT subtitle data into a JSON string.
 * @param {string} data - The SRT subtitle data.
 * @param {ParseOptions} options - Options for parsing.
 * @returns {string} - JSON string of parsed subtitles.
 */
export function parseSRT(data: string, options: ParseOptions): string {
  const regex = regexParse.srt;
  const parsedSubs: Caption[] = [];
  const matches = data.matchAll(regex);

  for (const match of matches) {
    const { Line, StartTime, EndTime, Content } = match.groups || {};
    if (Line && StartTime && EndTime && Content) {
      const parsed: Caption = {};
      if (options.includeLine) parsed.line = parseInt(Line, 10);
      if (options.includeStart) parsed.start = StartTime;
      if (options.includeEnd) parsed.end = EndTime;
      if (options.includeText)
        parsed.text = Content.replace(/\r?\n/g, " ").trim();
      parsedSubs.push(parsed);
    }
  }

  return JSON.stringify(parsedSubs);
}
