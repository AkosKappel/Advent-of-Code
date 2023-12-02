const parse = (games) => games.trim()
  .split('\n')
  .map(game => {
    const [gameNumber, ...gameHistory] = game.split(':');
    return {
      id: parseInt(gameNumber.replace('Game', '').trim()),
      sets: gameHistory.flatMap(line => line.split(';')
        .map(round => ({
            red: parseInt((/(\d+) red/.exec(round) || [0, 0])[1], 10),
            blue: parseInt((/(\d+) blue/.exec(round) || [0, 0])[1], 10),
            green: parseInt((/(\d+) green/.exec(round) || [0, 0])[1], 10),
          }),
        )),
    };
  });

const part1 = (input) => {
  const bag = { red: 12, green: 13, blue: 14 };
  const allGames = parse(input);
  const validGames = allGames.filter(game =>
    game.sets.every(set =>
      set.red <= bag.red &&
      set.green <= bag.green &&
      set.blue <= bag.blue,
    ),
  );
  return validGames.reduce((acc, game) => acc + game.id, 0);
};

const part2 = (input) => parse(input)
  .map(game =>
    game.sets.reduce((acc, set) => ({
      red: Math.max(acc.red, set.red),
      green: Math.max(acc.green, set.green),
      blue: Math.max(acc.blue, set.blue),
    }), { red: 0, green: 0, blue: 0 }),
  )
  .reduce((acc, game) => acc + game.red * game.green * game.blue, 0);

module.exports = { part1, part2 };
