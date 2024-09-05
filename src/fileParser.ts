import { parseSRT } from "./parsers/srtParser";
import { parseASS } from "./parsers/assParser";
import { fetchPreset, ParsePreset } from "./config/presets";
import { ParseOptions } from "./config/parseOptions";

export type ParserFunction = (content: string, options: ParseOptions) => string;

/**
 * A mapping of file extensions to their corresponding parsing functions.
 */
const Parsers: Record<string, ParserFunction> = {
  ".srt": parseSRT,
  ".ass": parseASS,
  ".ssa": parseASS,
};

/**
 * Parses a file based on its extension and preset options.
 * @param {string} fileName - The name of the file to parse.
 * @param {string} fileContent - The content of the file.
 * @param {ParsePreset} preset - The preset option for parsing.
 * @returns {string} - The parsed JSON string.
 */
export function parseFile(
  fileName: string,
  fileContent: string,
  preset: ParsePreset,
): string {
  const fileExtension = Object.keys(Parsers).find((ext) =>
    fileName.endsWith(ext),
  );

  if (!fileExtension) {
    throw new Error(
      "Unsupported file format: " +
        fileName +
        ", Please provide files in formats: .srt, .ssa or .ass",
    );
  }

  const options = fetchPreset(preset);
  const parser: ParserFunction = Parsers[fileExtension];
  return parser(fileContent, options);
}
