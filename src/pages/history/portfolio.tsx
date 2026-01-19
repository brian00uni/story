import { usePortfolioItems } from '@/data/dataPortfolio';
import { useSetHeaderProps } from '@/models/headerContext';
import { Masonry } from '@mui/lab';
import { Box, Paper, styled } from '@mui/material';
import { useEffect, useMemo } from 'react';

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const getYear = (value: string) => {
    const match = value.match(/\b(\d{4})\b/);
    return match ? match[1] : 'Unknown';
  };

  const itemsByYear = useMemo(() => {
    return items.reduce<Record<string, typeof items>>((acc, item) => {
      const year = getYear(item.startDate);
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  }, [items]);

  const sortedYears = useMemo(() => {
    return Object.keys(itemsByYear).sort((a, b) => {
      if (a === 'Unknown') return 1;
      if (b === 'Unknown') return -1;
      return Number(b) - Number(a);
    });
  }, [itemsByYear]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box>
      {sortedYears.map((year) => (
        <Box key={year} sx={{ mb: 3 }}>
          <Box sx={{ mb: 1, fontWeight: 700 }}>{year}</Box>
          <Masonry columns={4} spacing={2}>
            {itemsByYear[year].map((item, index) => (
              <Item key={`${item.mediaCredit}-${index}`}>
                <p>{item.headline}</p>
                {item.startDate}-{item.endDate}
                <br />
                <p>{item.text}</p>
                <a href={item.mediaCredit} target="_blank" rel="noreferrer">
                  {item.mediaCredit}
                </a>
              </Item>
            ))}
          </Masonry>
        </Box>
      ))}
    </Box>
  );
}
