import { Card } from 'antd';
import { FC } from 'react';

import { GameFull } from '../../api/freeToPlayApi';

const { Meta } = Card;

type GameCardInfoProps = {
  game: GameFull;
};

export const GameImage: FC<GameCardInfoProps> = ({ game }) => (
  <Card cover={<img alt={game.title} src={game.thumbnail} />}>
    <Meta title={game.title} />
  </Card>
);
