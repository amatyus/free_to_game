import { Card } from 'antd';
import { FC } from 'react';

import { GameFull } from '../../api/freeToPlayApi';
import { GameSystemRequirements } from './GameSystemRequirements';

type GameCardInfoProps = {
  game: GameFull;
};

const { Meta } = Card;

export const GameCardInfo: FC<GameCardInfoProps> = ({ game }) => {
  const isAvailableRequirements = Boolean(game.minimum_system_requirements);

  return (
    <Card cover={<img alt={game.title} src={game.thumbnail} />}>
      <Meta
        title={isAvailableRequirements ? 'Minimum System Requirements' : game.title}
        description={
          isAvailableRequirements ? (
            <GameSystemRequirements requirements={game.minimum_system_requirements} />
          ) : null
        }
      />
    </Card>
  );
};
