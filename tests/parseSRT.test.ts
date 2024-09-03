// tests/index.test.ts
import { parseSRT } from "../src/index";

//Test a generic .srt test file
test("parseSRT should correctly parse SRT data with multiple lines of text", () => {
  const srtData = `1
00:00:01,000 --> 00:00:04,000
Hello, world!

2
00:00:05,000 --> 00:00:07,000
Hello again!

3
00:00:08,000 --> 00:00:10,000
Single line subtitle.`;

  const expectedOutput = JSON.stringify([
    {
      line: 1,
      start: "00:00:01,000",
      end: "00:00:04,000",
      text: "Hello, world!",
    },
    {
      line: 2,
      start: "00:00:05,000",
      end: "00:00:07,000",
      text: "Hello again!",
    },
    {
      line: 3,
      start: "00:00:08,000",
      end: "00:00:10,000",
      text: "Single line subtitle.",
    },
  ]);

  expect(parseSRT(srtData)).toBe(expectedOutput);
});


//Test a .srt file with multiple lines per subtitle
test("parseSRT should correctly parse subtitles with multiple lines", () => {
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

  const expectedOutput = JSON.stringify([
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

  expect(parseSRT(srtData)).toBe(expectedOutput);
});

//Test input with no content.
test("parseSRT should return an empty array for empty input", () => {
  const srtData = "";
  const expectedOutput = JSON.stringify([]);
  expect(parseSRT(srtData)).toBe(expectedOutput);
});

//Test single line subtitle file
test("parseSRT should correctly parse single line subtitles", () => {
  const srtData = `1
00:00:01,000 --> 00:00:04,000
Hello, world!`;
  const expectedOutput = JSON.stringify([
    {
      line: 1,
      start: "00:00:01,000",
      end: "00:00:04,000",
      text: "Hello, world!",
    },
  ]);
  expect(parseSRT(srtData)).toBe(expectedOutput);
});

