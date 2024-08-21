/** Function that parses .srt data after file is handled*/
function parseSRT(data: string) {
  const subs = data.split("\n\n");
  return subs.map((subs) => {
    const splits = subs.split("\n");
    const line = splits[0];
    const time = splits[1].split("-->");
    const start = time[0];
    const end = time[1];
    const text = splits.slice(2).join();

    return { line, start, end, text };
  });
}

/** Function that parses .ass data after file is handled*/
function parseASS(data: string) { }

/** Function that parses .ssa data after file is handled*/
function parseSSA(data: string) { }

/** */
function handleFile(filePath: string) { }

module.exports = {
  parseSRT,
  handleFile,
};
