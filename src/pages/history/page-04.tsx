import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

import { SiJquery } from 'react-icons/si';

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
            사용자 중심 최적화에 중점을 두며 원활한 소통, 시너지를 통해 개발하고 있습니다.
          </Typography>
          <Grid container spacing={2} className="">
            <Grid size={6}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '1rem' }}>
                  1) 프로젝트명: SKT T-Cloud Biz 고도화 및 TCB/TBP APP 운영 개발 <br />
                  - 연계/소속회사 : SKT <br />
                  - 주요 업무 : Ui/Ux 개발 - 담당 역할 : 퍼블리셔 - 기술 스택 : HTML5, CSS3,
                  JavaScript, jQuery, Bootstrap, 크로스브라우징, 웹표준, 반응형웹 <br />
                  - 업무 기간 : 2015.08.03 ~ 재직중 (약 115개월) <br />
                  - 개발 인원 : 9~10명 <br />- 상세 내용 : T cloud Biz APP 운영과 관련 콘솔 프로그램
                  신규 개발 및 과제에 따른 Ui/Ux 퍼블리싱이 주된 업무입니다. TCB고도화 작업은 java로
                  개발하였고 관련 신규 개발 및 과제는 React 중심으로 개발진행했으며 Ui 컴포넌트
                  라이브러리인 ChakraUI를 활용해 진행했습니다.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <SiJquery aria-label="jQuery" title="jQuery" />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* 경력사항 */}
        <Divider>Work Experience</Divider>
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
