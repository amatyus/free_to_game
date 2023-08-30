import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type BackButtonProps = {
  title?: string;
};

const BackButton: FC<BackButtonProps> = ({ title }) => {
  return (
    <Link to={`/`}>
      <Button icon={<ArrowLeftOutlined />}>{title}</Button>
    </Link>
  );
};

export default BackButton;
