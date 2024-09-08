/**
 * Regex patterns used for parsing subtitle files.
 */
export const regexParse = {
  srt:
    /(?<Line>\d+)\n(?<StartTime>\d+\:\d+\:\d+\,\d+)\s+\-\-\>\s+(?<EndTime>\d+\:\d+\:\d+\,\d+)\n(?<Content>(?:[^\n]+\n?)+)(?=\n\n|\n\d+\n|$)/gm,
  ass:
    /^Dialogue:\s*(?:|\w+\W)(?:Marked=\d+,\s*)?\d+,(?<StartTime>\d+:\d+:\d+\.\d+),(?<EndTime>\d+:\d+:\d+\.\d+),[^,]*,[^,]*,\d+,\d+,\d+,[^,]*,(?<Content>.+)$/gm,
  vtt:
    /(?:^(?<Line>\d+)\n)?(?<StartTime>\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(?<EndTime>\d{2}:\d{2}:\d{2}\.\d{3})\n(?<Content>(?:[^\n]+\n?)*)\n?(?=\n\n|\n\d+|\s*$)/gm,
};

export const regexDetection = {
    vtt: /WEBVTT/,
    ass: /^\[Script Info\]/m,
    srt: /^\d+\r?\n\d+:\d+:\d+,\d+ --> \d+:\d+:\d+,\d+\r?\n/, 
}
