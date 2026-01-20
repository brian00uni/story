import { useSetHeaderProps } from '@/models/headerContext';
import { apiUrl, readJson } from '@/utils/http';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type BoardItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function BoardView() {
  const setHeaderProps = useSetHeaderProps();
  const { id } = useParams();
  const [item, setItem] = useState<BoardItem | null>(null);
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
    if (!id) return;
    fetch(apiUrl(`/api/board/${id}`))
      .then(async (res) => {
        if (!res.ok) throw new Error('Not found');
        return await readJson<BoardItem>(res);
      })
      .then((json) => {
        setItem(json ?? null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Not found.</p>;

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">{item.title}</Typography>
        <Typography variant="body2">{item.createdAt}</Typography>
        <Typography>{item.content}</Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to={`/board/${item.id}/edit`} variant="contained">
            Edit
          </Button>
          <Button component={Link} to="/board" variant="outlined">
            Back
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
