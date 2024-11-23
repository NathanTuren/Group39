import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';

import { FullWidthBackground } from './login/login';
import Sidebar from './ui/sidebar';

// Custom container for event cards
const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '80%',
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
    location: 'San Jose, CA',
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
    location: 'Yosemite Animal Shelter, CA',
    description: 'Take care of pets and help the animal shelter with daily activities.',
  },
  // Add more events as needed
];

export const UserDashboard = () => {
  const [events, setEvent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:4000/events`, {
          method: 'GET',
        });
        console.log(response);
        if (response.ok) {
          const eventsData = await response.json();
          setEvent(eventsData);
        } else {
          console.error('Error fetching events:', await response.json());
          setError('Failed to fetch events');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(`Request failed: ${error.message}`);
      }
    };

    fetchEvents();
  }, []);

  return (
    <FullWidthBackground>
      <div className="flex flex-row">
      <Sidebar/>
      <EventCatalogContainer className="p-5 pl-10 flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center items-center w-full">
        <Typography variant="h4" align="center" gutterBottom>
          Available Events
        </Typography>
        
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card className="rounded-lg">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {event.eventname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date:</strong> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(event.eventdate))}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {event.eventlocation}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {event.eventdescr}
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
        </div>
      </EventCatalogContainer>
      </div>
    </FullWidthBackground>
  );
};

export default UserDashboard;