import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

import styled from 'styled-components';
import Logo from '../common/Logo';

import jjanggu from '../../assets/jjanggu.gif';
import girl from '../../assets/girl.gif';
import ppika from '../../assets/ppika.gif';

const SliderContainer = () => {
  const items = [{ src: jjanggu }, { src: girl }, { src: ppika }];
  return (
    <>
      <marquee>
        <Intro>
          스터디/프로젝트 모집 사이트 <Logo />에 오신 것을 환영합니다😍 구인 글을 등록하고 팀원을
          모집하세요 !
        </Intro>
      </marquee>
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

const Intro = styled.span`
  font-size: 24px;
  color: #6d7d8b;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 1480px;
  height: 400px;
`;

export default SliderContainer;
