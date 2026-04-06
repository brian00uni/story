// import icoMan from '@/assets/images/svg/ico-man.svg';
import TypingText from '@/components/typingText';
import { Box, Stack } from '@mui/material';

import animationData from '@/data/intro.json'; // 로컬 JSON 파일
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function Page01() {
  // const [isPlaying, setIsPlaying] = useState(true);
  return (
    <Box className="mainPage page-01">
      <Stack  alignItems="center">
        {/* <IcoMove /> */}
        {/* <Box component="img" src={icoMan} alt="Man icon" sx={{ width: 160, height: 'auto' }} /> */}
        {/* <Typography variant="h3" component="h1">
          Page 01
        </Typography> */}

        <Box>
          <Lottie
            animationData={animationData}
            loop={true}
            // autoplay={isPlaying}
            // style={{ width: 500, height: 'auto' }}
          />
          {/* <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '정지' : '재생'}</button> */}
        </Box>

        {/* <img src={lgPhotoshop} alt="Photoshop logo" /> */}
        <TypingText />
        {/* <Box className="walkman-wrap">
          <Box
            component="img"
            className="walkman"
            src={icoMan}
            alt="Man icon"
            sx={{ width: 160, height: 'auto' }}
          />
        </Box> */}
      </Stack>
    </Box>
  );
}
