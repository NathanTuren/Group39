import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Notifications from '../notifications';
import '../../app.css';
import { useNavigate } from 'react-router-dom';

// Custom styles for the navbar
const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgb(255, 255, 255)', // Same background color
  boxShadow: 'none',
});

export const Navbar = () => {
  // State to handle menu interactions
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar className="bg-white" position="static">
      <Toolbar className="items-center justify-center">
        <img src="/images/volunteer.png" alt="Logo" width="75" />
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'brown' }} onClick={() => navigate('/')} className="cursor-pointer">
          VolunteerMatch
        </Typography>

        {/* <Stack direction="row" spacing={2}>
          <Notifications />

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ color: 'brown' }} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsIcon fontSize="small" sx={{ marginRight: 1 }} />
              Settings
            </MenuItem>
          </Menu>
        </Stack> */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
