// material
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import { useSetHeaderProps } from '@/models/headerContext';
import PageScroller from 'react-page-scroller';
import { useEffect } from 'react';

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
    <PageScroller
      animationTimer={800}
      animationTimerBuffer={200}
      transitionTimingFunction="cubic-bezier(0.22, 0.61, 0.36, 1)"
      containerHeight="100%"
      containerWidth="100%"
      renderAllPagesOnFirstRender
    >
      <Page01 />
      <Page02 />
      <Page03 />
      <Page04 />
      <Page05 />
    </PageScroller>
  );
}
