import { readFile } from "fs/promises";
import path from "path";

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");

const parseInput = (input) => input.toString().split("\n");

const puzzle1 = (measurements) =>
  measurements
    .reduce(
      (acc, cur) => cur.split("").map((n, i) => (!!+n ? 1 : -1) + acc[i]),
      measurements[0].split("").fill(0)
    )
    .reduce(
      (acc, cur) => {
        if (cur > 0) {
          acc[0] += "1";
          acc[1] += "0";
        } else {
          acc[0] += "0";
          acc[1] += "1";
        }
        return acc;
      },
      ["", ""]
    )
    .reduce((a, b) => Number.parseInt(a, 2) * Number.parseInt(b, 2));

const puzzle2 = (measurements) => {
  const diagnostic = (measurements, i, compare) => {
    const o = measurements
      .reduce(
        (acc, cur) => {
          acc[cur[i]].push(cur);
          return acc;
        },
        [[], []]
      )
      .reduce(compare);
    if (o.length > 1) {
      return diagnostic(o, ++i, compare);
    }
    return o;
  };
  return [
    diagnostic(measurements, 0, (a, b) => (a.length > b.length ? a : b)),
    diagnostic(measurements, 0, (a, b) => (a.length > b.length ? b : a)),
  ].reduce((a, b) => Number.parseInt(a, 2) * Number.parseInt(b, 2));
};

async function main() {
  const input = await readInput();
  const measurements = parseInput(input);

  console.log("Puzzle 1 solution:", puzzle1(measurements));
  console.log("Puzzle 2 solution:", puzzle2(measurements));
}

await main();
