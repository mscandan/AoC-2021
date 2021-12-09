import { readFileSync } from 'fs';

export const solution = () => {
  const input = readFileSync('src/day09/input.txt')
    .toString()
    .trim()
    .split('\n')
    .map(l => l.split('').map(num => parseInt(num)));
  console.log('Day 9 Part 1:', part1(input));
  console.log('Day 9 Part 2:', part2(input));
};

const part1 = (input: number[][]): number => {
  let lowPoints = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const point = input[i][j];
      const neighbours = getNeighbours(j, i, input);
      const isLowpoint = neighbours.every(p => p === null || p > point);
      if (isLowpoint) {
        lowPoints += point + 1;
      }
    }
  }

  return lowPoints;
};

const getNeighbours = (
  x: number,
  y: number,
  map: number[][],
): [north: number | null, east: number | null, south: number | null, west: number | null] => {
  return [map[y - 1]?.[x] ?? null, map[y]?.[x + 1] ?? null, map[y + 1]?.[x] ?? null, map[y]?.[x - 1] ?? null];
};

const part2 = (input: number[][]): number => {
  let visited = new Set<string>();
  const basins: Set<string>[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (visited.has(`${x},${y}`) || input[y][x] === 9) {
        continue;
      }
      const newVisitedLocations = mapBasin(x, y, input);
      basins.push(newVisitedLocations);
      visited = new Set([...visited, ...newVisitedLocations]);
    }
  }
  return basins
    .sort((a, b) => b.size - a.size)
    .splice(0, 3)
    .reduce((pre, curr) => {
      return pre * curr.size;
    }, 1);
};

function mapBasin(x: number, y: number, map: number[][]): Set<string> {
  let visited = new Set<string>();
  visit(x, y, map, visited);
  return visited;
}

const visit = (x: number, y: number, map: number[][], visited: Set<string>) => {
  visited.add(`${x},${y}`);
  const [north, east, south, west] = getNeighbours(x, y, map);
  if (north !== null && north !== 9 && !visited.has(`${x},${y - 1}`)) {
    visit(x, y - 1, map, visited);
  }
  if (east !== null && east !== 9 && !visited.has(`${x + 1},${y}`)) {
    visit(x + 1, y, map, visited);
  }
  if (south !== null && south !== 9 && !visited.has(`${x},${y + 1}`)) {
    visit(x, y + 1, map, visited);
  }
  if (west !== null && west !== 9 && !visited.has(`${x - 1},${y}`)) {
    visit(x - 1, y, map, visited);
  }
};
