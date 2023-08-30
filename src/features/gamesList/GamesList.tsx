import './gameList.scss';

import { Empty, List, notification, Spin } from 'antd';
import VirtualList from 'rc-virtual-list';
import { FC, useEffect } from 'react';

import { GamesList } from '../../api/freeToPlayApi';
import { useWindowResize } from '../../hooks/hooks';
import { getItemsIntoRow, getRowsByGames } from '../../utils/utils';
import { GameCard } from './GameCard';

type GamesListProps = {
  games: GamesList;
  error: string | null;
  loading: boolean;
};

export const GamesVirtualizedList: FC<GamesListProps> = ({ games, error, loading }) => {
  const [api, contextHolder] = notification.useNotification();

  const windowWidth = useWindowResize();
  const rowItemsCount = getItemsIntoRow(windowWidth);
  const rowsGames = getRowsByGames(games, rowItemsCount);

  useEffect(() => {
    if (error) {
      api.error({
        message: 'Something went wrong',
        description: error,
      });
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Spin tip="Loading..." spinning={loading}>
        {rowsGames.length > 0 ? (
          <List>
            <VirtualList data={rowsGames} itemKey="id">
              {(row) => (
                <List.Item key={row.id}>
                  <div
                    key={row.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${rowItemsCount}, minmax(200px, 1fr)`,
                      gap: 16,
                    }}
                  >
                    {row.games.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        ) : (
          <Empty />
        )}
      </Spin>
    </>
  );
};
