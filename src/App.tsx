import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DrawingApp from './pages/DrawingApp';
import AdminPage from './pages/AdminPage';
import CreatorLogin from './pages/CreatorLogin';
import InitCreator from './pages/InitCreator';
import FindCreator from './pages/FindCreator';
import CreatorAutoLogin from './pages/CreatorAutoLogin';
import ResetCreatorPassword from './pages/ResetCreatorPassword';
import FirebaseSetup from './pages/FirebaseSetup';
import FirebaseGuide from './pages/FirebaseGuide';
import FixCreatorAccount from './pages/FixCreatorAccount';
import SupabaseInitCreator from './pages/SupabaseInitCreator';
import SupabaseConnectionTest from './pages/SupabaseConnectionTest';
import SupabaseCreatorLogin from './pages/SupabaseCreatorLogin';
import SupabaseAdminPage from './pages/SupabaseAdminPage';
import SupabaseCreatorTest from './pages/SupabaseCreatorTest';
import { AuthProvider } from './components/Auth/AuthContext';
import './styles/App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6200EA',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
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
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<DrawingApp />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/creator-login" element={<CreatorLogin />} />
              <Route path="/creator-autologin" element={<CreatorAutoLogin />} />
              <Route path="/reset-creator-password" element={<ResetCreatorPassword />} />
              <Route path="/init-creator" element={<InitCreator />} />
              <Route path="/find-creator" element={<FindCreator />} />
              <Route path="/fix-creator" element={<FixCreatorAccount />} />
              <Route path="/firebase-setup" element={<FirebaseSetup />} />
              <Route path="/firebase-guide" element={<FirebaseGuide />} />
              <Route path="/supabase-init-creator" element={<SupabaseInitCreator />} />
              <Route path="/supabase-test" element={<SupabaseConnectionTest />} />
              <Route path="/supabase-creator-login" element={<SupabaseCreatorLogin />} />
              <Route path="/supabase-admin" element={<SupabaseAdminPage />} />
              <Route path="/supabase-creator-test" element={<SupabaseCreatorTest />} />
              <Route path="/GT5/*" element={<Navigate to="/GT5/index.html" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;