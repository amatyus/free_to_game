import { Descriptions } from 'antd';
import { FC } from 'react';

import { GameFull } from '../../api/freeToPlayApi';
import { getGameDescription } from './utils';

type GameDescriptionProps = {
  game: GameFull;
};

export const GameDescription: FC<GameDescriptionProps> = ({ game }) => (
  <Descriptions column={2} items={getGameDescription(game)} />
);
