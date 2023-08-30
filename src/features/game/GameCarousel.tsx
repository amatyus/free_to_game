import { Carousel, Image } from 'antd';
import { FC } from 'react';

import { Screenshots } from '../../api/freeToPlayApi';

type GameCarouselProps = {
  slides: Array<Screenshots>;
};

export const GameCarousel: FC<GameCarouselProps> = ({ slides }) => (
  <Carousel autoplay>
    {slides.map(({ id, image }) => (
      <Image key={id} src={image} />
    ))}
  </Carousel>
);
