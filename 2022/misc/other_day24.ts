const blizzardMovement: { [dir: string]: number[] } = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

interface Solution {
  blizzardMap: string[][];
  steps: number;
}

const humanMovements = [[0, 0], ...Object.values(blizzardMovement)];

function isPositionOutOfBounds(row: number, col: number, grid: string[][]) {
  return row < 0 || row > grid.length - 1 || col < 0 || col > grid[0].length - 1;
}

function wrapAroundGridIfNeeded(row: number, col: number, grid: string[][]) {
  if (!isPositionOutOfBounds(row, col, grid)) {
    return [row, col];
  }
  let newRow = row;
  let newCol = col;
  if (row < 0) {
    newRow = grid.length - 1;
  }
  if (row > grid.length - 1) {
    newRow = 0;
  }
  if (col < 0) {
    newCol = grid[0].length - 1;
  }
  if (col > grid[0].length - 1) {
    newCol = 0;
  }

  return [newRow, newCol];
}

function destinationReached(currentPosition: number[], destinationPosition: number[]) {
  return (
    currentPosition[0] == destinationPosition[0] && currentPosition[1] == destinationPosition[1]
  );
}

function getNextBlizzardPosition(
  blizzardMap: string[][],
  startRow: number,
  startCol: number,
  direction: string,
) {
  const movement = blizzardMovement[direction];
  let newRow = startRow;
  let newCol = startCol;
  do {
    const newPosition = wrapAroundGridIfNeeded(
      newRow + movement[0],
      newCol + movement[1],
      blizzardMap,
    );
    newRow = newPosition[0];
    newCol = newPosition[1];
  } while (blizzardMap[newRow][newCol] == '#');
  return [newRow, newCol];
}

function moveBlizzard(blizzardMap: string[][]): string[][] {
  const newBlizzardMap = blizzardMap.map(row => new Array(row.length).fill([]));

  for (let row = 0; row < blizzardMap.length; row++) {
    for (let col = 0; col < blizzardMap[0].length; col++) {
      const blizzardsAtCurrentPosition = blizzardMap[row][col];
      for (let blizzard of blizzardsAtCurrentPosition) {
        if (blizzard == '#') {
          newBlizzardMap[row][col] = ['#'];
        } else {
          const nextPosition = getNextBlizzardPosition(blizzardMap, row, col, blizzard);
          newBlizzardMap[nextPosition[0]][nextPosition[1]] = [
            ...newBlizzardMap[nextPosition[0]][nextPosition[1]],
            blizzard,
          ];
        }
      }
    }
  }
  return newBlizzardMap;
}

function getNextPositionsForHuman(blizzardMap: string[][], currentPosition: number[]) {
  const nextPositions = [];

  for (let movement of humanMovements) {
    const newRowPosition = currentPosition[0] + movement[0];
    const newColPosition = currentPosition[1] + movement[1];

    const isNextPositionOutOfBounds = isPositionOutOfBounds(
      newRowPosition,
      newColPosition,
      blizzardMap,
    );
    if (isNextPositionOutOfBounds) {
      continue;
    }

    // This will be empty array if its an open spot
    if (blizzardMap[newRowPosition][newColPosition].length > 0) {
      continue;
    }

    nextPositions.push([newRowPosition, newColPosition]);
  }

  return nextPositions;
}

function solve(
  blizzardMap: string[][],
  startPosition: number[],
  destinationPosition: number[],
): Solution {
  let currentPositions = [[...startPosition]];

  let steps = 0;
  let searching = true;

  loop: while (searching) {
    steps++;
    const deDupePositions = blizzardMap.map(row => new Array(row.length).fill(false));

    blizzardMap = moveBlizzard(blizzardMap);

    const newPositions = [];
    for (let currentPosition of currentPositions) {
      const nextPositions = getNextPositionsForHuman(blizzardMap, currentPosition);

      if (nextPositions.length !== 0) {
        for (let nextPosition of nextPositions) {
          deDupePositions[nextPosition[0]][nextPosition[1]] = true;
        }
      }
    }
    for (let row = 0; row < blizzardMap.length; row++) {
      for (let col = 0; col < blizzardMap[0].length; col++) {
        const newPosition = [row, col];
        if (deDupePositions[row][col]) {
          if (destinationReached(newPosition, destinationPosition)) {
            searching = false;
            break loop;
          }
          newPositions.push(newPosition);
        }
      }
    }

    currentPositions = newPositions;
  }

  return {
    steps,
    blizzardMap,
  };
}

const parse = (s: string) => {
  const lines = s.trim().split('\n');
  const grid = lines.map(line => line.split('').map(value => (value == '.' ? '' : value)));

  const start: number[] = [0, lines[0].indexOf('.')];
  const end: number[] = [grid.length - 1, lines[grid.length - 1].lastIndexOf('.')];

  return { grid, start, end };
};

const part1 = (s: string): number => {
  const { grid, start, end } = parse(s);
  const { steps } = solve(grid, start, end)!;
  return steps;
};

const part2 = (s: string): number => {
  const { grid, start, end } = parse(s);
  let blizzardMap = grid;

  const path1 = solve(blizzardMap, start, end)!;
  blizzardMap = path1.blizzardMap;

  const path2 = solve(blizzardMap, end, start)!;
  blizzardMap = path2.blizzardMap;

  const path3 = solve(blizzardMap, start, end)!;

  return path1.steps + path2.steps + path3.steps;
};
