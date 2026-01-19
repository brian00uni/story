// material
import { useSetHeaderProps } from '@/models/headerContext';
import { AddBusiness, Check } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
  type SnackbarCloseReason,
} from '@mui/material';
import React, { useEffect } from 'react';

// ========= Dashboard ========= //
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function Main() {
  const setHeaderProps = useSetHeaderProps();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('index-page');

    setHeaderProps({
      pageTitle: '',
      backButton: false,
      closeButton: false,
      fnGoBack: undefined,
    });
    return () => {
      root.classList.remove('index-page');
    };
  }, [setHeaderProps]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12} gap={5}>
        <Card>
          <CardContent>
            <AddBusiness fontSize="large" />
            <Typography variant="isFocus">텍스트 내용 내용 내용~~~ 블라 블라 블라</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* row 1 */}
      <Grid size={12}>
        <Button variant="isGood" onClick={handleClick}>
          toast SnackBar isGood
        </Button>
        <Button variant="isWarning">Button isWarning</Button>
        <Button variant="isBad">Button isBad</Button>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>aaa</Grid>

      <Alert icon={<Check fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
      </Alert>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs ">
            <Tab label="tab One" {...a11yProps(0)} />
            <Tab label="tab Two" {...a11yProps(1)} />
            <Tab label="tab Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>

      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>

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
