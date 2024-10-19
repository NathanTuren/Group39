import React from 'react';
import { useState, useEffect } from 'react';
import {
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
const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
});

export const VolunteerHistoryAdmin = () => {
  const [volunteers, getVolunteerData] = useState([]);
  // Fetch volunteers from the backend using Node.js server (localhost:4000)
  const fetchVolunteers = async () => {
    try {
      const res = await fetch('http://localhost:4000/volunteers'); // fetch the appropriate API in this case we do a get to /volunteers
      const data = await res.json();
      getVolunteerData(data);
    } catch (err) {
      console.error('Error fetching volunteer data:', err);
    }
  };

  // We employ a useEffect to render all the data on loading of the page
  useEffect(() => {
    fetchVolunteers();
  }, []);

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
                  <Button
                    variant="contained"
                    fullWidth
                    href={`/volunteerHistory/${volunteer.id}`}
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
