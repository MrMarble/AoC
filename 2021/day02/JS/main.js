import { readFile } from "fs/promises";
import path from "path";

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

const parseInput = (input) =>
  input
    .toString()
    .split("\n")
    .map((m) => m.split(" "));

const puzzle1 = (measurements) =>
  measurements
    .reduce(
      (acc, cur) => {
        if (cur[0] === "forward") {
          acc[0] += +cur[1];
        } else if (cur[0] === "up") {
          acc[1] -= +cur[1];
        } else {
          acc[1] += +cur[1];
        }
        return acc;
      },
      [0, 0]
    )
    .reduce((a, b) => a * b);

const puzzle2 = (measurements) =>
  measurements
    .reduce(
      (acc, [movement, amount]) => {
        if (movement === "forward") {
          acc[0] += +amount; // horizontal
          acc[1] += acc[2] * +amount; // depth
        } else if (movement === "up") {
          acc[2] -= +amount; // aim
        } else {
          acc[2] += +amount; // aim
        }
        return acc;
      },
      [0, 0, 0] // horizontal, depth, aim
    )
    .slice(0, 2)
    .reduce((a, b) => a * b);

async function main() {
  const input = await readInput();
  const movements = parseInput(input);

  console.log("Puzzle 1 solution:", puzzle1(movements));
  console.log("Puzzle 2 solution:", puzzle2(movements));
}

await main();
