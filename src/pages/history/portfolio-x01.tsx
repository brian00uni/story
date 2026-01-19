import { usePortfolioItems } from '@/data/dataPortfolio';
import { useSetHeaderProps } from '@/models/headerContext';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function Portfolio() {
  const setHeaderProps = useSetHeaderProps();
  const { items, loading, error } = usePortfolioItems();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Portfolio',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    try {
      const url = new URL(trimmed);
      url.protocol = 'https:';
      return url.toString();
    } catch {
      try {
        return new URL(`https://${trimmed}`).toString();
      } catch {
        return '';
      }
    }
  };

  const getScreenshotUrl = (targetUrl: string) => {
    const accessKey = 'e04d1d64dcfb4641895c095829435207';
    const baseUrl = 'https://api.apiflash.com/v1/urltoimage';
    const normalizedUrl = normalizeUrl(targetUrl);
    if (!normalizedUrl) return '';
    const encodedUrl = encodeURIComponent(normalizedUrl);
    return `${baseUrl}?access_key=${accessKey}&url=${encodedUrl}&format=png&width=300`;
  };

  const placeholderPng =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAB9yV2SAAAACXBIWXMAAAsSAAALEgHS3X78AAABa0lEQVR4nO3RAQ0AAAjDMO5fNFAH4QqYV4m3kCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG4W4K0AAW0r7lUAAAAASUVORK5CYII=';

  return (
    <Box>
      {items.map((item, index) => {
        const screenshotUrl = getScreenshotUrl(item.mediaCredit);
        return (
          <div key={`${item.mediaCredit}-${index}`} style={{ marginBottom: 16 }}>
            <img
              src={screenshotUrl || placeholderPng}
              alt={item.headline || 'Site screenshot'}
              width={300}
              style={{ display: 'block', marginBottom: 8 }}
              onError={(event) => {
                event.currentTarget.src = placeholderPng;
              }}
            />
            <a href={normalizeUrl(item.mediaCredit)} target="_blank" rel="noreferrer">
              {item.mediaCredit}
            </a>
          </div>
        );
      })}
    </Box>
  );
}
