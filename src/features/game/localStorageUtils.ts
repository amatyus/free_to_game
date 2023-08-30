import { GameFull } from './../../api/freeToPlayApi';

const localStorageGamesKey = 'FREE_TO_PLAY_GAMES';
const gameDataTTL = 5 * 60 * 1000;

export const setGameDataWithExpiry = (gameData: GameFull) => {
  const storageDataJSON = localStorage.getItem(localStorageGamesKey);
  const storageData =
    storageDataJSON && JSON.parse(storageDataJSON) ? JSON.parse(storageDataJSON) : {};
  const now = new Date();

  storageData[gameData.id] = {
    gameData,
    expiry: now.getTime() + gameDataTTL,
  };
  localStorage.setItem(localStorageGamesKey, JSON.stringify(storageData));
};

export const getGameDataWithExpiry = (gameId: number): GameFull | null => {
  const storageDataJSON = localStorage.getItem(localStorageGamesKey);

  if (!storageDataJSON || !JSON.parse(storageDataJSON)) {
    return null;
  }

  const storageData = JSON.parse(storageDataJSON);
  const currentGame = storageData[gameId];

  if (!currentGame) {
    return null;
  }

  const now = new Date();

  if (now.getTime() > currentGame.expiry) {
    delete storageData[gameId];
    localStorage.setItem(localStorageGamesKey, JSON.stringify(storageData));

    return null;
  }

  return currentGame.gameData;
};
