import { Descriptions } from 'antd';
import { FC } from 'react';

import { SystemRequirements } from '../../api/freeToPlayApi';
import { getGameRequirements } from './utils';

type SystemRequirementsProps = {
  requirements: SystemRequirements;
};

export const GameSystemRequirements: FC<SystemRequirementsProps> = ({ requirements }) => {
  return (
    <Descriptions
      column={1}
      items={getGameRequirements(requirements)}
      contentStyle={{ display: 'table-cell' }}
    />
  );
};
