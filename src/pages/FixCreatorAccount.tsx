import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { findAndFixCreatorAccount } from '../utils/fixCreatorAccount';

const FixCreatorAccount: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [creatorInfo, setCreatorInfo] = useState<{
    email: string;
    uid: string;
    displayName: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleFixAccount = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCreatorInfo(null);
    
    try {
      const result = await findAndFixCreatorAccount();
      
      if (result.success) {
        setSuccess(result.message);
        if (result.creatorInfo) {
          setCreatorInfo(result.creatorInfo);
        }
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      console.error("Error fixing creator account:", err);
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
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <BuildIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Fix Creator Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This utility will find and fix issues with the Prime creator account
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Checking and fixing creator account...
              </Typography>
            </Box>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}
              
              {creatorInfo && (
                <Box sx={{ my: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Creator Account Information
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Display Name" 
                        secondary={creatorInfo.displayName} 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={creatorInfo.email} 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="User ID" 
                        secondary={creatorInfo.uid} 
                      />
                    </ListItem>
                  </List>
                </Box>
              )}
              
              <Box sx={{ my: 3 }}>
                <Typography variant="body1" paragraph>
                  This utility will:
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Check for existing creator accounts" 
                      secondary="Looks for users with isCreator=true or displayName='Prime'" 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Fix missing creator flags" 
                      secondary="Ensures the Prime user has isCreator=true" 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Update creator reference" 
                      secondary="Creates or updates the creator-account-check document" 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleFixAccount}
                sx={{ mt: 3 }}
              >
                Find & Fix Creator Account
              </Button>
            </>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Return to Home
            </Button>
            
            {creatorInfo && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/creator-autologin')}
              >
                Try Auto-Login
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FixCreatorAccount;