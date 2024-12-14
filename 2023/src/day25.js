const parse = (input) => {
  const lines = input.trim().split('\n');
  const nodes = new Set();
  const edges = new Map();

  // First collect all nodes
  lines.forEach(line => {
    const [node, neighbors] = line.split(': ');
    nodes.add(node);
    neighbors.split(' ').forEach(neighbor => nodes.add(neighbor));
  });

  // Initialize adjacency map for all nodes
  nodes.forEach(node => {
    edges.set(node, new Map());
  });

  // Add edges with weights
  lines.forEach(line => {
    const [node, neighbors] = line.split(': ');
    neighbors.split(' ').forEach(neighbor => {
      edges.get(node).set(neighbor, 1);
      edges.get(neighbor).set(node, 1);
    });
  });

  return { nodes: Array.from(nodes), edges };
};

// Find the minimum cut phase using the maximum adjacency search
const minimumCutPhase = (graph, nodes) => {
  const weights = new Map();
  const added = new Set();
  let s = null, t = null;

  // Initialize weights for the first node
  const first = nodes[0];
  nodes.forEach(node => weights.set(node, graph.get(first).get(node) || 0));
  added.add(first);

  // Find s,t-ordering by repeatedly adding the most tightly connected vertex
  while (added.size < nodes.length) {
    // Find the most tightly connected vertex not yet added
    let maxWeight = -1;
    let maxNode = null;

    nodes.forEach(node => {
      if (!added.has(node) && weights.get(node) > maxWeight) {
        maxWeight = weights.get(node);
        maxNode = node;
      }
    });

    s = t;
    t = maxNode;
    added.add(maxNode);

    // Update weights for remaining vertices
    nodes.forEach(node => {
      if (!added.has(node)) {
        weights.set(node, weights.get(node) + (graph.get(maxNode).get(node) || 0));
      }
    });
  }

  return { s, t, cutWeight: weights.get(t) };
};

// Merge two vertices in the graph
const mergeVertices = (graph, nodes, v1, v2) => {
  // Add v2's edges to v1
  graph.get(v2).forEach((weight, neighbor) => {
    if (neighbor !== v1) {
      graph.get(v1).set(neighbor, (graph.get(v1).get(neighbor) || 0) + weight);
      graph.get(neighbor).set(v1, (graph.get(neighbor).get(v1) || 0) + weight);
    }
  });

  // Remove v2's edges and vertex
  graph.get(v2).forEach((_, neighbor) => {
    graph.get(neighbor).delete(v2);
  });
  graph.delete(v2);

  // Update nodes list
  return nodes.filter(n => n !== v2);
};

// Find connected components after removing nodes
const findComponents = (graph, startNode, excludedNodes) => {
  const component = new Set();
  const visited = new Set([...excludedNodes]);

  const dfs = (node) => {
    visited.add(node);
    component.add(node);

    graph.get(node).forEach((_, neighbor) => {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    });
  };

  dfs(startNode);
  return component;
};

const part1 = (input) => {
  const { nodes, edges } = parse(input);
  let minCut = Infinity;
  let bestCutNodes = null;

  // Keep track of merged vertices
  const mergeHistory = new Map();
  nodes.forEach(node => mergeHistory.set(node, [node]));

  // Run Stoer-Wagner algorithm
  let currentNodes = [...nodes];

  while (currentNodes.length > 1) {
    const { s, t, cutWeight } = minimumCutPhase(edges, currentNodes);

    if (cutWeight === 3) {
      // We found a cut of size 3, now we need to find the actual components
      const mergedIntoT = mergeHistory.get(t);
      const excludedNodes = new Set(mergedIntoT);

      // Find one component starting from any node not in the excluded set
      const startNode = nodes.find(n => !excludedNodes.has(n));
      const component1 = findComponents(edges, startNode, excludedNodes);
      const component2 = new Set(nodes.filter(n => !component1.has(n)));

      return component1.size * component2.size;
    }

    // Merge t into s
    const mergedNodesT = mergeHistory.get(t);
    const mergedNodesS = mergeHistory.get(s);
    mergeHistory.set(s, [...mergedNodesS, ...mergedNodesT]);
    mergeHistory.delete(t);

    currentNodes = mergeVertices(edges, currentNodes, s, t);

    if (cutWeight < minCut) {
      minCut = cutWeight;
      bestCutNodes = t;
    }
  }

  return null;
};

module.exports = { part1 };
