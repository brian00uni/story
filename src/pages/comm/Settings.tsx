import { useSetHeaderProps } from '@/models/headerContext';
import { RemoveRedEye } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

export default function Settings() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Settings',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  return (
    <Box>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Card>
        <CardContent>
          <Typography variant="body2">텍스트 내용 내용 내용~~~ 블라 블라 블라</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: { xs: -0.5, sm: 0.5 },
            }}
          >
            <Typography variant="h3">Sign up</Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <form noValidate>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={''}
                    name="email"
                    placeholder="Enter email address"
                    fullWidth
                  />
                </Stack>

                <FormHelperText error id="standard-weight-helper-text-email-login">
                  ㄹㅇㅎㄴㅇㅀㄴ
                </FormHelperText>
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="-password-login"
                    type={'text'}
                    value={''}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          color="secondary"
                        >
                          <RemoveRedEye />
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>

                <FormHelperText error id="standard-weight-helper-text-password-login">
                  ㅇㅇㅇㅇ
                </FormHelperText>
              </Grid>
              <Grid sx={{ mt: -1 }} size={12}>
                <Stack
                  direction="row"
                  sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}
                >
                  <FormControlLabel
                    control={<Checkbox name="checked" color="primary" size="small" />}
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                </Stack>
              </Grid>
              <Grid size={12}>
                <Button fullWidth size="large" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
