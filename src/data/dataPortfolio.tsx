import { useSetHeaderProps } from '@/models/headerContext';
import { useEffect, useMemo, useState } from 'react';

export type PortfolioRow = Record<string, string | number | null>;

export type PortfolioItem = {
  mediaCredit: string;
  startDate: string;
  endDate: string;
  headline: string;
  text: string;
};

export type PortfolioState = {
  data: PortfolioRow[];
  loading: boolean;
  error: string | null;
};

export const sheetURL =
  'https://opensheet.elk.sh/1FJoHHRcbtsnguWhyq6tonvGprWXvjNOE-Fh0Pr5tUXA/portfolio';

export function usePortfolioData(url: string = sheetURL): PortfolioState {
  const [data, setData] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        return res.json();
      })
      .then((json) => {
        if (!active) return;
        setData(Array.isArray(json) ? (json as PortfolioRow[]) : []);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url]);

  return { data, loading, error };
}

const portfolioFields = [
  { key: 'mediaCredit', label: 'Media Credit' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'headline', label: 'Headline' },
  { key: 'text', label: 'Text' },
] as const;

type PortfolioFieldKey = (typeof portfolioFields)[number]['key'];

const toStringValue = (value: PortfolioRow[string]) => (value == null ? '' : String(value));

export function mapPortfolioRow(row: PortfolioRow): PortfolioItem {
  return {
    mediaCredit: toStringValue(row['Media Credit']),
    startDate: toStringValue(row['Start Date']),
    endDate: toStringValue(row['End Date']),
    headline: toStringValue(row['Headline']),
    text: toStringValue(row['Text']),
  };
}

export function usePortfolioItems(url: string = sheetURL) {
  const { data, loading, error } = usePortfolioData(url);
  const items = useMemo(() => data.map(mapPortfolioRow), [data]);

  return { items, loading, error };
}

export type PortfolioSortDirection = 'asc' | 'desc';

export function sortPortfolioItems(
  items: PortfolioItem[],
  key: PortfolioFieldKey,
  direction: PortfolioSortDirection = 'asc',
) {
  const sorted = [...items].sort((a, b) => a[key].localeCompare(b[key]));
  return direction === 'asc' ? sorted : sorted.reverse();
}

export function filterPortfolioItems(
  items: PortfolioItem[],
  key: PortfolioFieldKey,
  query: string,
) {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter((item) => item[key].toLowerCase().includes(q));
}

export function PortfolioTable({ data }: { data: PortfolioItem[] }) {
  if (!data.length) return <p>No data.</p>;

  return (
    <div>
      <h2>Portfolio Data</h2>
      <table>
        <thead>
          <tr>
            {portfolioFields.map((field) => (
              <th key={field.key}>{field.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {portfolioFields.map((field) => (
                <td key={field.key}>{row[field.key as PortfolioFieldKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DataPortfolio() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Data Portfolio',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  const { items, loading, error } = usePortfolioItems();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <PortfolioTable data={items} />;
}
