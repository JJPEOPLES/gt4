import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DrawingProvider } from './context/DrawingContext';
import './styles/App.css';

// Import pages
import LandingPage from './pages/LandingPage';
import DrawingEngine from './pages/DrawingEngine';

// Create a theme instance for GT5
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF5722', // GT5 primary color - Orange
    },
    secondary: {
      main: '#00BCD4', // GT5 secondary color - Cyan
    },
    background: {
      default: '#0A1929', // Darker blue background
      paper: '#132F4C', // Darker blue paper
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawingProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/draw" element={<DrawingEngine />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DrawingProvider>
    </ThemeProvider>
  );
}

export default App;