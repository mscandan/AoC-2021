import { data } from "./data";

export const solution = () => {
  console.log("Day 3 Part 1: ", part1(data));
  console.log("Day 3 Part 2: ", part2(data));
};

const part1 = (data: Array<string>): number => {
  let gamma = "",
    epsilon = "";
  for (let i = 0; i < data[0].length; i++) {
    const { countOfOne, countOfZero } = calculateCountsOnColumn(data, i);
    if (countOfOne > countOfZero) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (data: Array<string>): number => {
  return (
    calculateRating(data, 0, CALCULATE_FOR.O2) *
    calculateRating(data, 0, CALCULATE_FOR.CO2)
  );
};

type CountType = {
  countOfOne: number;
  countOfZero: number;
};

enum CALCULATE_FOR {
  O2 = "O2",
  CO2 = "CO2",
}

const calculateCountsOnColumn = (
  data: Array<string>,
  currIndex: number
): CountType => {
  let countOfOne = 0,
    countOfZero = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][currIndex] === "1") {
      countOfOne++;
    } else {
      countOfZero++;
    }
  }
  return { countOfOne, countOfZero };
};

const calculateRating = (
  data: Array<string>,
  currIndex: number,
  calculateFor: CALCULATE_FOR
): number => {
  if (data.length > 1) {
    const { countOfOne, countOfZero } = calculateCountsOnColumn(
      data,
      currIndex
    );
    if (countOfZero === countOfOne || countOfOne > countOfZero) {
      return calculateRating(
        data.filter((el) =>
          calculateFor === CALCULATE_FOR.O2
            ? el[currIndex] === "1"
            : el[currIndex] === "0"
        ),
        currIndex + 1,
        calculateFor
      );
    } else {
      return calculateRating(
        data.filter((el) =>
          calculateFor === CALCULATE_FOR.O2
            ? el[currIndex] === "0"
            : el[currIndex] === "1"
        ),
        currIndex + 1,
        calculateFor
      );
    }
  } else return parseInt(data[0], 2);
};
