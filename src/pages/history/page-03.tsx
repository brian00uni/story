import { Box, Chip, Divider, Grid, Paper, Typography } from '@mui/material';

import { BiLogoCss3, BiLogoHtml5, BiLogoJavascript } from 'react-icons/bi';
import { FaBootstrap, FaGitAlt, FaLaptopCode, FaReact, FaSass } from 'react-icons/fa';
import { MdDesignServices, MdDevices, MdLanguage, MdVerified } from 'react-icons/md';
import {
  SiAdobephotoshop,
  SiAdobexd,
  SiAntdesign,
  SiBuefy,
  SiChakraui,
  SiFigma,
  SiGithub,
  SiJquery,
  SiMaterialdesign,
  SiNotion,
  SiSlack,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export default function Page03() {
  const chipColors = ['#3b82f6', '#8b5cf6', '#111827', '#10b981'];
  const chips = [
    { icon: <BiLogoHtml5 />, label: 'HTML' },
    { icon: <BiLogoHtml5 />, label: 'HTML5' },
    { icon: <BiLogoCss3 />, label: 'CSS3' },
    { icon: <BiLogoJavascript />, label: 'JavaScript' },
    { icon: <SiJquery />, label: 'jQuery' },
    { icon: <FaBootstrap />, label: 'Bootstrap' },
    { icon: <MdLanguage />, label: 'Cross-Browsing' },
    { icon: <FaReact />, label: 'ReactJS' },
    { icon: <FaLaptopCode />, label: 'Frontend' },
    { icon: <SiTypescript />, label: 'TypeScript' },
    { icon: <FaSass />, label: 'Sass' },
    { icon: <MdVerified />, label: 'Web Standards' },
    { icon: <MdDevices />, label: 'Responsive Web' },
    { icon: <SiBuefy />, label: 'BuefyUI' },
    { icon: <SiChakraui />, label: 'ChakraUI' },
    { icon: <SiMaterialdesign />, label: 'MaterialUI' },
    { icon: <FaBootstrap />, label: 'Bootstrap' },
    { icon: <SiAntdesign />, label: 'AntD' },
    { icon: <SiTailwindcss />, label: 'TailwindCSS' },
  ];

  const chipsTool = [
    { icon: <SiAdobephotoshop />, label: 'Adobe Photoshop' },
    { icon: <SiFigma />, label: 'Figma' },
    { icon: <MdDesignServices />, label: 'Zeplin' },
    { icon: <SiAdobexd />, label: 'Adobe XD' },
    { icon: <FaGitAlt />, label: 'Git' },
    { icon: <SiSlack />, label: 'Slack' },
    { icon: <SiNotion />, label: 'Notion' },
    { icon: <SiGithub />, label: 'GitHub' },
  ];

  return (
    <Box className="mainPage page-03">
      <Box className="mainWrap">
        <Box className="category-box">
          <Typography variant="category" component={'div'}>
            Tech Stack & Tools
          </Typography>
        </Box>
        <Divider variant="cateLine" />
        <Box className="contents-box">
          <Typography variant="h4" component="h2" gutterBottom>
            기술 스택과 도구를 활용하여 개발하고 있습니다.
          </Typography>
          <Grid container spacing={2} className="">
            <Grid size={8}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  Tech Stack
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {chips.map((chip, index) => {
                    const color = chipColors[index % chipColors.length];
                    return (
                      <Chip
                        key={`${chip.label}-${index}`}
                        icon={chip.icon}
                        label={chip.label}
                        variant="isIcon"
                        sx={{
                          borderColor: color,
                          bgcolor: color,
                        }}
                      />
                    );
                  })}
                </Box>
              </Paper>
            </Grid>

            <Grid size={4}>
              <Paper elevation={3} sx={{ padding: '1rem' }}>
                <Typography variant="h1" component={'div'}>
                  Tools
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {chipsTool.map((chipTool, index) => {
                    const color = chipColors[index % chipColors.length];
                    return (
                      <Chip
                        key={`${chipTool.label}-${index}`}
                        icon={chipTool.icon}
                        label={chipTool.label}
                        variant="isIcon"
                        sx={{
                          borderColor: color,
                          bgcolor: color,
                        }}
                      />
                    );
                  })}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
