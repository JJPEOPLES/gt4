import React, { useState } from 'react';
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
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Back to GT4', path: '/', isExternal: true },
    { name: 'Features', path: '/#features' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'About', path: '/#about' }
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700, 
              color: 'primary.main',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            GT5
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem 
                        button 
                        key={item.name} 
                        onClick={() => {
                          if (item.isExternal) {
                            window.location.href = item.path;
                          } else {
                            navigate(item.path);
                          }
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                    <ListItem>
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        onClick={() => navigate('/draw')}
                      >
                        Start Drawing
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.name}
                    color={item.isExternal ? "primary" : "inherit"}
                    sx={{ 
                      mx: 1,
                      ...(item.isExternal && {
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600
                      })
                    }}
                    onClick={() => {
                      if (item.isExternal) {
                        window.location.href = item.path;
                      } else {
                        navigate(item.path);
                      }
                    }}
                    startIcon={item.isExternal ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                    ) : null}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={() => navigate('/draw')}
                >
                  Start Drawing
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;