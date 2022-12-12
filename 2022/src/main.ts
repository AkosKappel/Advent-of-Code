// TODO: try to improve this solution
// const DIRECTION: { [dir: string]: number[] } = {
//   U: [0, -1],
//   D: [0, 1],
//   L: [-1, 0],
//   R: [1, 0],
// };
//
// const ord = (c: string, start: string = 'a', offset: number = 0): number =>
//   c.charCodeAt(0) - start.charCodeAt(0) + offset;
//
// const getCoordsOf = (char: string, map: string): number[] => map
//   .split('\n').reduce((acc, line, y) => {
//     const x = line.indexOf(char);
//     return x >= 0 ? [x, y] : acc;
//   }, [0, 0]);
//
// interface Map {
//   start: number[];
//   end: number[];
//   grid: number[][];
//   height: number;
//   width: number;
// }
//
// const parse = (s: string): Map => ({
//   start: getCoordsOf('S', s),
//   end: getCoordsOf('E', s),
//   grid: s
//     .replace('S', 'a')
//     .replace('E', 'z')
//     .split('\n')
//     .map(line => line.split('').map(c => ord(c))),
//   height: s.split('\n').length,
//   width: s.split('\n')[0].length,
// });
//
// const dijkstra = (map: Map, start: number[], targetHeight: number = -1) => {
//   const [sx, sy] = start;
//   const [w, h] = [map.width, map.height];
//   const grid = map.grid;
//
//   const dist: number[][] = Array(h).fill(0).map(() => Array(w).fill(Infinity));
//   const prev = Array(h).fill(0).map(() => Array(w).fill(null));
//   const queue = [start];
//
//   dist[sy][sx] = 0;
//
//   loop: while (queue.length > 0) {
//     const [x, y] = queue.shift()!;
//     const d = dist[y][x];
//
//     for (const [dx, dy] of Object.values(DIRECTION)) {
//       const [nx, ny] = [x + dx, y + dy];
//
//       if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue; // out of bounds
//       if (grid[ny][nx] > grid[y][x] + 1) continue; // can't climb
//
//       if (d + 1 < dist[ny][nx]) {
//         dist[ny][nx] = d + 1;
//         prev[ny][nx] = [x, y];
//         queue.push([nx, ny]);
//       }
//
//       if (targetHeight > -1 && grid[ny][nx] === targetHeight) { // found target height
//         break loop;
//       }
//     }
//   }
//
//   return { dist, prev };
// };
//
// // export const part1 = (s: string): number => {
// //   const map = parse(s.trim());
// //   return dijkstra(map, map.start, map.end);
// // };
// //
// // exports.first = part1;
// //
// // export const part2 = (s: string): number => {
// //   const map = parse(s.trim());
// //   return map.grid
// //     .flatMap((line: number[], y: number) => line.map((height: number, x: number) =>
// //       height === 0 ? dijkstra(map, [x, y], map.end) : Infinity))
// //     .reduce((acc: number, d: number) => Math.min(acc, d));
// // };
// //
// // // try in reverse order (from end to start)
// // const part3 = (s: string): number => {
// //   const map = parse(s.trim());
// //   return dijkstra(map, map.end, map.end);
// // };
// //
// // exports.second = part2;
