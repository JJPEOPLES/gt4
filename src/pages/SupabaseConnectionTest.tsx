import React, { useState, useEffect } from 'react';
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
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { supabase } from '../supabase';

const SupabaseConnectionTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    internetConnection: boolean;
    supabaseInitialized: boolean;
    authService: boolean;
    databaseService: boolean;
    anonymousAuth: boolean;
    databaseRead: boolean;
    tablesExist: boolean;
  }>({
    internetConnection: false,
    supabaseInitialized: false,
    authService: false,
    databaseService: false,
    anonymousAuth: false,
    databaseRead: false,
    tablesExist: false
  });
  const navigate = useNavigate();

  const runConnectionTests = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const results = {
      internetConnection: false,
      supabaseInitialized: false,
      authService: false,
      databaseService: false,
      anonymousAuth: false,
      databaseRead: false,
      tablesExist: false
    };
    
    try {
      // Test internet connection
      try {
        const response = await fetch('https://www.google.com', { mode: 'no-cors' });
        results.internetConnection = true;
      } catch (err) {
        console.error("Internet connection test failed:", err);
      }
      
      // Test Supabase initialization
      if (supabase) {
        results.supabaseInitialized = true;
      }
      
      // Test Auth service
      if (results.supabaseInitialized) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error) {
            results.authService = true;
          }
        } catch (err) {
          console.error("Auth service test failed:", err);
        }
      }
      
      // Test Database service
      if (results.supabaseInitialized) {
        try {
          const { data, error } = await supabase.from('profiles').select('count');
          results.databaseService = !error;
        } catch (err) {
          console.error("Database service test failed:", err);
        }
      }
      
      // Test Anonymous Auth
      if (results.authService) {
        try {
          const { data, error } = await supabase.auth.signInAnonymously();
          results.anonymousAuth = !error;
          
          // Sign out after testing
          if (!error) {
            await supabase.auth.signOut();
          }
        } catch (err) {
          console.error("Anonymous auth test failed:", err);
        }
      }
      
      // Test Database Read
      if (results.databaseService) {
        try {
          const { data, error } = await supabase.from('profiles').select('*').limit(1);
          results.databaseRead = !error;
        } catch (err) {
          console.error("Database read test failed:", err);
        }
      }
      
      // Test if required tables exist
      if (results.databaseService) {
        try {
          // Check if profiles table exists
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('count');
          
          // Check if system_settings table exists
          const { data: settingsData, error: settingsError } = await supabase
            .from('system_settings')
            .select('count');
          
          results.tablesExist = !profilesError && !settingsError;
          
          if (profilesError && profilesError.code === '42P01') {
            console.error("Profiles table does not exist");
          }
          
          if (settingsError && settingsError.code === '42P01') {
            console.error("System_settings table does not exist");
          }
        } catch (err) {
          console.error("Tables existence test failed:", err);
        }
      }
      
      setTestResults(results);
      
      // Determine overall status
      if (results.internetConnection && results.supabaseInitialized && 
          results.authService && results.databaseService && 
          results.databaseRead && results.tablesExist) {
        setSuccess("All Supabase connection tests passed successfully!");
      } else if (!results.internetConnection) {
        setError("No internet connection detected. Please check your network connection.");
      } else if (!results.supabaseInitialized) {
        setError("Supabase is not properly initialized. Check your Supabase configuration.");
      } else if (!results.tablesExist) {
        setError("Required tables do not exist in your Supabase database. Please create them.");
      } else {
        setError("Some Supabase connection tests failed. See the test results for details.");
      }
    } catch (err: any) {
      console.error("Connection test error:", err);
      setError(err.message || "An unknown error occurred during connection tests");
    } finally {
      setLoading(false);
    }
  };

  // Run tests on component mount
  useEffect(() => {
    runConnectionTests();
  }, []);

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
            <NetworkCheckIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Supabase Connection Test
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This utility will test your connection to Supabase services
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Running connection tests...
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
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Test Results
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      {testResults.internetConnection ? 
                        <CheckCircleIcon color="success" /> : 
                        <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Internet Connection" 
                      secondary={testResults.internetConnection ? 
                        "Connected to the internet" : 
                        "No internet connection detected"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.supabaseInitialized ? 
                        <CheckCircleIcon color="success" /> : 
                        <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Supabase Initialization" 
                      secondary={testResults.supabaseInitialized ? 
                        "Supabase client is properly initialized" : 
                        "Supabase client is not initialized"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.authService ? 
                        <CheckCircleIcon color="success" /> : 
                        <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Authentication Service" 
                      secondary={testResults.authService ? 
                        "Authentication service is available" : 
                        "Authentication service is not available"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.databaseService ? 
                        <CheckCircleIcon color="success" /> : 
                        <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Database Service" 
                      secondary={testResults.databaseService ? 
                        "Database service is available" : 
                        "Database service is not available"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.anonymousAuth ? 
                        <CheckCircleIcon color="success" /> : 
                        testResults.authService ? <WarningIcon color="warning" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Anonymous Authentication" 
                      secondary={testResults.anonymousAuth ? 
                        "Anonymous authentication works" : 
                        testResults.authService ? "Anonymous authentication failed or is disabled" : "Not tested"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.databaseRead ? 
                        <CheckCircleIcon color="success" /> : 
                        testResults.databaseService ? <WarningIcon color="warning" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Database Read Access" 
                      secondary={testResults.databaseRead ? 
                        "Database read access works" : 
                        testResults.databaseService ? "Database read access failed" : "Not tested"} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      {testResults.tablesExist ? 
                        <CheckCircleIcon color="success" /> : 
                        testResults.databaseService ? <WarningIcon color="warning" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Required Tables Exist" 
                      secondary={testResults.tablesExist ? 
                        "All required tables exist" : 
                        testResults.databaseService ? "Some required tables are missing" : "Not tested"} 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={runConnectionTests}
                sx={{ mt: 3 }}
                disabled={loading}
              >
                Run Tests Again
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
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/supabase-init-creator')}
              disabled={loading}
            >
              Initialize Creator Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SupabaseConnectionTest;