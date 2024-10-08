import { parseASS } from '../src/parsers/assParser'; 
import { ParseOptions } from '../src/config/parseOptions';

// Define common example data
const exampleAssData = `[Script Info]
Title: Example Subtitle
Original Script: Example Script Writer
ScriptType: v4.00
Collisions: Normal
PlayDepth: 0

[V4 Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding
Style: Default,Arial,20,65535,-2147483640,-2147483640,-2147483640,-1,0,1,1,1,2,10,10,10,0,1

[Events]
Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: Marked=0,0:00:01.00,0:00:04.00,Default,,0,0,0,,Hello, world! This is a subtitle.
Dialogue: Marked=0,0:00:05.00,0:00:07.00,Default,,0,0,0,,Another subtitle line.
Dialogue: Marked=0,0:00:08.00,0:00:10.00,Default,,0,0,0,,Single line subtitle.`;

const exampleAssDataWithWhitespace = `[Script Info]
Title: Example Subtitle
Original Script: Example Script Writer
ScriptType: v4.00
Collisions: Normal
PlayDepth: 0

[V4 Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding
Style: Default,Arial,20,65535,-2147483640,-2147483640,-2147483640,-1,0,1,1,1,2,10,10,10,0,1

[Events]
Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: Marked=0,0:00:01.00,0:00:04.00,Default,,0,0,0,,Hello, world! This is a subtitle.   

Dialogue: Marked=0,0:00:05.00,0:00:07.00,Default,,0,0,0,,Another subtitle line.   

Dialogue: Marked=0,0:00:08.00,0:00:10.00,Default,,0,0,0,,Single line subtitle.`;

const singleLineAssData = `[Script Info]
Title: Example Subtitle
Original Script: Example Script Writer
ScriptType: v4.00
Collisions: Normal
PlayDepth: 0

[V4 Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding
Style: Default,Arial,20,65535,-2147483640,-2147483640,-2147483640,-1,0,1,1,1,2,10,10,10,0,1

[Events]
Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: Marked=0,0:00:01.00,0:00:04.00,Default,,0,0,0,,Hello, world!`;

const parseOptionsFull: ParseOptions = {
  includeLine: true,
  includeStart: true,
  includeEnd: true,
  includeText: true,
};

// Define expected outputs
const expectedOutputFull = JSON.stringify([
  {
    line: 1,
    start: "0:00:01.00",
    end: "0:00:04.00",
    text: "Hello, world! This is a subtitle.",
  },
  {
    line: 2,
    start: "0:00:05.00",
    end: "0:00:07.00",
    text: "Another subtitle line.",
  },
  {
    line: 3,
    start: "0:00:08.00",
    end: "0:00:10.00",
    text: "Single line subtitle.",
  },
]);

const expectedOutputWithWhitespace = JSON.stringify([
  {
    line: 1,
    start: "0:00:01.00",
    end: "0:00:04.00",
    text: "Hello, world! This is a subtitle.",
  },
  {
    line: 2,
    start: "0:00:05.00",
    end: "0:00:07.00",
    text: "Another subtitle line.",
  },
  {
    line: 3,
    start: "0:00:08.00",
    end: "0:00:10.00",
    text: "Single line subtitle.",
  },
]);

const expectedOutputSingleLine = JSON.stringify([
  {
    line: 1,
    start: "0:00:01.00",
    end: "0:00:04.00",
    text: "Hello, world!",
  },
]);

// Test cases using defined variables

test("parseASS should correctly parse ASS data with multiple lines of text", () => {
  expect(parseASS(exampleAssData, parseOptionsFull)).toBe(expectedOutputFull);
});

test("parseASS should handle extra whitespace between subtitles", () => {
  expect(parseASS(exampleAssDataWithWhitespace, parseOptionsFull)).toBe(expectedOutputWithWhitespace);
});

test("parseASS should correctly parse a single subtitle entry", () => {
  expect(parseASS(singleLineAssData, parseOptionsFull)).toBe(expectedOutputSingleLine);
});
