import { readFileSync } from 'fs';

export const solution = () => {
  const input: Array<Array<number>> = readFileSync('src/day09/input.txt')
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split('').map(num => parseInt(num)));

  console.log('Day 9 Part 1: ', part1(input));
};

const part1 = (data: Array<Array<number>>) => {
  let riskLevel = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      const height = data[i][j];
      const neighbors = findNeighbors(data, i, j);
      if (neighbors.every(neighbor => neighbor > height)) riskLevel += height + 1;
    }
  }
  return riskLevel;
};

const findNeighbors = (data: Array<Array<number>>, i: number, j: number) => {
  if (i === 0 && j === 0) {
    return [data[0][1], data[1][0]];
  }
  if (i === data.length - 1 && j === data[0].length - 1) {
    return [data[i][j - 1], data[i - 1][j]];
  }
  if (i === 0 && j === data[0].length - 1) {
    return [data[i][j - 1], data[i + 1][j]];
  }
  if (i === data.length - 1 && j === 0) {
    return [data[i - 1][j], data[i][j + 2]];
  }
  if (i === 0) {
    return [data[i][j - 1], data[i][j + 1], data[i + 1][j]];
  }
  if (i === data.length - 1) {
    return [data[i][j - 1], data[i][j + 1], data[i - 1][j]];
  }
  if (j === 0) {
    return [data[i - 1][j], data[i + 1][j], data[i][j + 1]];
  }
  if (j === data[0].length - 1) {
    return [data[i - 1][j], data[i + 1][j], data[i][j - 1]];
  }
  return [data[i][j - 1], data[i][j + 1], data[i + 1][j], data[i - 1][j]];
};
