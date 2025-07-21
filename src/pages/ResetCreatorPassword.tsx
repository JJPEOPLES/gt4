import React, { useState } from 'react';
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
import { resetCreatorPassword } from '../utils/resetCreatorPassword';
import KeyIcon from '@mui/icons-material/Key';

const ResetCreatorPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await resetCreatorPassword();
      
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

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
            <KeyIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Reset Creator Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This utility will reset the Prime creator account password to a known value.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Resetting password...
              </Typography>
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : success ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          ) : (
            <Box sx={{ my: 2 }}>
              <Typography variant="body2" paragraph>
                Click the button below to reset the Prime creator account password to a simple, 
                known value. This is useful if you've forgotten the password.
              </Typography>
              <Typography variant="body2" paragraph fontWeight="bold" color="warning.main">
                Note: This will only work if you're able to log in with one of the default passwords.
                If none of the default passwords work, you'll need to use the email-based password reset.
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!loading && !success && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            )}
            
            {success && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/creator-login')}
              >
                Go to Login
              </Button>
            )}
            
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate('/find-creator')}
            >
              Find Creator Account
            </Button>
            
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetCreatorPassword;