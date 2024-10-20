import React, { useState, useEffect } from 'react';
import { Button, Typography, MenuItem, Select, InputLabel, FormControl, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Custom background container
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Custom form container
const FormContainer = styled('div')({
  maxWidth: '600px',
  width: '100%',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1, 
  overflow: 'auto',
});

export const VolunteerMatchingForm = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [volunteers, setVolunteers] = useState([]); // Store all volunteers
  const [volunteerInfo, setVolunteerInfo] = useState(null); // Store selected volunteer info
  const [matchedEvents, setMatchedEvents] = useState([]); // Store matched events
  const [showMatchedEvents, setShowMatchedEvents] = useState(false); // Toggle matched events
  const [error, setError] = useState(null); // Error state
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate();

  // Fetch volunteers from the backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:4000/volunteers');
        if (response.ok) {
          const data = await response.json();
          setVolunteers(data); // Assuming the response is an array of volunteers
        } else {
          setError('Failed to fetch volunteers');
        }
      } catch (err) {
        setError(`Request failed: ${err.message}`);
      }
    };

    fetchVolunteers();
  }, []);

  // Handle volunteer selection
  const handleVolunteerChange = (event) => {
    const volunteerId = event.target.value;
    setSelectedVolunteer(volunteerId);
    const matchedVolunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
    setVolunteerInfo(matchedVolunteer);
    setShowMatchedEvents(false); // Hide matched events when changing the volunteer
  };

  // Handle volunteer matching
  const handleMatchVolunteer = async () => {
    if (!selectedVolunteer) {
      setError('Please select a volunteer');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/volunteer/${volunteerInfo.id}/match-events`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setMatchedEvents(data.matchingEvents); // Store matched events
        setShowMatchedEvents(true); // Show matched events
        setError(null); // Clear any previous errors
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (err) {
      setError(`Request failed: ${err.message}`);
    }
  };

  // Handle assigning event to the volunteer and send a notification
  const handleAssignEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:4000/volunteer/${selectedVolunteer}/assign-event/${eventId}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setNotification(data.notification); // Set the notification message
        setVolunteerInfo(prevInfo => ({
          ...prevInfo,
          eventParticipation: [...prevInfo.eventParticipation, eventId], // Update the events the volunteer is assigned to
        }));
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (err) {
      setError(`Request failed: ${err.message}`);
    }
  };

  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Volunteer Matching Form
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography variant="body1" color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}

        {/* Dropdown for selecting volunteer */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Select Volunteer</InputLabel>
          <Select
            value={selectedVolunteer}
            onChange={handleVolunteerChange}
            label="Select Volunteer"
          >
            {volunteers.map((volunteer) => (
              <MenuItem key={volunteer.id} value={volunteer.id}>
                {volunteer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display selected volunteer info */}
        {volunteerInfo && (
          <>
            <Box sx={{ marginTop: 3, width: '100%' }}>
              <Typography variant="h6">Volunteer Information</Typography>
              <Typography variant="body1"><strong>Name:</strong> {volunteerInfo.name}</Typography>
              <Typography variant="body1"><strong>Skills:</strong> {volunteerInfo.skills.join(', ')}</Typography>
              <Typography variant="body1"><strong>Availability:</strong> {volunteerInfo.availability}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleMatchVolunteer}
              style={{ marginTop: '20px', backgroundColor: 'brown'}}
            >
              Match Volunteer
            </Button>
          </>
        )}

        {/* Display Matched Events */}
        {showMatchedEvents && matchedEvents.length > 0 && (
          <Box sx={{ marginTop: 3, width: '100%' }}>
            <Typography variant="h6">Matched Events</Typography>
            {matchedEvents.map((event) => (
              <Box key={event.id} sx={{ marginBottom: '10px' }}>
                <Chip label={`${event.eventName} - ${event.eventDate}`} style={{ marginBottom: '5px' }} />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAssignEvent(event.id)}
                  style={{ marginLeft: '10px', backgroundColor: 'green'}}
                >
                  Assign
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {/* Display Notification Message */}
        {notification && (
          <Box sx={{ marginTop: 3, width: '100%' }}>
            <Typography variant="h6" color="primary">
              {notification}
            </Typography>
          </Box>
        )}
      </FormContainer>
    </FullWidthBackground>
  );
};

export default VolunteerMatchingForm;
