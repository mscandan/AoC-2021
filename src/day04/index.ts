import { readFileSync } from "fs";
import { range, sum } from "../helpers";

type Row = Array<number | null>;
type Board = Array<Row>;

const filterBoard = (board: Board, draw: number): Board =>
  board.map((row) => row.map((n) => (n !== draw ? n : null)));

const cardComplete = (card: Board): boolean => {
  const complete = (xs: Row) => xs.every((x) => x === null);
  const rowComplete = card.some((r) => complete(r));
  const colComplete = range(0, card.length)
    .map((c) => card.map((l) => l[c]))
    .some((c) => complete(c));
  return rowComplete || colComplete;
};

const scoreBoard = (board: Board, draw: number): number =>
  draw * sum(board.flat().filter((n) => n !== null) as number[]);

const input = readFileSync("src/day04/data").toString().split("\n\n");
const drawn = input[0].split(",").map((n) => parseInt(n));
const cards: Board[] = input.slice(1).map((b) =>
  b.split("\n").map((l) =>
    l
      .split(" ")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n))
  )
);

const results: number[] = [];
for (const d of drawn) {
  for (let i = 0; i < cards.length; i++) {
    cards[i] = filterBoard(cards[i], d);
    if (cardComplete(cards[i])) {
      results.push(scoreBoard(cards[i], d));
      cards.splice(i, 1);
      i -= 1;
    }
  }
}

export const solution = () => {
  console.log("Day 4 Part 1:", results[0]);
  console.log("Day 4 Part 2:", results[results.length - 1]);
};
