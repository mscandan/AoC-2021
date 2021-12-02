import { data } from "./data";

export const solution = () => {
  console.log("Day 2 Part 1: ", part1(data));
  console.log("Day 2 Part 2: ", part2(data));
};

const part1 = (data: Array<string>): number => {
  let horizontal = 0,
    depth = 0;
  for (let i = 0; i < data.length; i++) {
    const [direction, value] = data[i].split(" ");
    switch (direction) {
      case "forward":
        horizontal += Number(value);
        break;
      case "down":
        depth += Number(value);
        break;
      default:
        depth -= Number(value);
        break;
    }
  }
  return horizontal * depth;
};

const part2 = (data: Array<string>): number => {
  let horizontal = 0,
    depth = 0,
    aim = 0;
  for (let i = 0; i < data.length; i++) {
    const [direction, value] = data[i].split(" ");
    switch (direction) {
      case "forward":
        horizontal += Number(value);
        depth += aim * Number(value);
        break;
      case "down":
        aim += Number(value);
        break;
      default:
        aim -= Number(value);
        break;
    }
  }
  return horizontal * depth;
  return 0;
};
