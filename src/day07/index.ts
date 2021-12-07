import { data } from './data';

export const solution = () => {
  console.log('Day 7 Part 1: ', part1_2(data, false));
  console.log('Day 7 Part 2: ', part1_2(data, true));
};

const part1_2 = (data: string, isPartTwo: boolean): number => {
  const dataArr = data
    .split(',')
    .map(el => parseInt(el))
    .sort((a, b) => a - b);

  let min = dataArr[0];
  let max = dataArr[dataArr.length - 1];

  const distances: Array<number> = [];
  for (let poss = min; poss < max; poss++) {
    let neededFuel = 0;
    dataArr.forEach(el => {
      let distance = Math.abs(el - poss);
      neededFuel += isPartTwo ? calcNeededFuel(distance) : distance;
    });
    distances.push(neededFuel);
  }
  distances.sort((a, b) => a - b);
  return distances[0];
};

const calcNeededFuel = (distance: number): number => {
  let needed = 0;
  for (let i = 1; i <= distance; i++) {
    needed += i;
  }
  return needed;
};

solution();
