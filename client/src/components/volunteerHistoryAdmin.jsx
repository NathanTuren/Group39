import React from 'react';
import { useState, useEffect } from 'react';
import {
  Typography
} from '@mui/material';
import { Card, CardContent, Grid, Button } from '@mui/material';

import { styled } from '@mui/system';
import Sidebar from './ui/sidebar';
import { FullWidthBackground } from './login/login';

// Form container without a box, similar to the login style
const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '100%',
});

export const VolunteerHistoryAdmin = () => {
  const [volunteers, setVolunteerData] = useState([]);
  const fetchVolunteers = async () => {
      try {
          const res = await fetch('http://localhost:4000/volunteers');
          const data = await res.json();
          const uniqueVolunteers = Array.from(
              new Map(data.map(volunteer => [volunteer.id, volunteer])).values()
          );
          setVolunteerData(uniqueVolunteers);
      } catch (err) {
          console.error('Error fetching volunteer data:', err);
      }
  };

  useEffect(() => {
      fetchVolunteers();
  }, []);

  return (
      <FullWidthBackground>
          <div className="flex flex-row">
              <Sidebar />
              <EventCatalogContainer className="mt-5 px-5">
                  <Typography variant="h4" align="center" gutterBottom>
                      Volunteer History Log
                  </Typography>
                  {volunteers.length === 0 ? (
                      <Typography variant="h6" align="center" color="textSecondary">
                          No volunteers found.
                      </Typography>
                  ) : (
                      <Grid container spacing={3}>
                          {volunteers.map((volunteer) => (
                              <Grid item xs={12} sm={6} md={4} key={volunteer.id}>
                                  <Card>
                                      <CardContent>
                                          <Typography variant="h5" gutterBottom>
                                              {volunteer.fullname}
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
                                              View Volunteer History
                                          </Button>
                                      </CardContent>
                                  </Card>
                              </Grid>
                          ))}
                      </Grid>
                  )}
              </EventCatalogContainer>
          </div>
      </FullWidthBackground>
  );
};
