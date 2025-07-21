import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/Admin/AdminPanel';
import { supabase } from '../supabase';

const SupabaseAdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setSession(sessionData.session);
        
        if (!sessionData.session) {
          setLoading(false);
          return;
        }
        
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionData.session.user.id)
          .single();
        
        if (profileError) {
          throw profileError;
        }
        
        console.log("Admin Page - Profile Data:", profileData);
        setProfile(profileData);
      } catch (err: any) {
        console.error('Error checking session:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if user is logged in
  if (!session) {
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
          onClick={() => navigate('/supabase-creator-login')}
        >
          Go to Creator Login
        </Button>
      </Box>
    );
  }

  // Check if user profile exists
  if (!profile) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Profile Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your user profile could not be found.
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

  // Check if user is creator
  if (!profile.is_creator) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This area is restricted to the GT4 creator.
        </Typography>
        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          Your current status: Not a creator
        </Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/supabase-creator-test')}
        >
          Go to Creator Test
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GT4 Admin (Supabase)
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Back to Site
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {profile.display_name}
          </Typography>
          <Typography variant="body1">
            You are logged in as the GT4 creator using Supabase authentication.
          </Typography>
        </Box>
        
        <AdminPanel />
      </Container>
    </Box>
  );
};

export default SupabaseAdminPage;