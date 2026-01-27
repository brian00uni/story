import TypingText from '@/components/typingText';
import { Box, Stack, Typography } from '@mui/material';

export default function Page01() {
  return (
    <Box className="mainPage page-01">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" component="h1">
          Page 01
        </Typography>
        <TypingText />
      </Stack>
    </Box>
  );
}
