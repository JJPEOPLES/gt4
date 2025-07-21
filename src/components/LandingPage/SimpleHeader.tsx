import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UserMenu from '../Auth/UserMenu';
import LiveUserCount from '../LiveUserCount';

const SimpleHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Free', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'GT5 Beta', href: '/GT5', isExternal: true }
  ];
  
  const scrollToSection = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.location.href = href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
          GT4
        </Typography>
        <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            disablePadding 
            onClick={() => scrollToSection(item.href, item.isExternal)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText 
              primary={item.name} 
              sx={{ 
                textAlign: 'center',
                py: 1.5,
                '& .MuiTypography-root': {
                  fontSize: '1.1rem'
                }
              }} 
            />
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            fullWidth
            href="/app"
            sx={{ py: 1.5 }}
          >
            Start Drawing
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0}
        sx={{ 
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          bgcolor: scrolled ? 'rgba(18, 18, 18, 0.8)' : 'transparent',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? 1 : 0,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                color: scrolled ? 'text.primary' : 'primary.main'
              }}
            >
              GT4
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.name} 
                  color="inherit"
                  onClick={() => scrollToSection(item.href, item.isExternal)}
                  sx={{ 
                    fontWeight: 500,
                    opacity: 0.9,
                    '&:hover': {
                      opacity: 1,
                      background: 'rgba(255, 255, 255, 0.05)'
                    },
                    ...(item.isExternal && {
                      color: 'primary.main',
                      fontWeight: 600
                    })
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Button 
                variant="contained" 
                color="primary"
                href="/app"
                sx={{ 
                  ml: 2,
                  px: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(98, 0, 234, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Drawing
              </Button>
              
              <Box sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}>
                <UserMenu />
              </Box>
              
              <Box sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}>
                <LiveUserCount variant="compact" />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <UserMenu />
              </Box>
              
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <LiveUserCount variant="compact" />
              </Box>
              
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar /> {/* This empty Toolbar is for spacing */}
    </>
  );
};

export default SimpleHeader;