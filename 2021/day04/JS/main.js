import { readFile } from "fs/promises";
import path from "path";

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

const parseInput = (input) => input.toString().split("\n");

const isWinning = (board) =>
  board.map((r) =>
    r.reduce((acc, cur) => acc && (cur > 0 ? false : true), true)
  );

const mark = (board, num) =>
  board.map((r) => r.map((n) => n * (n === num ? -1 : 1)));

const puzzle1 = (bingo) => {
  const numbers = bingo
    .shift()
    .split(",")
    .map((n) => +n);

  bingo.shift(); // remove empty line

  let boardIndex = 0;
  const boards = [[]];
  bingo.forEach((row) => {
    if (row === "") {
      boardIndex++;
      boards[boardIndex] = [];
      return;
    }
    boards[boardIndex] = [
      ...boards[boardIndex],
      row
        .split(/\s+/)
        .filter(Boolean)
        .map((n) => +n),
    ];
  });

  for (const number of numbers) {
    for (let i = 0; i < boards.length; i++) {
      let b = boards[i];
      b = mark(b, number);
      boards[i] = b;
      const w = isWinning(b);
      if (w.includes(true)) {
        return (
          b
            .map((r) => r.reduce((acc, cur) => (cur > 0 ? acc + cur : acc), 0))
            .reduce((a, b) => a + b, 0) * number
        );
      }
    }
  }
};

async function main() {
  const input = await readInput();
  const bingo = parseInput(input);

  console.log("Puzzle 1 solution:", puzzle1([...bingo]));
}

await main();
