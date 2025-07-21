import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkFirebaseConfig } from '../utils/checkFirebaseConfig';
import StorageIcon from '@mui/icons-material/Storage';

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const FirebaseSetup: React.FC = () => {
  const [config, setConfig] = useState<FirebaseConfig>({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // Check if firebase.ts exists and try to load the configuration
  useEffect(() => {
    const loadExistingConfig = async () => {
      try {
        setLoading(true);
        
        // Try to import the firebase.ts file
        const firebaseModule = await import('../firebase');
        
        // Check if the configuration is valid
        const result = await checkFirebaseConfig();
        
        if (result.valid) {
          setSuccess("Your Firebase configuration is valid!");
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error loading Firebase config:", err);
        setError("Could not load Firebase configuration. You may need to set it up.");
      } finally {
        setLoading(false);
      }
    };

    loadExistingConfig();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value
    });
  };

  const handleCheckConfig = async () => {
    setChecking(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Generate the firebase.ts content
      const firebaseContent = `
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${config.appId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
      `;
      
      // Display the generated code
      setSuccess("Configuration generated! Copy this code to your firebase.ts file:");
      console.log(firebaseContent);
      
      // Move to the next step
      setActiveStep(1);
    } catch (err: any) {
      console.error("Error checking config:", err);
      setError(err.message || "An error occurred while checking the configuration");
    } finally {
      setChecking(false);
    }
  };

  const steps = [
    'Enter Firebase Configuration',
    'Save Configuration',
    'Initialize Creator Account'
  ];

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
              Firebase Configuration Setup
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Set up your Firebase project to enable GT4's backend features
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : success ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          ) : null}

          {activeStep === 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Step 1: Enter your Firebase project details
              </Typography>
              
              <Typography variant="body2" paragraph>
                You need to create a Firebase project and get your configuration details.
                <Link 
                  href="https://console.firebase.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ ml: 1 }}
                >
                  Go to Firebase Console
                </Link>
              </Typography>
              
              <Box component="form" sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="API Key"
                  name="apiKey"
                  value={config.apiKey}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                
                <TextField
                  fullWidth
                  label="Auth Domain"
                  name="authDomain"
                  value={config.authDomain}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  placeholder="your-project-id.firebaseapp.com"
                />
                
                <TextField
                  fullWidth
                  label="Project ID"
                  name="projectId"
                  value={config.projectId}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                
                <TextField
                  fullWidth
                  label="Storage Bucket"
                  name="storageBucket"
                  value={config.storageBucket}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  placeholder="your-project-id.appspot.com"
                />
                
                <TextField
                  fullWidth
                  label="Messaging Sender ID"
                  name="messagingSenderId"
                  value={config.messagingSenderId}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                
                <TextField
                  fullWidth
                  label="App ID"
                  name="appId"
                  value={config.appId}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  placeholder="1:123456789012:web:1234567890abcdef123456"
                />
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCheckConfig}
                  disabled={checking || !config.apiKey || !config.projectId}
                  sx={{ mt: 3 }}
                >
                  {checking ? <CircularProgress size={24} /> : "Generate Configuration"}
                </Button>
              </Box>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h6" gutterBottom>
                Step 2: Save your Firebase configuration
              </Typography>
              
              <Typography variant="body2" paragraph>
                Copy the generated code and save it to <code>src/firebase.ts</code> in your project.
              </Typography>
              
              <Box 
                sx={{ 
                  bgcolor: 'background.default', 
                  p: 2, 
                  borderRadius: 1,
                  overflowX: 'auto',
                  my: 2
                }}
              >
                <pre style={{ margin: 0 }}>
{`import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${config.appId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };`}
                </pre>
              </Box>
              
              <Typography variant="body2" paragraph>
                After saving the file, rebuild your application with:
              </Typography>
              
              <Box 
                sx={{ 
                  bgcolor: 'background.default', 
                  p: 2, 
                  borderRadius: 1,
                  my: 2
                }}
              >
                <code>npm run build</code>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => setActiveStep(2)}
                sx={{ mt: 3 }}
              >
                Continue to Next Step
              </Button>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography variant="h6" gutterBottom>
                Step 3: Initialize Creator Account
              </Typography>
              
              <Typography variant="body2" paragraph>
                Now that your Firebase configuration is set up, you need to initialize the Prime creator account.
              </Typography>
              
              <Typography variant="body2" paragraph>
                Make sure you've enabled Authentication in your Firebase project and set up Firestore database.
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/init-creator')}
                sx={{ mt: 3 }}
              >
                Go to Creator Initialization
              </Button>
            </>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
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

export default FirebaseSetup;