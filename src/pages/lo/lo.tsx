import { useSetHeaderProps } from '@/models/headerContext';
import LottoPage from './lo.jsx';
import { useEffect } from 'react';

export default function LoPage() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Lotto',
      backButton: true,
      closeButton: false,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  return <LottoPage />;
}
