import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Button,
  Alert,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { findCreatorAccount } from '../utils/findCreatorAccount';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import InfoIcon from '@mui/icons-material/Info';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const FindCreator: React.FC = () => {
  const [creatorInfo, setCreatorInfo] = useState<{email: string, uid: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatorInfo = async () => {
      try {
        const info = await findCreatorAccount();
        setCreatorInfo(info);
        if (info) {
          console.log("Creator account found:", info.email);
        } else {
          console.log("No creator account found");
        }
      } catch (err) {
        setError('Failed to find creator account information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorInfo();
  }, []);
  
  const handlePasswordReset = async () => {
    if (!creatorInfo?.email) return;
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, creatorInfo.email);
      setResetSent(true);
      setResetError(null);
    } catch (err) {
      console.error("Error sending password reset:", err);
      setResetError("Failed to send password reset email. Please try again.");
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
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              GT4 Creator Account Info
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This page helps you find your existing creator account.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : creatorInfo ? (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Creator account found!
              </Alert>
              
              <Box sx={{ mb: 3 }}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Username" 
                      secondary="Prime" 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={creatorInfo.email} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <KeyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Password" 
                      secondary="Use the password you set during initialization or reset it below" 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Account ID" 
                      secondary={creatorInfo.uid} 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {resetSent ? (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Password reset email sent to {creatorInfo.email}. Check your inbox!
                </Alert>
              ) : resetError ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {resetError}
                </Alert>
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Forgot your password? You can reset it:
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handlePasswordReset}
                  >
                    Send Password Reset Email
                  </Button>
                </Box>
              )}
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  You can now log in with these credentials at the creator login page.
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/creator-login')}
                >
                  Go to Creator Login
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Alert severity="warning" sx={{ mb: 3 }}>
                No creator account found. You need to initialize one.
              </Alert>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                If you're sure you've already created a Prime account but it's not being found,
                it might be due to database permissions or structure changes.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/init-creator')}
                >
                  Initialize Creator Account
                </Button>
                
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  }}
                >
                  Try Again
                </Button>
              </Box>
            </>
          )}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
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

export default FindCreator;