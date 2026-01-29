import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

export default function Page02() {
  return (
    <Box className="mainPage page-02">
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
                  Web Standards & Accessibility
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  W3C 표준안에 따라 웹의 호환성, 접근성, SEO에 유리한 웹사이트를 개발하였습니다.
                  또한, WCAG 가이드라인을 준수하여 장애인 접근성을 고려한 웹사이트를 구현하여
                  웹접근성 마크 획득에 기여하였습니다.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  Frontend Development
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  Vue, React를 Vite, Nuxt.js 환경에서 buefyUI, ChakraUI, MaterialUI등 UI라이브러리를
                  활용해 Javascript, TypeScript로 개발하였습니다.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  Performance Optimization
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  HTML, CSS, JavaScript 각 시멘틱 요소를 적절히 활용해 렌더링을 가볍게 만들고,
                  보이는 것을 빠르고 안정적으로 보여주는 최적화 작업을 수행하였습니다.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  Communication & Collaboration
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  Github, Jira, Slack 등을 활용해 기획자, 디자이너, 개발자와의 원활한 협업 경험을
                  통해 UI 요구사항 및 기술적 제약 사항을 명확히 정리하여 일정 리스크 최소화, 피드백
                  기반 협업을 통해 완성도 높은 UI 구현 하였습니다.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
