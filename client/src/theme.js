import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#44D62C',
    },
    secondary: {
      main: '#64FFDA',
    },
    error: {
      main: '#ff5252',
    },
    background: {
      default: '#050505',
      paper: '#0A0A0A',
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: '"Comfortaa", "Lexend", sans-serif',
    h1: {
      fontFamily: '"Comfortaa", cursive',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Comfortaa", cursive',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Comfortaa", cursive',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Lexend", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '0.8rem 1.5rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 17, 17, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(68, 214, 44, 0.2)',
        },
      },
    },
  },
});

export default theme;
