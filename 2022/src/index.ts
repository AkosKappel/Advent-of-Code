import * as fs from 'fs';
import * as https from 'https';

const cookie = `session=${fs.readFileSync(`${__dirname}/../cookie`)}`;

const year = '2022';
const day = parseInt(process.argv[2], 10);
if (Number.isNaN(day) || day < 1 || day > 25) {
  console.error('You have to choose a day between 1 and 25');
  console.error('For example: node src/index.js 1');
  process.exit(1);
}
const type = process.argv[2].slice(-1) === '+' ? 'second' : 'first';
const file = `./day${day.toString().padStart(2, '0')}.ts`;
const callback = require(file)[type];

const headers = { cookie };

const inputFile = `${__dirname}/../input/day${day
  .toString()
  .padStart(2, '0')}.in`;

try {
  const rawData = fs.readFileSync(inputFile, 'utf8');
  console.log(callback(rawData));
} catch (e) {
  https.get(
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers },
    (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        fs.writeFileSync(inputFile, rawData);
        console.log('File written');
        console.log(callback(rawData));
      });
    },
  );
}
