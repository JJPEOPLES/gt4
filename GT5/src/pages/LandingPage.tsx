import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import LayersIcon from '@mui/icons-material/Layers';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingPage/Header';
import Footer from '../components/LandingPage/Footer';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <BrushIcon fontSize="large" color="primary" />,
      title: "AI-Enhanced Brushes",
      description: "Experience next-gen brushes with AI-powered stroke prediction and automatic smoothing for professional results."
    },
    {
      icon: <LayersIcon fontSize="large" color="primary" />,
      title: "Smart Layers",
      description: "Work with intelligent layers that automatically organize and suggest optimal blending modes for your artwork."
    },
    {
      icon: <ColorLensIcon fontSize="large" color="primary" />,
      title: "Color Harmony System",
      description: "Create perfect color schemes with our advanced harmony system that suggests complementary colors as you work."
    },
    {
      icon: <CloudSyncIcon fontSize="large" color="primary" />,
      title: "Cloud Collaboration",
      description: "Collaborate in real-time with other artists and export your work in multiple professional formats."
    }
  ];

  return (
    <Box className="landing-page">
      <Header />

      {/* Hero Section */}
      <Box 
        className="hero-section"
        sx={{
          background: 'linear-gradient(135deg, #0A1929 0%, #132F4C 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="fade-in">
                <Typography 
                  variant="h1" 
                  component="h1" 
                  color="primary"
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    fontWeight: 800
                  }}
                >
                  GT5 Drawing Engine
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 3,
                    color: 'text.secondary'
                  }}
                >
                  The Next Generation of Digital Art Creation
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ mb: 4, maxWidth: '90%', color: 'text.secondary' }}
                >
                  GT5 is a revolutionary drawing application that runs in your browser.
                  Experience advanced tools, AI-assisted features, and a seamless workflow
                  designed for professional artists. 100% free for everyone!
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => navigate('/draw')}
                  sx={{ 
                    py: 1.5, 
                    px: 4,
                    fontSize: '1.1rem',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 15px rgba(255, 87, 34, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Drawing Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="slide-up">
                <Box 
                  sx={{ 
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%',
                      background: 'rgba(255, 87, 34, 0.2)',
                      filter: 'blur(80px)',
                      top: '-50px',
                      right: '-50px',
                      zIndex: 0
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src="/hero-image.png" 
                    alt="GT5 Drawing Engine Interface"
                    sx={{
                      width: '100%',
                      maxWidth: '550px',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Next-Gen Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      bgcolor: 'background.default',
                      borderRadius: '12px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)'
                      }
                    }}
                    elevation={3}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        align="center"
                        sx={{ mb: 2, fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={() => navigate('/draw')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: '1.1rem'
              }}
            >
              Try GT5 Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;