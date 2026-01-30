// material
import { useSetHeaderProps } from '@/models/headerContext';
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import { useEffect } from 'react';
import 'swiper/css';
import { A11y, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Main() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('index-page');

    setHeaderProps({
      pageTitle: '',
      backButton: false,
      closeButton: false,
      fnGoBack: undefined,
    });
    return () => {
      root.classList.remove('index-page');
    };
  }, [setHeaderProps]);

  return (
    <Swiper
      // className="page-scroller-wrap"
      direction="vertical"
      slidesPerView={1}
      speed={800}
      mousewheel
      modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{ height: '100vh' }}
    >
      <SwiperSlide>
        <Page01 />
      </SwiperSlide>
      <SwiperSlide>
        <Page02 />
      </SwiperSlide>
      <SwiperSlide>
        <Page03 />
      </SwiperSlide>
      <SwiperSlide>
        <Page04 />
      </SwiperSlide>
      <SwiperSlide>
        <Page05 />
      </SwiperSlide>
    </Swiper>
  );
}
