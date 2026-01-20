import { useSetHeaderProps } from '@/models/headerContext';
import { apiUrl, readJson } from '@/utils/http';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BoardWrite() {
  const setHeaderProps = useSetHeaderProps();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHeaderProps({
      pageTitle: id ? 'Edit Post' : 'Write Post',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps, id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(apiUrl(`/api/board/${id}`))
      .then(async (res) => {
        if (!res.ok) throw new Error('Not found');
        return await readJson<{ title?: string; content?: string }>(res);
      })
      .then((json) => {
        setTitle(json?.title ?? '');
        setContent(json?.content ?? '');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setError(null);
    setLoading(true);
    const payload = { title, content };
    try {
      const res = await fetch(apiUrl(id ? `/api/board/${id}` : '/api/board'), {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await readJson<{ id?: number; message?: string }>(res).catch(() => null);
      if (!res.ok) {
        setError(json?.message ?? `Request failed (${res.status})`);
        return;
      }
      const fallbackId = id ? Number(id) : null;
      const nextId = json?.id ?? (Number.isFinite(fallbackId) ? fallbackId : null);
      if (!nextId) {
        setError('Missing post id in response.');
        return;
      }
      navigate(`/board/${nextId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={loading}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={loading}
          multiline
          minRows={6}
        />
        {error ? <p>Error: {error}</p> : null}
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {id ? 'Save' : 'Create'}
        </Button>
      </Stack>
    </Box>
  );
}
