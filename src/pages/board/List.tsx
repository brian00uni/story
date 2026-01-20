import { useSetHeaderProps } from '@/models/headerContext';
import { readJson } from '@/utils/http';
import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type BoardItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function BoardList() {
  const setHeaderProps = useSetHeaderProps();
  const [items, setItems] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Board',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  useEffect(() => {
    fetch('/api/board')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        return (await readJson<BoardItem[]>(res)) ?? [];
      })
      .then((json) => {
        setItems(Array.isArray(json) ? json : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button component={Link} to="/board/write" variant="contained">
          Write
        </Button>
      </Stack>
      {items.length === 0 ? (
        <Typography>No posts yet.</Typography>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem key={item.id} component={Link} to={`/board/${item.id}`} divider>
              <ListItemText primary={item.title} secondary={item.createdAt} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
