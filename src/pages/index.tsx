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

type SectionItem = {
  id: string;
  label: string;
  zIndex: number;
  kind: 'fixed' | 'float';
  pinTop: number;
  className: string;
  component: ReactElement;
};

export default function Main() {
  const setHeaderProps = useSetHeaderProps();
  const touchStartYRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const [step, setStep] = useState(0);

  const sections = useMemo<SectionItem[]>(
    () => [
      { id: 'page-01', label: 'One', zIndex: 1, kind: 'fixed', pinTop: 0, className: 'story-pin-0', component: <Page01 /> },
      { id: 'page-02', label: 'Two', zIndex: 2, kind: 'float', pinTop: 50, className: 'story-pin-50', component: <Page02 /> },
      { id: 'page-03', label: 'Three', zIndex: 3, kind: 'float', pinTop: 100, className: 'story-pin-100', component: <Page03 /> },
      { id: 'page-04', label: 'Four', zIndex: 4, kind: 'float', pinTop: 150, className: 'story-pin-150', component: <Page04 /> },
      { id: 'page-05', label: 'Five', zIndex: 5, kind: 'float', pinTop: 180, className: 'story-pin-180', component: <Page05 /> },
      { id: 'page-06', label: 'Six', zIndex: 6, kind: 'float', pinTop: 210, className: 'story-pin-210', component: <Page06 /> },
    ],
    [],
  );

  const maxStep = sections.length - 1;

  const goStep = (next: number) => {
    const clamped = Math.max(0, Math.min(next, maxStep));
    if (clamped === step || lockRef.current) return;
    lockRef.current = true;
    setStep(clamped);
    window.setTimeout(() => {
      lockRef.current = false;
    }, 520);
  };

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
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 8) return;
      goStep(step + (e.deltaY > 0 ? 1 : -1));
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      if (Math.abs(delta) < 36) return;
      goStep(step + (delta > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [step]);

  const getStateClass = (index: number) => {
    if (index === 0) return 'is-fixed-base';
    if (index <= step) return 'is-pinned';
    if (index === step + 1) return 'is-preview';
    return 'is-hidden-next';
  };

  return (
    <>
      <Stack spacing={0} className="index-story is-staged">
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className={`story-section ${section.className} ${
              section.kind === 'fixed' ? 'story-section--fixed' : 'story-section--float'
            } ${getStateClass(index)}`}
            style={{ zIndex: section.zIndex }}
          >
            <div className="story-section__inner">{section.component}</div>
          </div>
        ))}
      </Stack>

      <ButtonGroup className="nav-page" aria-label="Nav button group">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            className={step === index ? `is-active ${section.className}` : section.className}
            onClick={() => goStep(index)}
          >
            {section.label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
