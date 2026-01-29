import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

export default function Page04() {
  return (
    <Box className="mainPage page-04">
      <Box className="mainWrap">
        <Box className="category-box">
          <Typography variant="category" component={'div'}>
            Core Competencies
          </Typography>
        </Box>
        <Divider variant="cateLine" />
        <Box className="contents-box">
          <Typography variant="h4" component="h2" gutterBottom>
            사용자 중심 최적화에 중점을 두며 원활한 소통, 시너지를 통해 개발하고 있습니다.
          </Typography>
          <Grid container spacing={2} className="">
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  ㅇㅇㅇㅇㅇㅇㅇ
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
