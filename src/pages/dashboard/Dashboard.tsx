// material
import { useSetHeaderProps } from '@/models/headerContext';
import {
  Autocomplete,
  Box,
  Card,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
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

  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={110}
      />

      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
        <FormControlLabel required control={<Switch />} label="Required" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
      </FormGroup>

      {/* row 1 */}

      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid />
        </Grid>

        <Stack direction="row" spacing={1}>
          <Chip label="Deletable" variant="isFocus" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip
            label="Clickable Link"
            component="a"
            href="https://www.daum.net/"
            variant="outlined"
            clickable
          />
        </Stack>

        <List>dddd</List>
        <Card sx={{ mt: 2 }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid />
        </Grid>
      </Grid>
    </Grid>
  );
}
