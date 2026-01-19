import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: '"NanumSquare","Roboto", "Noto Sans KR", sans-serif',
    allVariants: {
      fontSize: '1.4rem',
    },
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.4rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    subtitle2: {
      fontSize: '1.4rem',
    },
    caption: {
      fontSize: '1.4rem',
    },
    overline: {
      fontSize: '1.4rem',
    },
    button: {
      fontSize: '1.4rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '10px',
        },
        body: {
          fontSize: '1.4rem',
          margin: 0,
          color: '#111111',
        },
        '.MuiTypography-root, .MuiButton-root, .MuiButtonBase-root, .MuiInputBase-root, .MuiFormLabel-root, .MuiFormHelperText-root, .MuiTab-root, .MuiPaginationItem-root, .MuiListItemText-primary, .MuiListItemText-secondary, .MuiMenuItem-root, .MuiSelect-select, .MuiChip-label':
          {
            fontSize: '1.4rem',
          },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // fontSize: '1.4rem',
        },
      },
      variants: [
        {
          props: { variant: 'isFocus' },
          style: {
            color: '#f44',
            fontWeight: 'bold',
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // fontSize: '1.4rem',
        },
      },
      variants: [
        {
          props: { variant: 'isFocus' },
          style: {
            color: '#f44',
            fontWeight: 'bold',
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'isGood' },
          style: {
            backgroundColor: '#1f4b99',
            color: '#ffffff',
            borderRadius: 999,
            paddingInline: '1.6rem',
            boxShadow: '0 6px 16px rgba(31, 75, 153, 0.25)',
          },
        },
        {
          props: { variant: 'isWarning' },
          style: {
            backgroundColor: '#ff4',
            color: '#111',
            borderRadius: 999,
            paddingInline: '1.6rem',
            boxShadow: '0 6px 16px rgba(31, 75, 153, 0.25)',
          },
        },
        {
          props: { variant: 'isBad' },
          style: {
            backgroundColor: '#f44',
            color: '#ffffff',
            borderRadius: 999,
            paddingInline: '1.6rem',
            boxShadow: '0 6px 16px rgba(31, 75, 153, 0.25)',
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '1.4rem',
          textTransform: 'none',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.4rem',
        },
        secondary: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 'auto',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
  },
});

export default theme;
