// material
import { useSetHeaderProps } from '@/models/headerContext';
import { Autocomplete, Box, Card, Grid, List, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';

// ========= Dashboard ========= //

export default function Components() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'components',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>aaa</Grid>
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
