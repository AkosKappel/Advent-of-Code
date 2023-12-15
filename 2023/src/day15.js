// HASH:
// Determine the ASCII code for the current character of the string.
// Increase the current value by the ASCII code you just determined.
// Set the current value to itself multiplied by 17.
// Set the current value to the remainder of dividing itself by 256.
const hash = (str) => str
  .split('')
  .map(c => c.charCodeAt(0))
  .reduce((h, c) => ((h + c) * 17) % 256, 0);

const part1 = (input) => input
  .split(',')
  .map(hash)
  .reduce((a, b) => a + b);

const part2 = (input) => {
  const sequence = input.split(',');
  const boxes = Array(256).fill(0).map(val => []);

  for (const step of sequence) {
    if (step.endsWith('-')) {
      const lens = step.slice(0, -1);
      const id = hash(lens);
      // remove lens from boxes[id] if it is in there
      const index = boxes[id].findIndex(([l]) => l === lens);
      if (index > -1) {
        boxes[id].splice(index, 1);
      }
    } else if (/(=\d+)$/.test(step)) {
      const [lens, focalLength] = step.split('=');
      const id = hash(lens);
      // add lens to boxes[id] if it is not in there or replace it if it is already in there
      const index = boxes[id].findIndex(([l]) => l === lens);
      if (index > -1) {
        boxes[id][index] = [lens, focalLength];
      } else {
        boxes[id].push([lens, focalLength]);
      }
    }
  }

  // calculate focusing power
  return boxes.reduce((acc, box, boxNumber) => {
    return acc + box.reduce((power, lens, slotNumber) => {
      return power + (boxNumber + 1) * (slotNumber + 1) * lens[1];
    }, 0);
  }, 0);
};

module.exports = { part1, part2 };
