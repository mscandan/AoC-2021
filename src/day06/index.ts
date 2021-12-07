import { data } from './data';

export const solution = () => {
  console.log('Day 6 Part 1: ', part1(data, 80));
  console.log('Day 6 Part 2: ', part2(data));
};

const part1 = (data: string, wantedDay: number): number => {
  const vals = data.split(',').map(val => Number(val));
  const news: Array<number> = [];
  let addNewFishCount = 0;
  vals.forEach(el => {
    if (el === 0) {
      addNewFishCount++;
      news.push(6);
    } else {
      news.push(--el);
    }
  });
  for (let i = 0; i < addNewFishCount; i++) {
    news.push(8);
  }
  if (wantedDay === 1) return news.length;
  else return part1(news.join(','), --wantedDay);
};

const part2 = (data: string): number => {
  const numFish = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const dataArr = data.split(',').map(el => parseInt(el));
  for (let i = 0; i < dataArr.length; i++) {
    numFish[dataArr[i]]++;
  }
  for (let i = 0; i < 256; i++) {
    const parents = numFish.shift() as number;
    numFish.push(parents);
    numFish[6] += parents;
  }
  return numFish.reduce((acc, n) => acc + n);
};
