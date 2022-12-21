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
      src: 'https://i.pinimg.com/originals/35/e4/8e/35e48e469aa636b91a82704da2944670.gif',
    },
    {
      src: 'https://mblogthumb-phinf.pstatic.net/20141128_155/zzeuyoung_1417143454249NxG8u_GIF/pikicast-919059262.gif?type=w2',
    },
    {
      src: 'https://mblogthumb-phinf.pstatic.net/MjAxODAyMTNfMjc0/MDAxNTE4NTA1NTk1ODA5.8fVxMD0JrxIa6nkna_OHEk6KanOSyT6iqOPCYCUu1M0g.yzsIIuSzbXotdUM4-vXYKouw9XPFvqMwTb6p8TmJvWQg.GIF.sinnam88/%EA%B7%80%EC%97%AC%EC%9A%B4_%EC%A7%A4_%ED%8F%AC%EC%BC%93%EB%AA%AC%EC%8A%A4%ED%84%B0_%EC%9B%80%EC%A7%A4_%EB%AA%A8%EC%9D%8C_%2811%29.gif?type=w800',
    },
    {
      src: 'https://thumbs.gfycat.com/ImmaterialCoordinatedFinnishspitz-size_restricted.gif',
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
