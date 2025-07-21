import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useAuth } from '../components/Auth/AuthContext';
import AdminPanel from '../components/Admin/AdminPanel';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { currentUser, userProfile, isCreator } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect non-creator users
    if (currentUser && userProfile && !isCreator) {
      navigate('/');
    }
  }, [currentUser, userProfile, isCreator, navigate]);

  if (!currentUser) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          You need to be logged in to access this page.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  if (!isCreator) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This area is restricted to the GT4 creator.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GT4 Admin
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Back to Site
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AdminPanel />
      </Container>
    </Box>
  );
};

export default AdminPage;