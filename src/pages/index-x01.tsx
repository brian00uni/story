// material
import { useSetHeaderProps } from '@/models/headerContext';
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import { A11y, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Main() {
  const setHeaderProps = useSetHeaderProps();
  const swiperRef = useRef<HTMLDivElement | null>(null);

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

  const syncPaginationActive = () => {
    const root = swiperRef.current;
    if (!root) return;
    const bullets = root.querySelectorAll('.swiper-pagination-bullet');
    bullets.forEach((bullet) => bullet.classList.remove('is-active'));
    const active = root.querySelector('.swiper-pagination-bullet-active');
    active?.classList.add('is-active');
  };

  return (
    <div ref={swiperRef}>
      <Swiper
        // className="page-scroller-wrap"
        direction="vertical"
        slidesPerView="auto"
        autoHeight
        speed={800}
        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel={{ releaseOnEdges: true, forceToAxis: true }}
        onSwiper={() => syncPaginationActive()}
        onSlideChange={() => syncPaginationActive()}
        style={{ height: 'auto' }}
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
    </div>
  );
}
