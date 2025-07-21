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
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {React.cloneElement(children as React.ReactElement, {
        style: {
          visibility: trigger ? 'hidden' : 'visible',
          transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
        }
      })}
    </Slide>
  );
}

const Header: React.FC = () => {
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
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' }
  ];

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
          <ListItem key={item.name} disablePadding>
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
            sx={{ py: 1.5 }}
          >
            Start Drawing
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
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
                  sx={{ 
                    fontWeight: 500,
                    opacity: 0.9,
                    '&:hover': {
                      opacity: 1,
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Button 
                variant="contained" 
                color="primary"
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
    </HideOnScroll>
  );
};

export default Header;