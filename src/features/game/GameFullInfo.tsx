import './game.scss';

import { Col, Empty, notification, Row, Space, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';

import { GameFull } from '../../api/freeToPlayApi';
import BackButton from '../../features/game/BackButton';
import { GameCardInfo } from '../../features/game/GameCardInfo';
import { GameCarousel } from '../../features/game/GameCarousel';
import { GameDescription } from '../../features/game/GameDescriptions';

const { Title } = Typography;

type GameFullInfoProps = {
  game: GameFull | null;
  error: string | null;
  loading: boolean;
};

export const GameFullInfo: FC<GameFullInfoProps> = ({ game, error, loading }) => {
  const [api, contextHolder] = notification.useNotification();

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
        {game ? (
          <div className="game-container">
            <Row gutter={[16, 16]}>
              <Col md={10} xs={24}>
                <GameCardInfo game={game} />
              </Col>
              <Col md={14} xs={24} style={{ textAlign: 'left' }}>
                <Space align="center">
                  <BackButton />
                  <Title level={2} className="game-title">
                    {game.title}
                  </Title>
                </Space>
                <GameDescription game={game} />
                <GameCarousel slides={game.screenshots} />
              </Col>
            </Row>
          </div>
        ) : (
          <Space direction="vertical">
            <BackButton title={'Back to games list'} />
            <Empty />
          </Space>
        )}
      </Spin>
    </>
  );
};
