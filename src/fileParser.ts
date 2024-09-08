import { parseSRT } from "./parsers/srtParser";
import { parseASS } from "./parsers/assParser";
import { parseVTT } from "./parsers/vttParser";
import { fetchPreset } from "./config/presets";
import { ParseOptions } from "./config/parseOptions";
import { detectFormat } from "./formatDetection";

export type ParserFunction = (content: string, options: ParseOptions) => string;

/**
 * A mapping of file extensions to their corresponding parsing functions. Gotta remove this at some point
 * and fix the error message below.
 */
const Parsers: Record<string, ParserFunction> = {
  ".srt": parseSRT,
  ".ass": parseASS,
  ".ssa": parseASS,
  ".vtt": parseVTT,
};

/**
 * Parses a file based on its extension and preset options.
 * @param {string} fileContent - The content of the file.
 * @param {ParsePreset} preset - The preset option for parsing.
 * @returns {string} - The parsed JSON string.
 */
export function parseFile(fileContent: string, preset: string): string {
  const format = detectFormat(fileContent);
  const options = fetchPreset(preset);

  switch (format) {
    case "srt":
      return parseSRT(fileContent, options);
    case "ass":
      return parseASS(fileContent, options);
    case "vtt":
      return parseVTT(fileContent, options);
    default:
      throw new Error(
        "Unsupported file format. Please provide files in formats: " +
          Object.keys(Parsers).join(", "),
      );
  }
}
