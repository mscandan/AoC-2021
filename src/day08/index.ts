import { data } from './data';

export const solution = () => {
  console.log('Day 8 Part 1: ', part1(data));
  console.log('Day 8 Part 2: ', part2(data));
};

const part1 = (data: Array<string>): number => {
  const output: Array<Array<string>> = [];
  data.forEach(line => {
    const outputInLine = line
      .split('|')
      .map(el => el.trim())
      .map(el => el.split(' '))[1];
    output.push(outputInLine);
  });
  const wantedOutputLenghts = [2, 4, 3, 7];
  let totalAppearances = 0;
  output.forEach(line =>
    line.forEach(opt => {
      if (wantedOutputLenghts.includes(opt.length)) {
        totalAppearances++;
      }
    }),
  );
  return totalAppearances;
};

/*
  acedgfb: 8
  cdfbe: 5
  gcdfa: 2
  fbcad: 3
  dab: 7
  cefabd: 9
  cdfgeb: 6
  eafb: 4
  cagedb: 0
  ab: 1
*/

const part2 = (data: Array<string>): number => {
  const map = new Map();
  ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'].forEach((item, idx) =>
    map.set(item, idx),
  );
  let sum = 0;
  data.forEach(line => {
    const [digits, outputs] = line.split(' | ');
    const splittedDigits = digits.split(' ');
    const splittedOutputs = outputs.split(' ');
    const one = (splittedDigits.find(num => num.length === 2) as string).split('');
    const four = (splittedDigits.find(num => num.length === 4) as string).split('');
    const seven = (splittedDigits.find(num => num.length === 3) as string).split('');
    const a = seven.find(ltr => !one.includes(ltr)) as string;
    const three = (
      splittedDigits.find(num => {
        return num.length === 5 && one.every(constter => num.includes(constter));
      }) as string
    ).split('');
    const d = three.find(constter => {
      return !one.includes(constter) && four.includes(constter);
    }) as string;
    const g = three.find(constter => {
      return !one.includes(constter) && constter !== a && constter !== d;
    }) as string;
    const six = (
      splittedDigits.find(signals => {
        return signals.length === 6 && !one.every(constter => signals.includes(constter));
      }) as string
    ).split('');
    const f = one.find(constter => six.includes(constter)) as string;
    const c = one.find(constter => !six.includes(constter)) as string;
    const five = (
      splittedDigits.find(signals => {
        return (
          signals.length === 5 &&
          signals.includes(a) &&
          signals.includes(d) &&
          signals.includes(f) &&
          signals.includes(g) &&
          !signals.includes(c)
        );
      }) as string
    ).split('');
    const b = five.find(constter => {
      return ![a, d, f, g].includes(constter);
    }) as string;
    const two = (
      splittedDigits.find(signals => {
        return (
          signals.length === 5 &&
          signals.includes(a) &&
          signals.includes(c) &&
          signals.includes(d) &&
          signals.includes(g) &&
          !signals.includes(f)
        );
      }) as string
    ).split('');
    const e = two.find(constter => {
      return ![a, c, d, g].includes(constter);
    }) as string;
    let correctMap: { [key: string]: string } = {};
    correctMap[a] = 'a';
    correctMap[b] = 'b';
    correctMap[c] = 'c';
    correctMap[d] = 'd';
    correctMap[e] = 'e';
    correctMap[f] = 'f';
    correctMap[g] = 'g';
    const corrected = splittedOutputs.map(val => {
      return val
        .split('')
        .map(el => correctMap[el])
        .join('');
    });
    const sorted = corrected.map(el => sortString(el));
    let digital = '';
    sorted.forEach(el => {
      digital += String(map.get(el) as number);
    });
    sum += parseInt(digital);
  });

  return sum;
};

const sortString = (toSort: string): string => {
  return toSort
    .split('')
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('');
};
