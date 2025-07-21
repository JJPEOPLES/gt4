import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Stack,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Updates', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Community', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: '#' },
    { icon: <TwitterIcon />, href: '#' },
    { icon: <InstagramIcon />, href: '#' },
    { icon: <GitHubIcon />, href: '#' }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        pt: 8,
        pb: 4,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  mb: 2,
                  fontSize: '1.8rem'
                }}
              >
                GT4
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 3, maxWidth: '300px' }}
              >
                A powerful web-based drawing engine for artists who want professional tools without the high cost.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton 
                    key={index} 
                    color="primary"
                    sx={{ 
                      '&:hover': { 
                        transform: 'translateY(-3px)',
                        color: 'primary.light'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>
          
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Typography 
                variant="subtitle1" 
                color="text.primary"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex} 
                    href={link.href}
                    color="text.secondary"
                    underline="hover"
                    sx={{ 
                      '&:hover': { color: 'primary.main' },
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          <Grid item xs={12} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              color="text.primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Download
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease'
                }}
              >
                iOS App
              </Link>
              <Link 
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease'
                }}
              >
                Android App
              </Link>
              <Link 
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease'
                }}
              >
                Windows
              </Link>
              <Link 
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease'
                }}
              >
                macOS
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GT4 Drawing Engine. All rights reserved.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }}>
            <Link href="#" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Cookie Policy
            </Link>
            <Tooltip title="GT4 Creator Access">
              <Link 
                component={RouterLink} 
                to="/creator-login" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Creator
              </Link>
            </Tooltip>
            <Tooltip title="Find Creator Account">
              <Link 
                component={RouterLink} 
                to="/find-creator" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Find Account
              </Link>
            </Tooltip>
            <Tooltip title="Auto-Login as Prime">
              <Link 
                component={RouterLink} 
                to="/creator-autologin" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Prime Auto-Login
              </Link>
            </Tooltip>
            <Tooltip title="Reset Creator Password">
              <Link 
                component={RouterLink} 
                to="/reset-creator-password" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Reset Password
              </Link>
            </Tooltip>
            <Tooltip title="Firebase Setup Guide">
              <Link 
                component={RouterLink} 
                to="/firebase-guide" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Firebase Guide
              </Link>
            </Tooltip>
            <Tooltip title="Fix Creator Account Issues">
              <Link 
                component={RouterLink} 
                to="/fix-creator" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Fix Creator Account
              </Link>
            </Tooltip>
            <Tooltip title="Supabase Connection Test">
              <Link 
                component={RouterLink} 
                to="/supabase-test" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Supabase Test
              </Link>
            </Tooltip>
            <Tooltip title="Initialize Creator with Supabase">
              <Link 
                component={RouterLink} 
                to="/supabase-init-creator" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Supabase Init
              </Link>
            </Tooltip>
            <Tooltip title="Creator Login with Supabase">
              <Link 
                component={RouterLink} 
                to="/supabase-creator-login" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Supabase Login
              </Link>
            </Tooltip>
            <Tooltip title="Supabase Admin Panel">
              <Link 
                component={RouterLink} 
                to="/supabase-admin" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Supabase Admin
              </Link>
            </Tooltip>
            <Tooltip title="Supabase Creator Test">
              <Link 
                component={RouterLink} 
                to="/supabase-creator-test" 
                color="text.secondary" 
                underline="hover"
                sx={{ 
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                  fontWeight: 'bold'
                }}
              >
                Creator Test
              </Link>
            </Tooltip>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;