import projectsData from '@/data/projects.json';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

type Project = {
  No: number;
  data: {
    Title: string;
    Description: string;
    Client: string;
    Duration: string;
    Team: string;
    Role: string;
    Technology: string;
    Performed: string;
    Achievements: string;
    imgSrc: string | null;
  };
};

const projects = Array.isArray(projectsData) ? (projectsData as Project[]) : [];

const resolveProjectImage = (src: string) => {
  if (!src) return null;
  const trimmed = src.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const base = `${window.location.origin}${import.meta.env.BASE_URL}`;
  const normalized = trimmed.replace(/^\/+/, '');
  return new URL(normalized, base).toString();
};

export default function Page04() {
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
            {projects.map((project) => (
              <Grid key={project.No} size={6}>
                <Paper elevation={3} sx={{ padding: '1rem' }}>
                  <Typography variant="h1" component={'div'}>
                    {project.data.Title}
                  </Typography>
                  {resolveProjectImage(project.data.imgSrc ?? '') ? (
                    <Box sx={{ mt: 1 }}>
                      <img
                        src={resolveProjectImage(project.data.imgSrc ?? '') ?? ''}
                        alt={`${project.data.Title} image`}
                        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                      />
                    </Box>
                  ) : null}
                  <Typography
                    variant="body1"
                    component={'div'}
                    sx={{ marginTop: '1rem', whiteSpace: 'pre-line' }}
                  >
                    {project.data.Description}
                    {'\n'}- Client: {project.data.Client}
                    {'\n'}- Duration: {project.data.Duration}
                    {'\n'}- Team: {project.data.Team}
                    {'\n'}- Role: {project.data.Role}
                    {'\n'}- Technology: {project.data.Technology}
                    {'\n'}- Performed: {project.data.Performed}
                    {'\n'}- Achievements: {project.data.Achievements}
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
