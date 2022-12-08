const { readFile } = require("fs").promises;
const path = require("path");

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

(async () => {
  const input = await readInput();
  const lines = input.toString().split(/\r?\n/);

  let s1 = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line
      .substring(line.length / 2)
      .match(new RegExp(`[${line.substring(0, line.length / 2)}]`))?.[0];

    if (match) {
      const charCode = match.charCodeAt(0);
      s1 += charCode > 96 ? charCode - 96 : charCode - 38;
    }
  }

  let s2 = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const badge = lines[i]
      .split("")
      .find(
        (char) => lines[i + 1].includes(char) && lines[i + 2].includes(char)
      );

    if (badge) {
      const charCode = badge.charCodeAt(0);
      s2 += charCode > 96 ? charCode - 96 : charCode - 38;
    }
  }

  console.log("Star 1: ", s1);
  console.log("Star 2: ", s2);
})();
