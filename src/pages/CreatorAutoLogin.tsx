import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Button,
  Alert,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { creatorAutoLogin } from '../utils/creatorAutoLogin';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../components/Auth/AuthContext';

const CreatorAutoLogin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const performAutoLogin = async () => {
      try {
        // If already logged in, just redirect
        if (currentUser) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/admin');
          }, 1500);
          return;
        }

        // Attempt auto-login
        const result = await creatorAutoLogin();
        
        if (result.success) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/admin');
          }, 1500);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Auto-login error:", err);
        setError("Failed to auto-login. Please try manual login.");
      } finally {
        setLoading(false);
      }
    };

    performAutoLogin();
  }, [currentUser, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              GT4 Creator Auto-Login
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Automatically logging you in as the Prime creator...
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Authenticating...
              </Typography>
            </Box>
          ) : error ? (
            <>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    window.location.reload();
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/creator-login')}
                >
                  Manual Login
                </Button>
              </Box>
            </>
          ) : success ? (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Successfully logged in as Prime creator!
              </Alert>
              <Typography variant="body2" color="text.secondary" paragraph textAlign="center">
                Redirecting to admin panel...
              </Typography>
              <CircularProgress size={24} sx={{ display: 'block', mx: 'auto' }} />
            </>
          ) : null}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatorAutoLogin;