import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button,
  Fade,
  Zoom
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const features = [
  "Unlimited canvas size",
  "All professional tools",
  "Layer support",
  "Export in multiple formats",
  "Regular updates",
  "Cloud storage",
  "Custom brushes",
  "Advanced filters"
];

const PricingSection: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  return (
    <Box id="pricing" sx={{ 
      py: { xs: 8, md: 12 }, 
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'rgba(98, 0, 234, 0.05)',
        filter: 'blur(120px)',
        top: '-300px',
        right: '-200px',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Typography 
            variant="h2" 
            component="h2" 
            align="center"
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Completely Free Forever
          </Typography>
        </Fade>
        
        <Fade in={true} timeout={1500}>
          <Typography 
            variant="h6" 
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
          >
            Unlike other drawing applications, GT4 is 100% free with no hidden costs or subscriptions.
            Created by an 11-year-old who believes everyone should have access to powerful creative tools.
          </Typography>
        </Fade>
        
        <Zoom in={true} timeout={1000}>
          <Box 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4
            }}
          >
            <Card 
              sx={{ 
                flex: 1,
                p: 4,
                borderRadius: '24px',
                border: '2px solid',
                borderColor: 'grey.200',
                bgcolor: 'background.paper',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  Other Apps
                </Typography>
                <Typography 
                  variant="h3" 
                  color="text.primary"
                  sx={{ fontWeight: 800, mt: 1 }}
                >
                  $99.99
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per month
                </Typography>
              </Box>
              
              <List sx={{ mb: 3 }}>
                {features.slice(0, 4).map((feature, index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        color: 'text.secondary'
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
            
            <Card 
              sx={{ 
                flex: 1.2,
                p: 4,
                borderRadius: '24px',
                border: '3px solid',
                borderColor: 'primary.main',
                bgcolor: 'background.paper',
                boxShadow: '0 20px 40px rgba(98, 0, 234, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 20,
                  right: -30,
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 0.5,
                  px: 3,
                  transform: 'rotate(45deg)',
                  transformOrigin: 'top right',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  zIndex: 1,
                  width: 150,
                  textAlign: 'center'
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  BEST CHOICE
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="primary" />
                <Typography variant="h6" color="primary.main" fontWeight={600}>
                  GT4 Drawing Engine
                </Typography>
              </Box>
              
              <Typography 
                variant="h2" 
                color="primary.main"
                sx={{ fontWeight: 800, mt: 1 }}
              >
                $0
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                forever free
              </Typography>
              
              <List sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature} 
                      primaryTypographyProps={{ 
                        fontWeight: 500
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                fullWidth
                onClick={onStartJourney}
                sx={{ 
                  py: 1.5, 
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                Start Drawing Now
              </Button>
              
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                No credit card required • No hidden fees
              </Typography>
            </Card>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default PricingSection;