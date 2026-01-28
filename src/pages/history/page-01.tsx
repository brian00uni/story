import TypingText from '@/components/typingText';
import icoMan from '@/assets/images/svg/ico-man.svg';
import { Box, Stack, Typography } from '@mui/material';

export default function Page01() {
  return (
    <Box className="mainPage page-01">
      <Stack spacing={2} alignItems="center">
        <Box component="img" src={icoMan} alt="Man icon" sx={{ width: 160, height: 'auto' }} />
        <Typography variant="h3" component="h1">
          Page 01
        </Typography>
        <TypingText />
      </Stack>
    </Box>
  );
}
