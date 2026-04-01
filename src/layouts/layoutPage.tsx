import Header from '@/layouts/comp/Header';
import { HeaderPropsProvider, type HeaderProps } from '@/models/headerContext';
import { FileCopy, Print, Save, Share } from '@mui/icons-material';
import { Box, Container, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// ==============================|| LAYOUT - AUTH ||============================== //

type SpeedDialLinkAction = {
  icon: React.ReactNode;
  name: string;
  to: string;
};

export default function LayoutPage() {
  const navigate = useNavigate();
  const [headerProps, setHeaderPropsState] = useState<HeaderProps>({
    pageTitle: '',
    backButton: false,
    closeButton: false,
    fnGoBack: undefined,
  });

  const actions: SpeedDialLinkAction[] = [
    { icon: <FileCopy />, name: '게시판', to: '/board' },
    { icon: <Save />, name: '포트폴리오', to: '/history/portfolio' },
    { icon: <Print />, name: '대시보드', to: '/dashboard' },
    { icon: <Share />, name: '로또', to: '/lo' },
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
                onClick={() => navigate(action.to)}
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
