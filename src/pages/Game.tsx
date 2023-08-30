import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GameFullInfo } from '../features/game/GameFullInfo';
import { fetchGame } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../rootReducer';

export const Game = () => {
  const { gameId } = useParams();
  const dispatch = useAppDispatch();
  const { game, error, loading } = useAppSelector((state: RootState) => state.gameFull);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    const dispatchedThunk = dispatch(fetchGame(Number(gameId)));
    return () => dispatchedThunk.abort();
  }, [gameId]);

  return <GameFullInfo game={game} error={error} loading={loading} />;
};
