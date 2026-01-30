import { apiUrl, readJson } from '@/utils/http';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Page04() {
  type Project = {
    No: number;
    Title: string;
    Description: string;
    Client: string;
    Duration: string;
    Team: string;
    Role: string;
    Technology: string;
    Performed: string;
    Achievements: string;
    imgSrc: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/projects'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        return (await readJson<Project[]>(res)) ?? [];
      })
      .then((json) => {
        setProjects(Array.isArray(json) ? json : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box className="mainPage page-04">
      <Box className="mainWrap">
        <Box className="category-box">
          <Typography variant="category" component={'div'}>
            Professional Experience
          </Typography>
        </Box>
        <Divider variant="cateLine" />
        <Box className="contents-box">
          <Typography variant="h4" component="h2" gutterBottom>
            작업물입니다.
          </Typography>
          <Grid container spacing={2} className="">
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>Error: {error}</Typography>}
            {!loading &&
              !error &&
              projects.map((project) => (
                <Grid key={project.No} size={6}>
                  <Paper elevation={3} sx={{ padding: '1rem' }}>
                    <Typography variant="h1" component={'div'}>
                      {project.Title}
                    </Typography>
                    <Typography
                      variant="body1"
                      component={'div'}
                      sx={{ marginTop: '1rem', whiteSpace: 'pre-line' }}
                    >
                      {project.Description}
                      {'\n'}- Client: {project.Client}
                      {'\n'}- Duration: {project.Duration}
                      {'\n'}- Team: {project.Team}
                      {'\n'}- Role: {project.Role}
                      {'\n'}- Technology: {project.Technology}
                      {'\n'}- Performed: {project.Performed}
                      {'\n'}- Achievements: {project.Achievements}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* 경력사항 */}
        <Divider>Work Experience</Divider>
        <Box className="contents-box">
          <Typography variant="h4" component="h2" gutterBottom>
            최적의 사항 맞습니다...
          </Typography>
          <Grid container spacing={2} className="">
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                ㅇㅇㅇㅇ
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
