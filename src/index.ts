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

/** Function that parses .ssa data after file is handled*/
function parseSSA(data: string) {
  const subs = data.split("\n");
  const events = subs[2];

  //Remove format line and isolate dialogue lines.
  for (let i = 0; i < events.length; i++) {
    const line = events[i].trim();

    if (line.startsWith("Format:")) {
      continue;
    }

    //Remove the Dialogue: poriton and split up the data
    const dialogueLine = line.replace("Dialogue:", "").split(",");



  }
}

/** Function that parses .ass data after file is handled*/
function parseASS(data: string) {}

/** */
function parseSubtitle(name: string, content: string) {
  if (name.endsWith(".srt")) {
    return parseSRT(content);
  } else if (name.endsWith(".ass")) {
    return parseSSA(content);
  } else if (name.endsWith(".ssa")) {
    return parseASS(content);
  } else {
    throw new Error(`Unsupported file format: ${name}`);
  }
}
