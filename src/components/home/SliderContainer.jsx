import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

import styled from 'styled-components';

const SliderContainer = () => {
  const items = [
    {
      src: 'https://coresos-phinf.pstatic.net/a/31bfe5/9_5c9Ud018svc1dtpxd99uyvu3_hqrozv.jpg',
    },
    {
      src: 'https://pbs.twimg.com/media/EJLI3OsUwAEndrV.jpg',
    },
  ];
  return (
    <>
      <Swiper
        effect={'fade'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={item.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const Image = styled.img`
  width: 1480px;
  height: 400px;
`;

export default SliderContainer;
