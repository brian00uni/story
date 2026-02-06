// material
import { useSetHeaderProps } from '@/models/headerContext';
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
// import 'swiper/css';

export default function Main() {
  const setHeaderProps = useSetHeaderProps();
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = useMemo(
    () => [
      { id: 'page-01', label: 'One' },
      { id: 'page-02', label: 'Two' },
      { id: 'page-03', label: 'Three' },
      { id: 'page-04', label: 'Four' },
      { id: 'page-05', label: 'Five' },
    ],
    [],
  );

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

  useEffect(() => {
    const handleScroll = () => {
      const tops = sectionRefs.current.map((el) =>
        el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY,
      );
      const firstBelow = tops.findIndex((top) => top > 1);
      const index = firstBelow === -1 ? tops.length - 1 : Math.max(0, firstBelow - 1);
      if (index !== activeIndex) setActiveIndex(index);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const handleNavClick = (index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Stack spacing={2}>
        <div
          id="page-01"
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
        >
          <Page01 />
        </div>
        <div
          id="page-02"
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
        >
          <Page02 />
        </div>
        <div
          id="page-03"
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
        >
          <Page03 />
        </div>
        <div
          id="page-04"
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
        >
          <Page04 />
        </div>
        <div
          id="page-05"
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
        >
          <Page05 />
        </div>
      </Stack>
      <ButtonGroup className="nav-page" aria-label="Nav button group">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            className={activeIndex === index ? 'is-active' : undefined}
            onClick={() => handleNavClick(index)}
          >
            {section.label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
