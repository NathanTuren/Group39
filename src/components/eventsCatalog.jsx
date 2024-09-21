import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';

const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
});

const events = [
  {
    id: 1,
    name: 'Community Cleanup',
    date: '2024-10-05',
    location: 'Central Park, NY',
    description: 'Help clean up the local park and make a difference in the community.',
  },
  {
    id: 2,
    name: 'Food Bank Volunteer',
    date: '2024-10-10',
    location: 'Food Bank, Los Angeles, CA',
    description: 'Assist with packaging and distributing food to those in need.',
  },
  {
    id: 3,
    name: 'Animal Shelter Helper',
    date: '2024-10-12',
    location: 'Animal Shelter, San Francisco, CA',
    description: 'Spend time with animals and help with daily tasks at the shelter.',
  },
];

export const EventsCatalog = () => {
  return (
    <FullWidthBackground>
      <EventCatalogContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Available Volunteer Events
        </Typography>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {event.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '15px' }}
                  >
                    Assign
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

export default EventsCatalog;
