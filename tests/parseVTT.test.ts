import { parseVTT } from '../src/parsers/vttParser'; 
import { ParseOptions } from '../src/config/parseOptions';

// Define common example data
const exampleVttData = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Hello, world!

2
00:00:05.000 --> 00:00:07.000
Hello again!

3
00:00:08.000 --> 00:00:10.000
Single line subtitle.`;

const exampleVttDataMultiLine = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Hello, world!
This is a subtitle with multiple lines.

2
00:00:05.000 --> 00:00:07.000
Another subtitle
with more than one line.

3
00:00:08.000 --> 00:00:10.000
Single line subtitle.`;

const emptyVttData = "WEBVTT\n\n";

const singleLineVttData = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Hello, world!`;

// Define common options
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
    start: "00:00:01.000",
    end: "00:00:04.000",
    text: "Hello, world!",
  },
  {
    line: 2,
    start: "00:00:05.000",
    end: "00:00:07.000",
    text: "Hello again!",
  },
  {
    line: 3,
    start: "00:00:08.000",
    end: "00:00:10.000",
    text: "Single line subtitle.",
  },
]);

const expectedOutputMultiLine = JSON.stringify([
  {
    line: 1,
    start: "00:00:01.000",
    end: "00:00:04.000",
    text: "Hello, world! This is a subtitle with multiple lines.",
  },
  {
    line: 2,
    start: "00:00:05.000",
    end: "00:00:07.000",
    text: "Another subtitle with more than one line.",
  },
  {
    line: 3,
    start: "00:00:08.000",
    end: "00:00:10.000",
    text: "Single line subtitle.",
  },
]);

const expectedOutputEmpty = JSON.stringify([]);

const expectedOutputSingleLine = JSON.stringify([
  {
    line: 1,
    start: "00:00:01.000",
    end: "00:00:04.000",
    text: "Hello, world!",
  },
]);

// Test cases using defined variables

test("parseVTT should correctly parse VTT data with multiple lines of text", () => {
  expect(parseVTT(exampleVttData, parseOptionsFull)).toBe(expectedOutputFull);
});

test("parseVTT should correctly parse subtitles with multiple lines", () => {
  expect(parseVTT(exampleVttDataMultiLine, parseOptionsFull)).toBe(expectedOutputMultiLine);
});

test("parseVTT should return an empty array for empty input", () => {
  expect(parseVTT(emptyVttData, parseOptionsFull)).toBe(expectedOutputEmpty);
});

test("parseVTT should correctly parse single line subtitles", () => {
  expect(parseVTT(singleLineVttData, parseOptionsFull)).toBe(expectedOutputSingleLine);
});
