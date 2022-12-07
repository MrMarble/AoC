const { readFile } = require("fs").promises;
const path = require("path");

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

(async () => {
  const input = await readInput();
  const lines = input.toString().split(/\r?\n/);

  let elfs = [];
  let currentElf = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      elfs.push(currentElf);
      currentElf = 0;
      continue;
    }

    currentElf += +lines[i];
  }

  elfs = elfs.sort((a, b) => b - a);

  console.log("Star 1: ", elfs[0]);
  console.log("Star 2: ", elfs[0] + elfs[1] + elfs[2]);
})();
