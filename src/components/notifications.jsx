import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

export const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="large" aria-label="show notifications" color="inherit" onClick={handleOpen}>
        <Badge badgeContent={1} color="secondary"> {/* Badge to indicate number of notifications */}
          <MailIcon sx={{ color: 'brown' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>You have a new message</MenuItem> {/* Sample notification */}
        <MenuItem onClick={handleClose}>Reminder: Volunteer event tomorrow at 10 AM</MenuItem>
      </Menu>
    </>
  );
};

export default Notifications;
