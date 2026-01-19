// material
import { useSetHeaderProps } from '@/models/headerContext';
import {
  Masonry,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Box, Paper, styled } from '@mui/material';
import { useEffect } from 'react';

// ========= Dashboard ========= //

export default function Dashboard() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Dashboard',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <Box>
      <Timeline
        position="alternate"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 1,
          },
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">09:30 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Masonry columns={4} spacing={2}>
              {heights.map((height, index) => (
                <Item key={index} sx={{ height }}>
                  {index + 1}
                </Item>
              ))}
            </Masonry>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">10:00 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">12:00 pm</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Lunch</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">03:00 pm</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Review</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">05:30 pm</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
          </TimelineSeparator>
          <TimelineContent>Wrap up</TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
