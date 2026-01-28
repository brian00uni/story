// material
import Page01 from '@/pages/history/page-01';
import Page02 from '@/pages/history/page-02';
import Page03 from '@/pages/history/page-03';
import Page04 from '@/pages/history/page-04';
import Page05 from '@/pages/history/page-05';
import { useSetHeaderProps } from '@/models/headerContext';
import PageScroller from 'react-page-scroller';
import { useEffect, useState } from 'react';

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

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRequest, setPageRequest] = useState(0);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (pageNumber !== pageRequest) {
      setPageRequest(pageNumber);
    }
  };

  const pages = ['01', '02', '03', '04', '05'];

  return (
    <div className="page-scroller-wrap">
      <PageScroller
        animationTimer={800}
        animationTimerBuffer={200}
        transitionTimingFunction="cubic-bezier(0.22, 0.61, 0.36, 1)"
        containerHeight="100%"
        containerWidth="100%"
        renderAllPagesOnFirstRender
        pageOnChange={handlePageChange}
        customPageNumber={pageRequest}
      >
        <Page01 />
        <Page02 />
        <Page03 />
        <Page04 />
        <Page05 />
      </PageScroller>
      <div className="page-pager" role="navigation" aria-label="Full page sections">
        {pages.map((label, index) => (
          <button
            key={label}
            type="button"
            className={index === currentPage ? 'active' : undefined}
            onClick={() => setPageRequest(index)}
            aria-current={index === currentPage ? 'page' : undefined}
            aria-label={`Go to page ${label}`}
          />
        ))}
        <div className="page-pager-label">
          {String(currentPage + 1).padStart(2, '0')} / {pages.length}
        </div>
      </div>
    </div>
  );
}
