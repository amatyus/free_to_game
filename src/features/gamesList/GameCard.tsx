import { Card, Tag, Typography } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Game } from '../../api/freeToPlayApi';

const { Meta } = Card;
const { Text } = Typography;

type GameCard = {
  game: Game;
};

export const GameCard: FC<GameCard> = ({ game }) => {
  const gamePath = game.id;
  const gameDescription = () => (
    <div>
      <div className="clipped-text">
        <Text italic>{game.short_description}</Text>
      </div>
      <div className="clipped-text">
        <Text strong>{game.publisher}</Text>
      </div>
      <Tag bordered={false}>{game.release_date.split('-').reverse().join('.')}</Tag>
      <Tag bordered={false}>{game.genre}</Tag>
    </div>
  );

  return (
    <Link to={`${gamePath}`}>
      <Card
        className="game-card"
        hoverable
        cover={<img alt={game.title} src={game.thumbnail} />}
      >
        <Meta title={game.title} description={gameDescription()} />
      </Card>
    </Link>
  );
};
