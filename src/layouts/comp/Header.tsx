import logoPdfCover from '@/assets/images/logo-pdf-cover.jpg';
import type { HeaderProps } from '@/models/headerContext';
import {
  ArrowBackIos,
  Close,
  Inbox,
  Mail,
  Menu,
  Notifications,
  Settings,
} from '@mui/icons-material';

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type HeaderLayoutProps = {
  headerProps?: HeaderProps;
};

export default function Header({ headerProps }: HeaderLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const mergedProps = {
    pageTitle: '',
    backButton: false,
    closeButton: false,
    fnGoBack: undefined as HeaderProps['fnGoBack'],
    ...headerProps,
  };

  const close = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
  };

  const goBack = () => {
    if (mergedProps.fnGoBack) {
      mergedProps.fnGoBack();
      return;
    }
    if (location.pathname === '/') {
      close();
      return;
    }
    navigate(-1);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const primaryNavItems = [
    { text: 'Home', to: '/' },
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Components', to: '/components' },
  ];
  const secondaryNavItems = [
    { text: 'Alarm', to: '/alarm' },
    { text: 'Settings', to: '/settings' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {primaryNavItems.map((item, index) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryNavItems.map((item, index) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{index % 2 === 0 ? <Notifications /> : <Settings />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="header">
      {location.pathname === '/' ? (
        <Button className="menu" onClick={toggleDrawer(true)}>
          <Menu />
        </Button>
      ) : null}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {mergedProps.backButton ? (
        <Button className="back" onClick={goBack}>
          <ArrowBackIos />
        </Button>
      ) : null}

      {location.pathname === '/' ? (
        <img src={logoPdfCover} alt="PDF cover logo" />
      ) : (
        <h1>{mergedProps.pageTitle}</h1>
      )}

      {mergedProps.closeButton ? (
        <Button className="close" onClick={close}>
          <Close />
        </Button>
      ) : null}

      {location.pathname === '/' ? (
        <Button className="alarm" onClick={() => navigate('/alarm')}>
          <Notifications />
        </Button>
      ) : null}
    </Box>
  );
}
