// tests/index.test.ts
import { parseSRT } from "../src/index";

test("parseSRT should correctly parse SRT data with multiple lines of text", () => {
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
