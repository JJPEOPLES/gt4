import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import LockIcon from '@mui/icons-material/Lock';

const FirebaseGuide: React.FC = () => {
  const navigate = useNavigate();

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
            <StorageIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Firebase Configuration Guide
            </Typography>
            <Typography variant="body1" color="text.secondary">
              How to find your Firebase project configuration details
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Step 1: Go to your Firebase Console
          </Typography>
          
          <Typography variant="body1" paragraph>
            Visit the Firebase Console at{' '}
            <Link 
              href="https://console.firebase.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              console.firebase.google.com
            </Link>
            {' '}and select your project.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Step 2: Find your project settings
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SettingsIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="body1">
              Click on the gear icon (⚙️) next to "Project Overview" in the left sidebar, then select "Project settings".
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Step 3: Get your Web App configuration
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <WebIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Find the 'Your apps' section" 
                secondary="Look for the section labeled 'Your apps' at the bottom of the General tab" 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CodeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="If you already have a web app" 
                secondary="Click on the web app icon (</>) to view its details" 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="If you don't have a web app yet" 
                secondary="Click on the web icon (</>) to add a new web app to your project" 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <LockIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="View your configuration" 
                secondary="In the 'SDK setup and configuration' section, you'll see your Firebase configuration object with all the details you need" 
              />
            </ListItem>
          </List>

          <Box 
            sx={{ 
              bgcolor: 'background.default', 
              p: 2, 
              borderRadius: 1,
              my: 3
            }}
          >
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', m: 0 }}>
{`// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};`}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            Copy these values and use them to update your <code>src/firebase.ts</code> file.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Step 4: Enable Authentication and Firestore
          </Typography>
          
          <Typography variant="body1" paragraph>
            For GT4 to work properly, you need to:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Enable Email/Password Authentication" 
                secondary="Go to Authentication > Sign-in method > Email/Password and enable it" 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Create a Firestore Database" 
                secondary="Go to Firestore Database and create a database in test mode" 
              />
            </ListItem>
          </List>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/init-creator')}
            >
              Initialize Creator Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FirebaseGuide;