import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { fixCreatorStatus, getAllUsers } from '../utils/supabaseFixCreator';

const SupabaseCreatorTest: React.FC = () => {
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
    setSession(null);
    setProfile(null);
    window.location.reload();
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
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Supabase Creator Test
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This page shows your current Supabase authentication status
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Session Status
                </Typography>
                {session ? (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    You are logged in
                  </Alert>
                ) : (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    You are not logged in
                  </Alert>
                )}
                
                {session && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                      User ID: {session.user.id}
                      {'\n'}
                      Email: {session.user.email}
                      {'\n'}
                      Created At: {new Date(session.user.created_at).toLocaleString()}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {profile && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Profile Data
                  </Typography>
                  <Alert 
                    severity={profile.is_creator ? "success" : "info"} 
                    sx={{ mb: 2 }}
                  >
                    {profile.is_creator 
                      ? "You have creator privileges" 
                      : "You do not have creator privileges"}
                  </Alert>
                  
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                      Display Name: {profile.display_name}
                      {'\n'}
                      Email: {profile.email}
                      {'\n'}
                      Is Creator: {profile.is_creator ? "Yes" : "No"}
                      {'\n'}
                      Joined At: {new Date(profile.joined_at).toLocaleString()}
                      {'\n'}
                      Artworks Count: {profile.artworks_count}
                      {'\n'}
                      Collaborations Count: {profile.collaborations_count}
                      {'\n'}
                      User ID: {profile.id}
                    </Typography>
                  </Box>
                  
                  {!profile.is_creator && (
                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          try {
                            // Update the user's profile to set is_creator to true
                            const { data, error } = await supabase
                              .from('profiles')
                              .update({ is_creator: true })
                              .eq('id', profile.id);
                            
                            if (error) throw error;
                            
                            alert('Creator status updated! Please refresh the page.');
                            window.location.reload();
                          } catch (err: any) {
                            console.error('Error updating creator status:', err);
                            alert('Error updating creator status: ' + err.message);
                          }
                        }}
                      >
                        Make Me a Creator
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
                
                {session ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/supabase-creator-login')}
                  >
                    Log In
                  </Button>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SupabaseCreatorTest;