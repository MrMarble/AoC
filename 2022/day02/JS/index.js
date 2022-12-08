const { readFile } = require("fs").promises;
const path = require("path");

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

const map = {
  "A X": [1 + 3, 3 + 0],
  "A Y": [2 + 6, 1 + 3],
  "A Z": [3 + 0, 2 + 6],
  "B X": [1 + 0, 1 + 0],
  "B Y": [2 + 3, 2 + 3],
  "B Z": [3 + 6, 3 + 6],
  "C X": [1 + 6, 2 + 0],
  "C Y": [2 + 0, 3 + 3],
  "C Z": [3 + 3, 1 + 6],
};

(async () => {
  const input = await readInput();
  const lines = input.toString().split(/\r?\n/);

  let s1 = 0;
  let s2 = 0;
  for (let i = 0; i < lines.length; i++) {
    s1 += map[lines[i]][0];
    s2 += map[lines[i]][1];
  }

  console.log("Star 1: ", s1);
  console.log("Star 2: ", s2);
})();
