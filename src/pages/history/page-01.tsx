// import icoMan from '@/assets/images/svg/ico-man.svg';
import TypingText from '@/components/typingText';
// import ScrollText from '@/components/scrollText';
import { Box, Stack } from '@mui/material';

import animationData from '@/data/intro.json'; // 로컬 JSON ?�일
import Lottie from 'lottie-react';
import { createElement } from 'react';
// import { useState } from 'react';

const marqueeItems = [
  { left: 122, top: 0, height: 397, scrollAmount: 6, storyText: 'HTML' },
  { left: 8, top: -397, height: 175, scrollAmount: 4, storyText: 'HTML5' },
  { left: 151, top: -550, height: 235, scrollAmount: 5, storyText: 'CSS3' },
  { left: 51, top: -735, height: 161, storyText: 'TailwindCSS' },
  { left: 124, top: -961, height: 337, storyText: 'JavaScript' },
  { left: 122, top: -1213, height: 397, scrollAmount: 7, storyText: 'jQuery' },
  { left: 55, top: -1691, height: 231, scrollAmount: 5, storyText: 'Bootstrap' },
  { left: 98, top: -1900, height: 127, scrollAmount: 6, storyText: 'ReactJS' },
  { left: 93, top: -2100, height: 355, scrollAmount: 1, storyText: 'Cross-Browsing' },
  { left: 279, top: -2504, height: 475, scrollAmount: 4, storyText: 'Responsive Web' },
  { left: 185, top: -2907, height: 373, scrollAmount: 1, storyText: 'Web Standards' },
  { left: 140, top: -3200, height: 296, scrollAmount: 7, storyText: 'BuefyUI' },
  { left: 26, top: -3500, height: 300, scrollAmount: 3, storyText: 'ChakraUI' },
  { left: 22, top: -3800, height: 253, scrollAmount: 6, storyText: 'Sass' },
  { left: 211, top: -4040, height: 325, scrollAmount: 7, storyText: 'Frontend' },
  { left: 107, top: -4900, height: 330, scrollAmount: 2, storyText: 'MaterialUI' },
  { left: 132, top: -5205, height: 331, scrollAmount: 5, storyText: 'Figma' },
  { left: 57, top: -5500, height: 94, scrollAmount: 5, storyText: 'Slack' },
  { left: 5, top: -5600, height: 471, storyText: 'Git' },
  { left: 317, top: -6003, height: 480, scrollAmount: 5, storyText: 'Adobe Photoshop' },
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

        <Box className="story-marquee">
          {marqueeItems.map((item, idx) =>
            createElement(
              'marquee' as any,
              {
                key: idx,
                className: `marqueeItem-${idx + 1}`,
                style: {
                  position: 'relative',
                  left: `${item.left}px`,
                  top: `${item.top}px`,
                  height: `${item.height}px`,
                },
                direction: 'down',
                ...(item.scrollAmount ? { scrollamount: item.scrollAmount } : {}),
              },
              `${item.storyText}`,
            ),
          )}
        </Box>

        <Box  className="intro-ani"  >
          <Lottie
            animationData={animationData}
            loop={true}
            // autoplay={isPlaying}
            // style={{ width: 500, height: 'auto' }}
          />
          {/* <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '?��?' : '?�생'}</button> */}
        </Box>

        {/* <img src={lgPhotoshop} alt="Photoshop logo" /> */}
        <Box className="typing-wrap">
          <TypingText />
        </Box>

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
