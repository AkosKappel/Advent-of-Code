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

const part1 = (input) => parse(input, false)
  .reduce((prod, doc) => prod * Array
    .from({ length: doc.time + 1 }, (_, speed) => speed * (doc.time - speed))
    .filter(distance => distance > doc.distance).length, 1);

const solveQuadratic = (a, b, c) => {
  const delta = b * b - 4 * a * c;
  if (delta < 0) return [];
  if (delta === 0) return [-b / (2 * a)];
  return [(-b + Math.sqrt(delta)) / (2 * a), (-b - Math.sqrt(delta)) / (2 * a)];
};

const part2 = (input) => parse(input, true)
  .map(({ time, distance }) => solveQuadratic(-1, time, -distance))
  .map(([a, b]) => [Math.max(a, b), Math.min(a, b)])
  .map(([a, b]) => Math.ceil(a) - Math.floor(b) - 1)[0];

module.exports = { part1, part2 };
