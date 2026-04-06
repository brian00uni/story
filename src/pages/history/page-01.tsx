// import icoMan from '@/assets/images/svg/ico-man.svg';
import TypingText from '@/components/typingText';
// import ScrollText from '@/components/scrollText';
import { Box, Stack } from '@mui/material';

import animationData from '@/data/intro.json'; // Î°úÏª¨ JSON ?åÏùº
import Lottie from 'lottie-react';
import { createElement } from 'react';
// import { useState } from 'react';

const marqueeItems = [
  { left: 122, top: 0, height: 397, scrollAmount: 6 },
  { left: 8, top: -397, height: 175, scrollAmount: 4 },
  { left: 151, top: -550, height: 235, scrollAmount: 5 },
  { left: 51, top: -735, height: 161 },
  { left: 124, top: -961, height: 337 },
  { left: 122, top: -1213, height: 397, scrollAmount: 7 },
  { left: 55, top: -1691, height: 231, scrollAmount: 5 },
  { left: 98, top: -1900, height: 127, scrollAmount: 6 },
  { left: 93, top: -2100, height: 355, scrollAmount: 1 },
  { left: 279, top: -2504, height: 475, scrollAmount: 4 },
  { left: 185, top: -2907, height: 373, scrollAmount: 1 },
  { left: 140, top: -3200, height: 296, scrollAmount: 7 },
  { left: 26, top: -3500, height: 300, scrollAmount: 3 },
  { left: 22, top: -3800, height: 253, scrollAmount: 6 },
  { left: 211, top: -4040, height: 325, scrollAmount: 7 },
  { left: 203, top: -4400, height: 481, scrollAmount: 5 },
  { left: 107, top: -4900, height: 330, scrollAmount: 2 },
  { left: 132, top: -5205, height: 331, scrollAmount: 5 },
  { left: 57, top: -5500, height: 94, scrollAmount: 5 },
  { left: 5, top: -5600, height: 471 },
  { left: 317, top: -6003, height: 480, scrollAmount: 5 },
];

export default function Page01() {
  // const [isPlaying, setIsPlaying] = useState(true);
  return (
    <Box className="mainPage page-01">
      <Stack alignItems="center">
        {/* <IcoMove /> */}
        {/* <Box component="img" src={icoMan} alt="Man icon" sx={{ width: 160, height: 'auto' }} /> */}
        {/* <Typography variant="h3" component="h1">
          Page 01
        </Typography> */}

        <Box
          sx={{
            maxHeight: '1000px',
            fontFamily: 'cursive',
            fontSize: '14pt',
            color: 'gold',
          }}
        >
          {marqueeItems.map((item, idx) =>
            createElement(
              'marquee' as any,
              {
                key: idx,
                style: {
                  position: 'relative',
                  left: `${item.left}px`,
                  top: `${item.top}px`,
                  height: `${item.height}px`,
                },
                direction: 'down',
                ...(item.scrollAmount ? { scrollamount: item.scrollAmount } : {}),
              },
              'Scrolling text...',
            ),
          )}
        </Box>

        <Box>
          <Lottie
            animationData={animationData}
            loop={true}
            // autoplay={isPlaying}
            // style={{ width: 500, height: 'auto' }}
          />
          {/* <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '?ïÏ?' : '?¨ÏÉù'}</button> */}
        </Box>

        {/* <img src={lgPhotoshop} alt="Photoshop logo" /> */}
        <TypingText />
        {/* <ScrollText /> */}
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
