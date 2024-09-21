import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography
} from '@mui/material';
import { Card, CardContent, Grid, Button } from '@mui/material';

import { styled } from '@mui/system';

// Full width background that covers the screen
const FullWidthBackground = styled('div')({
    backgroundColor: 'rgb(249, 245, 235)', // Off-white background to match the style
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  
  // Form container without a box, similar to the login style
  const FormContainer = styled('div')({
    maxWidth: '1200px',
    width: '100%',
    padding: '0 20px',
  });

  const EventCatalogContainer = styled('div')({
    maxWidth: '1200px',
    width: '100%',
  });

  export const VolunteerHistoryAdmin = () => {
    // Hardcoded list of volunteers
    const volunteers = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '281-494-9999' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', phoneNumber: '832-999-2222' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phoneNumber: '123-232-5255' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', phoneNumber: '828-192-4226' },
      { id: 5, name: 'Ellie Gold', email: 'ellie@example.com', phoneNumber: '352-632-0302' },
      { id: 6, name: 'Ford Texan', email: 'ford@example.com', phoneNumber: '593-762-1592' },
    ];
  
    return (
        <FullWidthBackground>
                  <EventCatalogContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Volunteer History Log
        </Typography>

        <Grid container spacing={3}>
          {volunteers.map((volunteer) => (
            <Grid item xs={12} sm={6} md={4} key={volunteer.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {volunteer.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Email:</strong> {volunteer.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Phone Number:</strong> {volunteer.phoneNumber}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ marginTop: '15px', backgroundColor: 'brown' }}
                  >
                    Volunteer History
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </EventCatalogContainer>
        </FullWidthBackground>
    );
  };
