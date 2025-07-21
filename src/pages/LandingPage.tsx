import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Stack,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import LayersIcon from '@mui/icons-material/Layers';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SimpleHeader from '../components/LandingPage/SimpleHeader';
import Footer from '../components/LandingPage/Footer';
import GallerySection from '../components/LandingPage/GallerySection';
import AboutSection from '../components/LandingPage/AboutSection';
import PricingSection from '../components/LandingPage/PricingSection';
import CodingJourney from '../components/LandingPage/CodingJourney';
import '../styles/LandingPage.css';


import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <BrushIcon fontSize="large" color="primary" />,
      title: "Professional Brushes",
      description: "Access a wide range of customizable brushes that respond to pressure and tilt for natural drawing experience."
    },
    {
      icon: <LayersIcon fontSize="large" color="primary" />,
      title: "Unlimited Layers",
      description: "Create complex artwork with unlimited layers, blending modes, and advanced layer management."
    },
    {
      icon: <ColorLensIcon fontSize="large" color="primary" />,
      title: "Advanced Color Tools",
      description: "Use color wheels, palettes, and eyedropper tools to find the perfect colors for your artwork."
    },
    {
      icon: <CloudDownloadIcon fontSize="large" color="primary" />,
      title: "Export Options",
      description: "Export your work in multiple formats including PNG, JPG, SVG, and PSD with customizable settings."
    }
  ];

  return (
    <Box className="landing-page">
      <SimpleHeader />

      {/* Hero Section */}
      <Box 
        className="hero-section"
        sx={{
          background: 'linear-gradient(135deg, #121212 0%, #2D2D2D 100%)',
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
                  GT4 Drawing Engine
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 3,
                    color: 'text.secondary'
                  }}
                >
                  Created by an 11-year-old. Better than Procreate.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ mb: 4, maxWidth: '90%', color: 'text.secondary' }}
                >
                  A professional-grade drawing application that runs in your browser. 
                  Create stunning digital art with tools that rival expensive software.
                  100% free for everyone!
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => navigate('/app')}
                  sx={{ 
                    py: 1.5, 
                    px: 4,
                    fontSize: '1.1rem',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 15px rgba(98, 0, 234, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Your Journey
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
                      background: 'rgba(98, 0, 234, 0.2)',
                      filter: 'blur(80px)',
                      top: '-50px',
                      right: '-50px',
                      zIndex: 0
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src="./hero-image.svg" 
                    alt="GT4 Drawing Engine Interface"
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
            Powerful Features
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
        </Container>
      </Box>

      {/* Gallery Section */}
      <GallerySection />

      {/* Pricing Section */}
      <PricingSection onStartJourney={() => navigate('/app')} />

      {/* About Section */}
      <AboutSection />
      
      {/* Coding Journey Section */}
      <CodingJourney />
      
      {/* GT5 Promotion Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0A1929' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#FF5722' // GT5 primary color
                }}
              >
                Try GT5 Beta
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Experience the next generation of our drawing engine. GT5 features a completely redesigned interface, 
                new AI-powered tools, and enhanced performance. It's currently in beta, and we'd love your feedback!
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                href="/GT5"
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontSize: '1.1rem',
                  bgcolor: '#FF5722', // GT5 primary color
                  '&:hover': {
                    bgcolor: '#FF7043', // Lighter shade
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 15px rgba(255, 87, 34, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Try GT5 Beta Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                <Box 
                  component="img"
                  src="/gt5-preview.svg" 
                  alt="GT5 Drawing Engine Interface"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(10, 25, 41, 0) 0%, rgba(10, 25, 41, 0.8) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        fontWeight: 700
                      }}
                    >
                      Beta Access
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      href="/GT5"
                      sx={{
                        bgcolor: '#FF5722',
                        '&:hover': {
                          bgcolor: '#FF7043'
                        }
                      }}
                    >
                      Try Now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
