# 🎬 SubParse

A TypeScript library for parsing subtitle files in `.srt`, `.ass`, and `.ssa` formats into a JSON string. This library provides a simple API to convert subtitle files into a consistent JSON format, making it easy to work with subtitles programmatically.

## 🚀 Features

- **Parse Several Subtitle File Formats**: Convert `.srt`, `.ass`, `.ssa` subtitle files into JSON.
- **Flexible File Handling**: Automatically detects and parses the file based on extension.
- **Output Options** : Choose between a set of output options to customize how the JSON is output.
- **More to come!** : Hopefully...

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

   Use the `parseFile` function to parse your subtitle files. Provide the file name, file content, and chosen preset.

   ```typescript
   const fileName = "example.srt";
   const fileContent = `1\n00:00:01,000 --> 00:00:04,000\nHello, world!`;
   const preset = "full"; // Choose from the list of presets

   const jsonOutput = parseFile(fileName, fileContent, preset);
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


---

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
- [ ] support for .vtt
- [x] restructure codebase
- [ ] add automatic format detection
```
