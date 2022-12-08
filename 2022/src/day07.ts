const MAX_DIR_SIZE: number = 100_000;

const TOTAL_SPACE: number = 70_000_000;
const NEEDED_SPACE: number = 30_000_000;

const ROOT: string = '/';

const getFoldersSize = (s: string) => {
  const path: string[] = [];
  const folders: { [key: string]: number } = {};

  s.trim().split('\n').forEach(line => {
    if (line.startsWith('$ cd ..')) { // go up a folder
      path.pop();
    } else if (line.startsWith('$ cd ')) { // go down a folder
      path.push(line.trim().slice(5));
    } else if (line.startsWith('$ ls')) { // list files and folders
      // pass
    } else if (line.startsWith('dir ')) { // folder
      // pass
    } else { // file
      const [size, name] = line.split(' ');
      for (let i = 0; i < path.length; i++) {
        const folder = path.slice(0, i + 1).join('/');
        folders[folder] = (folders[folder] || 0) + parseInt(size);
      }
    }
  });

  return folders;
};

export const part1 = (s: string): number => Object
  .values(getFoldersSize(s))
  .filter(size => size <= MAX_DIR_SIZE)
  .reduce((a: number, b: number) => a + b, 0);

exports.first = part1;

export const part2 = (s: string): number => {
  const folders = getFoldersSize(s);
  const FREE_SPACE: number = TOTAL_SPACE - folders[ROOT];
  return Object
    .values(folders)
    .filter(size => size + FREE_SPACE >= NEEDED_SPACE)
    .reduce((a: number, b: number) => a < b ? a : b, Infinity);
};

exports.second = part2;
