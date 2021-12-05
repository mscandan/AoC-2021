import { stringify } from 'querystring';
import { data } from './data';

export const solution = () => {
  console.log('Day 5 Part 1: ', part1_2(data, '1'));
  console.log('Day 5 Part 2: ', part1_2(data, '2'));
};

const part1_2 = (data: Array<string>, part: '1' | '2') => {
  const seens = new Map();
  const pairs: Array<Array<number>> = [];
  for (let i = 0; i < data.length; i++) {
    const [x1, y1] = data[i].split('->')[0].trim().split(',');
    const [x2, y2] = data[i].split('->')[1].trim().split(',');
    pairs.push([Number(x1), Number(y1), Number(x2), Number(y2)]);
  }
  for (let i = 0; i < pairs.length; i++) {
    // x1 = x2
    if (pairs[i][0] === pairs[i][2]) {
      if (pairs[i][1] < pairs[i][3]) {
        let start = pairs[i][1];
        while (start <= pairs[i][3]) {
          if (seens.has(`${pairs[i][0]},${start}`)) {
            const val = seens.get(`${pairs[i][0]},${start}`);
            seens.set(`${pairs[i][0]},${start}`, val + 1);
          } else {
            seens.set(`${pairs[i][0]},${start}`, 1);
          }
          start++;
        }
      } else {
        let start = pairs[i][3];
        while (start <= pairs[i][1]) {
          if (seens.has(`${pairs[i][0]},${start}`)) {
            const val = seens.get(`${pairs[i][0]},${start}`);
            seens.set(`${pairs[i][0]},${start}`, val + 1);
          } else {
            seens.set(`${pairs[i][0]},${start}`, 1);
          }
          start++;
        }
      }
    }
    // y1 = y2
    else if (pairs[i][1] === pairs[i][3]) {
      if (pairs[i][0] < pairs[i][2]) {
        let start = pairs[i][0];
        while (start <= pairs[i][2]) {
          if (seens.has(`${start},${pairs[i][1]}`)) {
            const val = seens.get(`${start},${pairs[i][1]}`);
            seens.set(`${start},${pairs[i][1]}`, val + 1);
          } else {
            seens.set(`${start},${pairs[i][1]}`, 1);
          }
          start++;
        }
      } else {
        let start = pairs[i][2];
        while (start <= pairs[i][0]) {
          if (seens.has(`${start},${pairs[i][1]}`)) {
            const val = seens.get(`${start},${pairs[i][1]}`);
            seens.set(`${start},${pairs[i][1]}`, val + 1);
          } else {
            seens.set(`${start},${pairs[i][1]}`, 1);
          }
          start++;
        }
      }
    } else {
      if (part === '2') {
        // create a equation for diagonal line
        const [x1, y1, x2, y2] = pairs[i];
        // (y - y1)/(y2 - y1) = (x-x1)/(x2-x1)
        if (y1 < y2) {
          if (x1 < x2) {
            for (let i = y1; i <= y2; i++) {
              for (let j = x1; j <= x2; j++) {
                if ((i - y1) / (y2 - y1) === (j - x1) / (x2 - x1)) {
                  if (seens.has(`${j},${i}`)) {
                    const val = seens.get(`${j},${i}`);
                    seens.set(`${j},${i}`, val + 1);
                  } else {
                    seens.set(`${j},${i}`, 1);
                  }
                }
              }
            }
          } else {
            for (let i = y1; i <= y2; i++) {
              for (let j = x2; j <= x1; j++) {
                if ((i - y1) / (y2 - y1) === (j - x1) / (x2 - x1)) {
                  if (seens.has(`${j},${i}`)) {
                    const val = seens.get(`${j},${i}`);
                    seens.set(`${j},${i}`, val + 1);
                  } else {
                    seens.set(`${j},${i}`, 1);
                  }
                }
              }
            }
          }
        } else {
          if (x1 < x2) {
            for (let i = y2; i <= y1; i++) {
              for (let j = x1; j <= x2; j++) {
                if ((i - y1) / (y2 - y1) === (j - x1) / (x2 - x1)) {
                  if (seens.has(`${j},${i}`)) {
                    const val = seens.get(`${j},${i}`);
                    seens.set(`${j},${i}`, val + 1);
                  } else {
                    seens.set(`${j},${i}`, 1);
                  }
                }
              }
            }
          } else {
            for (let i = y2; i <= y1; i++) {
              for (let j = x2; j <= x1; j++) {
                if ((i - y1) / (y2 - y1) === (j - x1) / (x2 - x1)) {
                  if (seens.has(`${j},${i}`)) {
                    const val = seens.get(`${j},${i}`);
                    seens.set(`${j},${i}`, val + 1);
                  } else {
                    seens.set(`${j},${i}`, 1);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  let ans = 0;
  seens.forEach(val => val > 1 && ans++);
  return ans;
};
