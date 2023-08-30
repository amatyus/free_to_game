import { Space } from 'antd';
import { useEffect } from 'react';

import { GamesFilters } from '../features/gamesList/GamesFilters';
import { GamesVirtualizedList } from '../features/gamesList/GamesList';
import { fetchGamesList } from '../features/gamesList/gamesListSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../rootReducer';

export const Games = () => {
  const dispatch = useAppDispatch();
  const { games, error, loading, filters } = useAppSelector(
    (state: RootState) => state.gamesList,
  );

  useEffect(() => {
    const dispatchedThunk = dispatch(fetchGamesList());
    return () => dispatchedThunk.abort();
  }, []);

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <GamesFilters filters={filters} loading={loading} />
      <GamesVirtualizedList games={games} error={error} loading={loading} />
    </Space>
  );
};
