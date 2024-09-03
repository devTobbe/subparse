//Represents a single subtitle line entry.
interface parsed {
  line: number;
  start: string;
  end: string;
  text: string;
}


/**
 * Represents a function that parses subtitle content.
 * @param {string} content - The content of the subtitle file to be parsed.
 * @returns {string} - A JSON string representing the parsed subtitle data.
 */
type ParserFunction = (content: string) => string;

/**
 * A mapping of file extensions to their corresponding parsing functions.
 * This object associates each subtitle file extension with a function that can
 * parse that specific file format into a JSON string.
 * 
 * @type {Record<string, ParserFunction>}
 * @property {string} ".srt" - The parser function for SRT subtitle files.
 * @property {string} ".ass" - The parser function for ASS subtitle files.
 * @property {string} ".ssa" - The parser function for SSA subtitle files.
 */
const parsers: Record<string, ParserFunction> = {
  ".srt": parseSRT,
  ".ass": parseASS,
  ".ssa": parseASS,
};

/**
 * This function takes in the data of an .srt file and parses it into a json string.
 * @param {string} data - data to be parsed, in .srt format
 * @returns {string} returns a json string with parsed .srt data.
 */
export function parseSRT(data: string): string {
  // Define the regex pattern
  const regex =
    /(?<Line>\d+)\n(?<StartTime>\d+\:\d+\:\d+\,\d+)\s+\-\-\>\s+(?<EndTime>\d+\:\d+\:\d+\,\d+)\n(?<Content>(?:[^\n]+\n?)+)(?=\n\n|\n\d+\n|$)/gm;

  // Initialize an array to store the parsed subtitles
  const parsedSubs: parsed[] = [];

  // Use regex to match all subtitle blocks in the data
  const matches = data.matchAll(regex);

  // Iterate over all matches
  for (const match of matches) {
    const { Line, StartTime, EndTime, Content } = match.groups || {};

    // Ensure that all necessary groups are present
    if (Line && StartTime && EndTime && Content) {
      // Create a Parsed object and push it to the array
      parsedSubs.push({
        line: parseInt(Line, 10),
        start: StartTime,
        end: EndTime,
        text: Content.replace(/\r?\n/g, " ").trim(),
      });
    }
  }

  // Convert the array of Parsed objects to a JSON string
  return JSON.stringify(parsedSubs);
}
/**
 * This function takes in the data of an .ass or .ssa file and parses it into a json string.
 * @param {string} data - data to be parsed, in .ass format
 * @returns {string} returns a json string with parsed .ass data.
 */
export function parseASS(data: string) {
  // Define the regex pattern
  const regex =
    /^Dialogue:\s*(?:|\w+\W)(?:Marked=\d+,\s*)?\d+,(?<StartTime>\d+:\d+:\d+\.\d+),(?<EndTime>\d+:\d+:\d+\.\d+),[^,]*,[^,]*,\d+,\d+,\d+,[^,]*,(?<Content>.+)$/gm;

  // Initialize an array to store the parsed subtitles
  const parsedSubs: parsed[] = [];

  // Use regex to match all subtitle blocks in the data
  const matches = data.matchAll(regex);

  // Store current line number, .ass and .ssa does not contain this themselves
  let currentLine: number = 1;

  // Iterate over all matches
  for (const match of matches) {
    const { StartTime, EndTime, Content } = match.groups || {};

    // Ensure all necessary groups are present
    if (StartTime && EndTime && Content) {
      // Create parsed object and push it to the array
      parsedSubs.push({
        line: currentLine,
        start: StartTime,
        end: EndTime,
        text: Content.trim(),
      });
      currentLine++;
    }
  }

  // Convert the array of Parsed objects to a JSON string
  return JSON.stringify(parsedSubs);
}

/**
 * This function parses the initial file and then determines how the file should be parsed.
 * @param {string} fileName - name of the file to be parsed.
 * @param {string} fileContent - content of the file to be parsed.
 * @returns {string} stringified json object containing all parsed data.
 */
export function parseFile(fileName: string, fileContent: string): string {
  const fileExtension = Object.keys(parsers).find((extension) =>
    fileName.endsWith(extension),
  );

  //Throw error if unsupported file extension is used.
  if (!fileExtension) {
    throw new Error(
      "Unsupported file format: " +
      fileName +
      ", Please provide files in formats: .srt, .ssa or .ass",
    );
  }

  //Fetch the correct function, run it and return the returned string
  const parser = parsers[fileExtension];
  return parser(fileContent)

}
