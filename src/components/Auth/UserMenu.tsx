import React, { useState } from 'react';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Badge
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Image as ImageIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useAuth } from './AuthContext';
import LoginDialog from './LoginDialog';

const UserMenu: React.FC = () => {
  const { currentUser, userProfile, logOut, isCreator } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logOut();
    handleMenuClose();
  };

  const handleLoginClick = () => {
    setLoginDialogOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {currentUser ? (
        <>
          <IconButton
            onClick={handleMenuOpen}
            size="large"
            edge="end"
            color="inherit"
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={isCreator ? <StarIcon sx={{ fontSize: 14, color: '#FFD700' }} /> : null}
            >
              <Avatar 
                sx={{ 
                  bgcolor: isCreator ? '#6200EA' : 'primary.main',
                  width: 40,
                  height: 40,
                  border: isCreator ? '2px solid #FFD700' : 'none'
                }}
              >
                {userProfile?.displayName ? getInitials(userProfile.displayName) : 'U'}
              </Avatar>
            </Badge>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 220,
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {userProfile?.displayName}
                {isCreator && (
                  <StarIcon sx={{ ml: 0.5, fontSize: 16, color: '#FFD700', verticalAlign: 'text-top' }} />
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>
            
            <Divider />
            
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ImageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Artworks</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Collaborations</ListItemText>
            </MenuItem>
            
            {isCreator && (
              <MenuItem onClick={() => {
                handleMenuClose();
                window.location.href = '/admin';
              }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Admin Panel</ListItemText>
              </MenuItem>
            )}
            
            <Divider />
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleLoginClick}
          sx={{ 
            borderRadius: '20px',
            px: 2
          }}
        >
          Sign In
        </Button>
      )}
      
      <LoginDialog 
        open={loginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)} 
      />
    </>
  );
};

export default UserMenu;