import { readFile } from "fs/promises";
import path from "path";

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

const parseInput = (input) =>
  input
    .toString()
    .split("\n")
    .map((m) => +m);

const puzzle1 = (measurements) =>
  measurements.reduce(
    (acc, cur, ind, arr) => acc + (ind > 0 && cur > arr[ind - 1] ? 1 : 0),
    0
  );

const puzzle2 = (measurements) =>
  measurements.reduce(
    (acc, cur, ind, arr) =>
      acc +
      (ind > 0 &&
      arr[ind] + arr[ind + 1] + arr[ind + 2] > arr[ind - 1] + cur + arr[ind + 1]
        ? 1
        : 0),
    0
  );

async function main() {
  const input = await readInput();
  const parsedMeasurements = parseInput(input);

  console.log("Puzzle 1 solution:", puzzle1(parsedMeasurements));
  console.log("Puzzle 2 solution:", puzzle2(parsedMeasurements));
}

await main();
