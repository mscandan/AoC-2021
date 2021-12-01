import { data } from "./data";

export const solution = () => {
  console.log(part1(data));
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
