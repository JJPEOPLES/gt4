import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles/App.css';

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
  },
});

// Simple landing page component
const SimpleLandingPage = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8
      }}
    >
      <Button 
        startIcon={<ArrowBackIcon />}
        href="/"
        color="primary"
        sx={{ 
          position: 'absolute', 
          top: 20, 
          left: 20,
          textTransform: 'none'
        }}
      >
        Back to GT4
      </Button>
      
      <Container maxWidth="md">
        <Box 
          sx={{ 
            width: 150, 
            height: 150, 
            borderRadius: '50%', 
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            fontSize: '3rem',
            fontWeight: 'bold'
          }}
        >
          GT5
        </Box>
        
        <Typography variant="h2" component="h1" color="primary.main" gutterBottom fontWeight="bold">
          GT5 Drawing Engine
        </Typography>
        
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Next Generation Drawing Experience
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.2rem', maxWidth: 700, mx: 'auto' }}>
          GT5 is our next-generation drawing application with AI-enhanced brushes, smart layers, 
          and a completely redesigned interface. Experience the future of digital art creation.
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
          Currently in development. Full version coming soon!
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          href="/"
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Return to GT4
        </Button>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<SimpleLandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;