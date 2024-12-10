const parse = (input) => input
    .split('\n')
    .map(line => line.replace('~', ',').split(',').map(Number))
    .map(([a, b, c, d, e, f], index) => ({
      x: {start: a, end: d},
      y: {start: b, end: e},
      z: {start: c, end: f},
      id: index + 1,
    }));

const applyGravity = (blocks) => {
  blocks = blocks.sort((a, b) => a.z.start - b.z.start);

  for (let i = 0; i < blocks.length; i++) {
    let newBottom = 1;
    for (let j = 0; j < i; j++) {
      if (intersectsXY(blocks[i], blocks[j])) {
        newBottom = Math.max(newBottom, blocks[j].z.end + 1);
      }
    }

    const fall = blocks[i].z.start - newBottom;
    blocks[i].z.start -= fall;
    blocks[i].z.end -= fall;
  }

  return blocks;
}

const intersectsXY = (block1, block2) =>
  (block1.x.start <= block2.x.end && block1.x.end >= block2.x.start) &&
  (block1.y.start <= block2.y.end && block1.y.end >= block2.y.start);

const getSupports = (blocks) => {
  const above = new Map(blocks.map(block => [block.id, []]));
  const below = new Map(blocks.map(block => [block.id, []]));

  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[j].z.start === blocks[i].z.end + 1 && intersectsXY(blocks[i], blocks[j])) {
        above.get(blocks[i].id).push(blocks[j].id);
        below.get(blocks[j].id).push(blocks[i].id);
      }
    }
  }

  return { above, below };
}

const disintegrate = (blocks) => {
  const counts = [];

  blocks = applyGravity(blocks);
  const { above, below } = getSupports(blocks);

  for (const disintegratedBlock of blocks) {
    const queue = [disintegratedBlock.id];

    const falling = new Set();
    while (queue.length) {
      const id = queue.shift();
      falling.add(id);

      const blocksStartFalling = above.get(id)
        .filter(aboveId => below.get(aboveId).every(id => falling.has(id)))

      queue.push(...blocksStartFalling);
    }

    counts.push(falling.size - 1);
  }

  return counts;
}

const part1 = (input) => disintegrate(parse(input)).filter(n => n === 0).length;

const part2 = (input) => disintegrate(parse(input)).reduce((acc, cur) => acc + cur, 0);

module.exports = { part1, part2 };
