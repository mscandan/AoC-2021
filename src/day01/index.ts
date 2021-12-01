import { data } from "./data";

export const solution = () => {
  console.log("Day 1 Part 2: ", part1(data));
  console.log("Day 1 Part 2: ", part2(data));
};

const part1 = (data: Array<number>): number => {
  let incCount = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      incCount++;
    }
  }
  return incCount;
};

const part2 = (data: Array<number>): number => {
  let incCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (
      data[i] + data[i + 1] + data[i + 2] <
        data[i + 1] + data[i + 2] + data[i + 3] &&
      i + 3 <= data.length
    ) {
      incCount++;
    }
  }
  return incCount;
};
