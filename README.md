# 🎬 SubParse

A TypeScript library for parsing subtitle files in `.srt`, `.ass`, and `.ssa` formats into a JSON string. This library provides a simple API to convert subtitle files into a consistent JSON format, making it easy to work with subtitles programmatically.

## 🚀 Features

- **Supports Multiple Subtitle Formats**: Convert subtitle files in `.srt`, `.ass`, and `.ssa` formats into JSON.
- **Automatic File Detection**: Automatically identifies and parses subtitle files based on their extension.
- **Customizable Output**: Select from various output options to tailor the JSON format to your needs.
- **More Features Coming Soon...**: 👽 I hope...

## 📦 Installation

Homie I aint there yet frfr ong

## 📜 Usage Instructions

To use **SubParse** in your project, follow these steps:

1. **Import the Library:**

   ```typescript
   import { parseFile } from "subparse";
   ```

2. **Choose a Preset:**

   Here is a list of available presets you can choose from:

   - `full` - Includes all available information—line number, start time, end time, and text.
   - `minimal` - Includes only the start time and text. Omits line number and end time.
   - `noLine` - Includes start time, end time, and subtitle text, excluding line number.
   - `textOnly` - Includes only the subtitle text, excluding line number, start time, and end time.

   The `preset` parameter is used to customize the output format. Select one from the list and use it directly.

3. **Call `parseFile`:**

   Use the `parseFile` function to parse your subtitle files. Provide the file content and chosen preset.

   The library automatically detects the subtitle format (e.g., SRT, VTT, ASS) based on the content. You don't need to specify the format explicitly.

   In this example this files content is used:

   ```srt
   1
   00:00:01,000 --> 00:00:04,000
   Hello, world!`
   ```

   Example in code, where the "full" preset is used:

   ```typescript
   import { parseFile } from "subparse";

   const jsonOutput = parseFile(fileContent, "full");
   console.log(jsonOutput);
   ```

   Which will result in the following output:

   ```json
   [
     {
       "line": 1,
       "start": "00:00:01,000",
       "end": "00:00:04,000",
       "text": "Hello, world!"
     }
   ]
   ```

## 🗂️ Planned Supported formats

- .srt
- .ass
- .ssa
- .vtt (maybe)
- .sub (maybe)

## ✅ TODO

- [x] add example file for .ass and .ssa files
- [x] add support for .ass
- [x] add support for .ssa
- [x] add support for .ssa
- [x] Rework with regex (Why didn't I use this from the start..?)
- [x] Refactor for easy scaleability
- [x] Allow users to customize the output JSON format.
- [ ] support for .sub
- [x] support for .vtt
- [x] restructure codebase
- [x] add automatic format detection
- [x] add ci/cd
