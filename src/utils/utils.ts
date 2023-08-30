import { Game } from '../api/freeToPlayApi';

// Подготовить данные для virtualized листа, нужно сделать массив строк, внутри которого уже массив карточек игр
export const getRowsByGames = (games: Game[], rowItemsCount: number) => {
  const gamesInit = games.slice();
  const result: { id: string; games: Game[] }[] = [];

  while (gamesInit.length > 0) {
    const partGames = gamesInit.splice(
      0,
      gamesInit.length < rowItemsCount ? gamesInit.length : rowItemsCount,
    );
    result.push({
      id: partGames.reduce((acc, game) => acc + game.id, ''),
      games: partGames,
    });
  }
  return result;
};

export const getItemsIntoRow = (width: number) => {
  if (width > 680) {
    return 3;
  }

  if (width < 576) {
    return 1;
  }

  return 2;
};
