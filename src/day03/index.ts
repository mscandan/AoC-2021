import { data } from "./data";

export const solution = () => {
  console.log("Day 3 Part 1: ", part1(data));
  console.log("Day 3 Part 2: ", part2(data));
};

const part1 = (data: Array<string>): number => {
  let gamma = "",
    epsilon = "";
  for (let i = 0; i < data[0].length; i++) {
    let oneCount = 0,
      zeroCount = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j][i] === "1") {
        oneCount++;
      } else {
        zeroCount++;
      }
    }
    if (oneCount > zeroCount) {
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
  let o2Rating: Array<string> = JSON.parse(JSON.stringify(data));
  let co2Rating: Array<string> = JSON.parse(JSON.stringify(data));

  let index = 0;
  while (index <= 11) {
    if (o2Rating.length > 1) {
      let zeroCount = 0,
        oneCount = 0;
      for (let i = 0; i < o2Rating.length; i++) {
        if (o2Rating[i][index] === "1") oneCount++;
        else zeroCount++;
      }
      if (oneCount > zeroCount || oneCount === zeroCount) {
        o2Rating = o2Rating.filter((el) => el[index] === "1");
      } else o2Rating = o2Rating.filter((el) => el[index] === "0");
      index++;
    } else break;
  }

  index = 0;
  while (index <= 11) {
    if (co2Rating.length > 1) {
      let zeroCount = 0,
        oneCount = 0;
      for (let i = 0; i < co2Rating.length; i++) {
        if (co2Rating[i][index] === "1") oneCount++;
        else zeroCount++;
      }
      if (oneCount > zeroCount || oneCount === zeroCount) {
        co2Rating = co2Rating.filter((el) => el[index] === "0");
      } else co2Rating = co2Rating.filter((el) => el[index] === "1");
      index++;
    } else break;
  }

  return parseInt(o2Rating[0], 2) * parseInt(co2Rating[0], 2);
};
