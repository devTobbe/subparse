interface parsed {
  line: number;
  start: string;
  end: string;
  text: string;
}

/** Function that parses .srt data after file is handled
 * Notes: Hopefully works now but the final returned value is an array of strings of JSON objects. The whole thing should be JSON
 * */
export function parseSRT(data: string): string {
  // Define the regex pattern
  const regex = /(?<Line>\d+)\n(?<StartTime>\d+\:\d+\:\d+\,\d+)\s+\-\-\>\s+(?<EndTime>\d+\:\d+\:\d+\,\d+)\n(?<Content>(?:[^\n]+\n?)+)(?=\n\n|\n\d+\n|$)/gm;

  // Initialize an array to store the parsed subtitles
  const parsedSubtitles: parsed[] = [];

  // Use regex to match all subtitle blocks in the data
  const matches = data.matchAll(regex);

  // Iterate over all matches
  for (const match of matches) {
    const { Line, StartTime, EndTime, Content } = match.groups || {};

    // Ensure that all necessary groups are present
    if (Line && StartTime && EndTime && Content) {
      // Create a Parsed object and push it to the array
      parsedSubtitles.push({
        line: parseInt(Line, 10),
        start: StartTime,
        end: EndTime,
        text: Content.replace(/\r?\n/g, ' ').trim()// Normalize whitespace
      });
    }
  }

  // Convert the array of Parsed objects to a JSON string
  return JSON.stringify(parsedSubtitles);
}

/** Function that parses .ssa data after file is handled*/
export function parseSSA(data: string): string {
  // Split the data into sections by double newlines
  const subs = data.split("\n\n");

  // Check if there are at least 3 sections
  if (subs.length < 3) {
    throw new Error("Invalid SSA format: Not enough sections");
  }

  // Split the third section (events) into lines
  const events = subs[2].split("\n");

  let lineCount: number = 0;

  // Map through events and parse dialogue lines
  const mapped = events
    .map((eventLine) => {
      // Check if the line starts with "Dialogue"
      if (!eventLine.startsWith("Dialogue")) {
        return null;
      }

      // Remove the "Dialogue:" prefix and split by comma
      const splits = eventLine.slice(10).split(",");

      // Ensure the splits have enough elements
      if (splits.length < 9) {
        return null;
      }

      //Handles potential .ass file styles
      const ass = splits
        .slice(9)
        .join(",")
        .replace(/{[^}]*}/g, "");

      // Parse the dialogue line
      const parsed: parsed = {
        line: lineCount,
        start: splits[1],
        end: splits[2],
        text: ass,
      };

      lineCount += 1;
      return parsed;
    })
    .filter(Boolean); // Remove null values

  // Convert the result to JSON and return
  return JSON.stringify(mapped);
}

/** Function that parses .ass data after file is handled*/
function parseASS(data: string) { }

/**
 * This function parses the initial file and then determines how the file should be parsed.
 * @param {string} fileName - name of the file to be parsed.
 * @param {string} fileContent - content of the file to be parsed.
 */
export function parseFile(fileName: string, fileContent: string): string {
  if (fileName.endsWith(".srt")) {
    return parseSRT(fileContent);
  } else if (fileName.endsWith(".ssa")) {
    return parseSSA(fileContent);
  } else {
    throw new Error(
      "Unsupported file format: " +
      fileName +
      ", Please provide files in formats: .srt, .ssa or .ass",
    );
  }
}
