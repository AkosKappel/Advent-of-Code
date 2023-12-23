const parse = (input) => {
  const flipFlops = {};
  const conjunctions = {};
  const graph = {};

  input.split('\n').forEach(line => {
    const [source, destinations] = line.split(' -> ');
    const moduleType = source[0];
    const moduleName = source.replace(/[%&]/, '');

    switch (moduleType) {
      case '%':
        flipFlops[moduleName] = false;
        break;
      case '&':
        conjunctions[moduleName] = {};
        break;
    }
    graph[moduleName] = destinations.split(', ');
  });

  for (const [src, destinations] of Object.entries(graph)) {
    for (const dst of destinations) {
      if (conjunctions[dst]) {
        conjunctions[dst][src] = false;
      }
    }
  }

  return { flipFlops, conjunctions, graph };
};

const propagatePulse = (graph, flipFlops, conjunctions, sender, receiver, pulse) => {
  let nextPulse;

  if (receiver in flipFlops) {
    if (pulse) return [];
    flipFlops[receiver] = !flipFlops[receiver];
    nextPulse = flipFlops[receiver];
  } else if (receiver in conjunctions) {
    conjunctions[receiver][sender] = pulse;
    const allPulses = Object.values(conjunctions[receiver]);
    nextPulse = !allPulses.every(p => p);
  } else if (receiver in graph) {
    nextPulse = pulse;
  } else {
    return [];
  }

  return graph[receiver].map(nextReceiver => ({
    sender: receiver,
    receiver: nextReceiver,
    pulse: nextPulse,
  }));
};

const pushButton = (graph, flipFlops, conjunctions) => {
  let nLow = 0, nHigh = 0;
  const queue = [{
    sender: 'button',
    receiver: 'broadcaster',
    pulse: false,
  }];

  while (queue.length) {
    const { sender, receiver, pulse } = queue.shift();
    // console.log(sender, pulse ? '-high->' : '-low->', receiver);
    pulse ? nHigh++ : nLow++;
    const next = propagatePulse(graph, flipFlops, conjunctions, sender, receiver, pulse);
    queue.push(...next);
  }

  return { nLow, nHigh };
};

const part1 = (input) => {
  const { flipFlops, conjunctions, graph } = parse(input);

  let nTotalLow = 0, nTotalHigh = 0;
  for (let i = 0; i < 1_000; i++) {
    const { nLow, nHigh } = pushButton(graph, flipFlops, conjunctions);
    nTotalLow += nLow;
    nTotalHigh += nHigh;
  }

  return nTotalLow * nTotalHigh;
};

const part2 = (input) => {
  return 0;
};

module.exports = { part1, part2 };

const example1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`.trim();
const example2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`.trim();
console.log(part1(example1));
console.log(part1(example2));
// console.log(part2(example1));
