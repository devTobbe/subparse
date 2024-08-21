interface Parsed {
  line: number;
  start: string;
  end: string;
  text: string;
}

/** Function that parses .srt data after file is handled
 * Notes: Hopefully works now but the final returned value is an array of strings of JSON objects. The whole thing should be JSON
 * */
export function parseSRT(data: string): string {
  /** Might be just \n*/
  const subs = data.split("\n\n");
  const mapped = subs.map((subs) => {
    const splits = subs.split("\n");
    const index = splits[0];
    const time = splits[1].split("-->");
    const initial = time[0].trim();
    const final = time[1].trim();
    const line = splits.slice(2).join(" ");

    const parsed: Parsed = {
      line: parseInt(index),
      start: initial,
      end: final,
      text: line,
    };

    return parsed;
  });

  return JSON.stringify(mapped);
}

/** Function that parses .ass data after file is handled*/
function parseASS(data: string) { }

/** Function that parses .ssa data after file is handled*/
function parseSSA(data: string) { }

/** */
function handleFile(filePath: string) { }

