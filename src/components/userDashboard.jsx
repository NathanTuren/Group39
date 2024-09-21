import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';

// Custom background container
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

// Custom container for event cards
const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
});

const events = [
  {
    id: 1,
    name: 'Beach Cleanup',
    date: '2024-11-01',
    location: 'Santa Monica Beach, CA',
    description: 'Join to clean the beach and enjoy the sunny weather while making a difference.',
  },
  {
    id: 2,
    name: 'Soup Kitchen Volunteer',
    date: '2024-11-05',
    location: 'Downtown LA, CA',
    description: 'Tasked with helping to prepare and serve meals to those in need.',
  },
  {
    id: 3,
    name: 'Local Park Tree Planting',
    date: '2024-11-10',
    location: 'Central Park, NY',
    description: 'Participate in planting trees to help restore greenery to the local community.',
  },
  {
    id: 4,
    name: 'School Supply Distribution',
    date: '2024-11-12',
    location: 'San Francisco, CA',
    description: 'Distribute school supplies to underprivileged children in local communities.',
  },
  {
    id: 5,
    name: 'Animal Shelter Caretaker',
    date: '2024-11-15',
    location: 'Brooklyn Animal Shelter, NY',
    description: 'Take care of pets and help the animal shelter with daily activities.',
  },
  // Add more events as needed
];

export const UserDashboard = () => {
  return (
    <FullWidthBackground>
      <EventCatalogContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Available Events
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
                    fullWidth
                    style={{ marginTop: '15px', backgroundColor: 'brown' }}
                  >
                    Sign Up
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

export default UserDashboard;