import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { initCreatorAccount, isCreatorAccountInitialized } from '../utils/supabaseInitCreatorAccount';

const SupabaseInitCreator: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState<boolean | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // Check if creator account has already been initialized
  useEffect(() => {
    const checkInitialization = async () => {
      try {
        const isInitialized = await isCreatorAccountInitialized();
        setInitialized(isInitialized);
      } catch (err: any) {
        console.error("Error checking initialization:", err);
        setError(`Error checking if creator account is initialized: ${err.message}`);
      }
    };
    
    checkInitialization();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      // Check if creator account is already initialized
      const isInitialized = await isCreatorAccountInitialized();
      if (isInitialized) {
        setError('Creator account has already been initialized. Please use the login page.');
        setInitialized(true);
        return;
      }
      
      const result = await initCreatorAccount(email, password);
      
      if (result) {
        setSuccess('Creator account initialized successfully! You can now log in.');
        setActiveStep(1);
      } else {
        setError('Failed to initialize creator account. It may already exist.');
      }
    } catch (err: any) {
      console.error("Error in initialization:", err);
      
      // Handle specific Supabase errors
      if (err.code === '23505') {
        setError('This email is already in use. Please try a different email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (err.message?.includes('network')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An error occurred during initialization');
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialized === true) {
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
              bgcolor: 'background.paper',
              textAlign: 'center'
            }}
          >
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Creator Already Initialized
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The GT4 creator account has already been initialized. You cannot run this process again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/creator-login')}
              sx={{ mt: 2 }}
            >
              Go to Creator Login
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

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
            <LockIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Initialize GT4 Creator Account (Supabase)
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This is a one-time setup to create the Prime creator account using Supabase.
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Create Account</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete</StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 ? (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  helperText="Must be at least 8 characters"
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Initialize Creator Account'}
                </Button>
              </Box>
            </>
          ) : (
            <>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}
              
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Initialization Complete
              </Typography>
              
              <Typography variant="body1" paragraph>
                Your GT4 creator account has been successfully created. You can now log in with the credentials you provided.
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Username: Prime
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/creator-login')}
                sx={{ mt: 2 }}
              >
                Go to Creator Login
              </Button>
            </>
          )}

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

export default SupabaseInitCreator;