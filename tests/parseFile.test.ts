import { parseFile } from "../src/index";

// Define common example data
const srtData = `1
00:00:01,000 --> 00:00:04,000
Hello, world!
This is a subtitle with multiple lines.

2
00:00:05,000 --> 00:00:07,000
Another subtitle
with more than one line.

3
00:00:08,000 --> 00:00:10,000
Single line subtitle.`;

const assData = `[Script Info]
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

// SRT expected outputs
const srtExpectedFull = JSON.stringify([
  {
    line: 1,
    start: "00:00:01,000",
    end: "00:00:04,000",
    text: "Hello, world! This is a subtitle with multiple lines.",
  },
  {
    line: 2,
    start: "00:00:05,000",
    end: "00:00:07,000",
    text: "Another subtitle with more than one line.",
  },
  {
    line: 3,
    start: "00:00:08,000",
    end: "00:00:10,000",
    text: "Single line subtitle.",
  },
]);

const srtExpectedMinimal = JSON.stringify([
  {
    line: 1,
    text: "Hello, world! This is a subtitle with multiple lines.",
  },
  {
    line: 2,
    text: "Another subtitle with more than one line.",
  },
  {
    line: 3,
    text: "Single line subtitle.",
  },
]);

const srtExpectedTextOnly = JSON.stringify([
  {
    text: "Hello, world! This is a subtitle with multiple lines.",
  },
  {
    text: "Another subtitle with more than one line.",
  },
  {
    text: "Single line subtitle.",
  },
]);

const srtExpectedNoLine = JSON.stringify([
  {
    start: "00:00:01,000",
    end: "00:00:04,000",
    text: "Hello, world! This is a subtitle with multiple lines.",
  },
  {
    start: "00:00:05,000",
    end: "00:00:07,000",
    text: "Another subtitle with more than one line.",
  },
  {
    start: "00:00:08,000",
    end: "00:00:10,000",
    text: "Single line subtitle.",
  },
]);

// ASS expected outputs
const assExpectedFull = JSON.stringify([
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

const assExpectedMinimal = JSON.stringify([
  {
    line: 1,
    text: "Hello, world! This is a subtitle.",
  },
  {
    line: 2,
    text: "Another subtitle line.",
  },
  {
    line: 3,
    text: "Single line subtitle.",
  },
]);

const assExpectedTextOnly = JSON.stringify([
  {
    text: "Hello, world! This is a subtitle.",
  },
  {
    text: "Another subtitle line.",
  },
  {
    text: "Single line subtitle.",
  },
]);

const assExpectedNoLine = JSON.stringify([
  {
    start: "0:00:01.00",
    end: "0:00:04.00",
    text: "Hello, world! This is a subtitle.",
  },
  {
    start: "0:00:05.00",
    end: "0:00:07.00",
    text: "Another subtitle line.",
  },
  {
    start: "0:00:08.00",
    end: "0:00:10.00",
    text: "Single line subtitle.",
  },
]);

// Test cases using exact preset options

test("parseFile should correctly parse an .srt file with 'full' preset", () => {
  expect(parseFile("example.srt", srtData, "full")).toBe(srtExpectedFull);
});

test("parseFile should correctly parse an .srt file with 'minimal' preset", () => {
  expect(parseFile("example.srt", srtData, "minimal")).toBe(srtExpectedMinimal);
});

test("parseFile should correctly parse an .srt file with 'noLine' preset", () => {
  expect(parseFile("example.srt", srtData, "noLine")).toBe(srtExpectedNoLine);
});

test("parseFile should correctly parse an .srt file with 'textOnly' preset", () => {
  expect(parseFile("example.srt", srtData, "textOnly")).toBe(srtExpectedTextOnly);
});

test("parseFile should correctly parse an .ass file with 'full' preset", () => {
  expect(parseFile("example.ass", assData, "full")).toBe(assExpectedFull);
});

test("parseFile should correctly parse an .ass file with 'minimal' preset", () => {
  expect(parseFile("example.ass", assData, "minimal")).toBe(assExpectedMinimal);
});

test("parseFile should correctly parse an .ass file with 'noLine' preset", () => {
  expect(parseFile("example.ass", assData, "noLine")).toBe(assExpectedNoLine);
});

test("parseFile should correctly parse an .ass file with 'textOnly' preset", () => {
  expect(parseFile("example.ass", assData, "textOnly")).toBe(assExpectedTextOnly);
});

// Test for unsupported file format
test("parseFile should throw an error for unsupported file formats", () => {
  const fileName = "example.mp4";
  const fileContent = "This is not a subtitle file.";

  expect(() => {
    parseFile(fileName, fileContent, "full");
  }).toThrow("Unsupported file format: example.mp4, Please provide files in formats: .srt, .ssa or .ass");
});

// Test for empty file content
test("parseFile should handle empty file content correctly", () => {
  const srtData = "";
  const expectedOutput = JSON.stringify([]);

  expect(parseFile("empty.srt", srtData, "full")).toBe(expectedOutput);
});

// Test for file with only metadata (for .ass format)
test("parseFile should handle file with only metadata (for .ass format)", () => {
  const assDataMetadataOnly = `[Script Info]
Title: Example Subtitle
Original Script: Example Script Writer
ScriptType: v4.00
Collisions: Normal
PlayDepth: 0

[V4 Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding
Style: Default,Arial,20,65535,-2147483640,-2147483640,-2147483640,-1,0,1,1,1,2,10,10,10,0,1

[Events]
Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text`;

  expect(parseFile("metadata_only.ass", assDataMetadataOnly, "full")).toBe(JSON.stringify([]));
});
