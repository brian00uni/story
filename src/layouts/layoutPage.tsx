import Header from '@/layouts/comp/Header';
import { HeaderPropsProvider, type HeaderProps } from '@/models/headerContext';
import { FileCopy, Print, Save, Share } from '@mui/icons-material';
import { Box, Container, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

// ==============================|| LAYOUT - AUTH ||============================== //

export default function LayoutPage() {
  const [headerProps, setHeaderPropsState] = useState<HeaderProps>({
    pageTitle: '',
    backButton: false,
    closeButton: false,
    fnGoBack: undefined,
  });

  const actions = [
    { icon: <FileCopy />, name: '복사' },
    { icon: <Save />, name: '저장' },
    { icon: <Print />, name: '출력' },
    { icon: <Share />, name: '공유' },
  ];

  const setHeaderProps = useCallback((props: Partial<HeaderProps>) => {
    setHeaderPropsState((prev) => ({ ...prev, ...props }));
  }, []);

  return (
    <Box className="wrapper">
      <Header headerProps={headerProps} />
      <Container className="container">
        <HeaderPropsProvider value={setHeaderProps}>
          <Outlet />
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                slotProps={{
                  tooltip: {
                    title: action.name,
                  },
                }}
              />
            ))}
          </SpeedDial>
        </HeaderPropsProvider>
      </Container>
    </Box>
  );
}
