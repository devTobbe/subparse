/**
 * Regex patterns used for parsing subtitle files.
 */
export const regexUtils = {
  srtRegex:
    /(?<Line>\d+)\n(?<StartTime>\d+\:\d+\:\d+\,\d+)\s+\-\-\>\s+(?<EndTime>\d+\:\d+\:\d+\,\d+)\n(?<Content>(?:[^\n]+\n?)+)(?=\n\n|\n\d+\n|$)/gm,
  assRegex:
    /^Dialogue:\s*(?:|\w+\W)(?:Marked=\d+,\s*)?\d+,(?<StartTime>\d+:\d+:\d+\.\d+),(?<EndTime>\d+:\d+:\d+\.\d+),[^,]*,[^,]*,\d+,\d+,\d+,[^,]*,(?<Content>.+)$/gm,
};
