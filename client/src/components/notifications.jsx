import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Sidebar from './ui/sidebar';
import { FullWidthBackground } from './login/login';

export const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch notifications from the API when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:4000/notifications/${userId}`);
        const data = await response.json();
        setNotifications(data); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]); 

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FullWidthBackground>
      <div className="flex flex-row">
      <Sidebar/>
      <TableContainer >
        <Typography variant="h6" sx={{ margin: 2 }}>Notifications</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No notifications available.
                </TableCell>
              </TableRow>
            ) : (
              notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{new Date(notification.notificationdate).toLocaleString()}</TableCell>
                  <TableCell>{notification.notificationtext}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </FullWidthBackground>
  );
};

export default Notifications;
