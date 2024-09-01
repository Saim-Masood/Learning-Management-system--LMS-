// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // Import your firebase auth

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
    handleMenuClose(); // Close the menu after logging out
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Learning Management System
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    
          <Avatar
            alt="User Logo"
            sx={{ marginLeft: 2, cursor: 'pointer' }}
            onClick={handleMenuOpen} // Open menu on Avatar click
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
