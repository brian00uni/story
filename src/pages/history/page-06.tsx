import aboutData from '@/data/about.json';
import { Box, Grid, Typography } from '@mui/material';

type AboutItem = {
  cate: string;
  data: Record<string, string | undefined>;
};

const aboutList = Array.isArray(aboutData) ? (aboutData as AboutItem[]) : [];

export default function Page06() {
  return (
    <Box className="mainPage page-06">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h3" component="h1">
            123123123
          </Typography>
          <Typography>ㅈㅂㅈㄷㅂㅈㄷㅂㅈㄷ</Typography>
        </Grid>
        {aboutList.map((item) => (
          <Grid key={item.cate} size={12}>
            <Typography variant="h5" component="h2" sx={{ textTransform: 'capitalize' }}>
              {item.cate}
            </Typography>
            {Object.entries(item.data)
              .filter(([, value]) => typeof value === 'string' && value.trim() !== '')
              .map(([key, value]) => (
                <Typography key={key} variant="body1">
                  {value}
                </Typography>
              ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
