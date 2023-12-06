const parse = (input, withKerning) => {
  let [timesRow, distancesRow] = input.trim().split('\n');
  if (withKerning) {
    timesRow = timesRow.replace(/ +/g, '');
    distancesRow = distancesRow.replace(/ +/g, '');
  }
  const times = timesRow.match(/\d+/g).map(Number);
  const distances = distancesRow.match(/\d+/g).map(Number);
  return times.map((time, i) => ({ time, distance: distances[i] }));
};

const solve = (input, withKerning) => parse(input, withKerning)
  .reduce((prod, doc) => prod * Array
    .from({ length: doc.time + 1 }, (_, speed) => speed * (doc.time - speed))
    .filter(distance => distance > doc.distance).length, 1);

const part1 = (input) => solve(input, false);

const part2 = (input) => solve(input, true);

module.exports = { part1, part2 };
