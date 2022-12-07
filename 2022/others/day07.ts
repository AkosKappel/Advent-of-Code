interface File {
  type: 'file';
  size: number;
}

interface Directory {
  type: 'dir';
  children: Record<string, Entity>;
}

type Entity = File | Directory;

interface CommandProps {
  args: string[];
  output: string[];
}

function buildFilesystem(data: string): Directory {
  const root: Directory = {
    type: 'dir',
    children: {},
  };
  let path: string[] = [];

  function getCwd(entity: Directory, path: string[]): Directory {
    if (!path.length) return entity;
    const [dir, ...rest] = path;
    return getCwd(entity.children[dir] as Directory, rest);
  }

  function cd({ args: [destination] }: CommandProps) {
    if (destination === '/') path = [];
    else if (destination === '..') path.pop();
    else path.push(destination);
  }

  function ls({ output }: CommandProps) {
    const cwd = getCwd(root, path);

    for (const line of output) {
      if (line.startsWith('dir')) {
        const dir = line.slice(4);
        cwd.children[dir] = {
          type: 'dir',
          children: {},
        };
      } else {
        const [size, name] = line.split(' ');
        cwd.children[name] = {
          type: 'file',
          size: parseInt(size),
        };
      }
    }
  }

  for (const entry of data.split(/^\$ /gm)) {
    if (!entry) continue;

    const [input, ...output] = entry.split('\n').map(line => line.trim()).filter(Boolean);
    const [command, ...args] = input.split(' ');

    switch (command) {
      case 'cd':
        cd({ args, output });
        break;
      case 'ls':
        ls({ args, output });
        break;
    }
  }

  return root;
}

function getSize(entity: Entity): number {
  return entity.type === 'dir' ?
    Object.values(entity.children)
      .reduce((size: number, child: Entity) => size + getSize(child), 0) :
    entity.size;
}

export const part1 = (s: string) => {
  const MAX_DIR_SIZE: number = 100_000;

  const root = buildFilesystem(s.trim());
  const foundSizes: number[] = [];

  const stack: Directory[] = [root];
  while (stack.length) {
    const entity = stack.pop()!;

    let size = 0;
    for (const child of Object.values(entity.children)) {
      size += getSize(child);
      if (child.type === 'dir') stack.push(child);
    }
    if (size <= MAX_DIR_SIZE) foundSizes.push(size);
  }

  return foundSizes.reduce((a: number, b: number) => a + b, 0);
};

exports.first = part1;

export const part2 = (s: string) => {
  const TOTAL_SPACE: number = 70_000_000;
  const NEEDED_SPACE: number = 30_000_000;

  const root = buildFilesystem(s.trim());
  const used = getSize(root);
  const needToDelete = used - TOTAL_SPACE + NEEDED_SPACE;

  function recur(entity: Entity): number[] {
    if (entity.type === 'file') return [];

    const size = getSize(entity);
    const deletables = size > needToDelete ? [size] : [];

    for (const child of Object.values(entity.children)) {
      deletables.push(...recur(child));
    }
    return deletables;
  }

  return Math.min(...recur(root));
};

exports.second = part2;
