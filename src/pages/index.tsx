// material
import { useSetHeaderProps } from '@/models/headerContext';
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import Page06 from '@/pages/history/page-06';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
// import 'swiper/css';

type SectionItem = {
  id: string;
  label: string;
  top: number;
  zIndex: number;
  kind: 'fixed' | 'sticky';
  className: string;
  component: ReactElement;
};

export default function Main() {
  const setHeaderProps = useSetHeaderProps();
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = useMemo<SectionItem[]>(
    () => [
      {
        id: 'page-01',
        label: 'One',
        top: 0,
        zIndex: 1,
        kind: 'fixed',
        className: 'story-top-0',
        component: <Page01 />,
      },
      {
        id: 'page-02',
        label: 'Two',
        top: 50,
        zIndex: 2,
        kind: 'sticky',
        className: 'story-top-50',
        component: <Page02 />,
      },
      {
        id: 'page-03',
        label: 'Three',
        top: 100,
        zIndex: 3,
        kind: 'sticky',
        className: 'story-top-100',
        component: <Page03 />,
      },
      {
        id: 'page-04',
        label: 'Four',
        top: 50,
        zIndex: 4,
        kind: 'sticky',
        className: 'story-top-50',
        component: <Page04 />,
      },
      {
        id: 'page-05',
        label: 'Five',
        top: 50,
        zIndex: 5,
        kind: 'sticky',
        className: 'story-top-50',
        component: <Page05 />,
      },
      {
        id: 'page-06',
        label: 'Six',
        top: 50,
        zIndex: 6,
        kind: 'sticky',
        className: 'story-top-50',
        component: <Page06 />,
      },
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
    const topOffset = sections[index].top;
    const y = target.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <Stack spacing={0} className="index-story">
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className={`story-section ${section.className} ${
              section.kind === 'fixed' ? 'story-section--fixed' : 'story-section--sticky'
            }`}
            style={{ zIndex: section.zIndex }}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            <div className="story-section__inner">{section.component}</div>
          </div>
        ))}
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


