import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

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

const volunteers = [
  { id: 1, name: 'John Doe', skills: ['React', 'JavaScript'], availability: 'Weekdays' },
  { id: 2, name: 'Jane Smith', skills: ['Node.js', 'Python'], availability: 'Weekends' },
  // Add more volunteers
];

export const VolunteerMatchingForm = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  const handleVolunteerChange = (event) => {
    const volunteerId = event.target.value;
    setSelectedVolunteer(volunteerId);
    const matchedVolunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
    setVolunteerInfo(matchedVolunteer);
  };

  const handleMatchVolunteer = () => {
    // Placeholder for matching logic (e.g., send the volunteer data to the server to find a matched event)
    console.log('Matching Volunteer:', volunteerInfo);
    // Redirect to the events catalog page after matching
    navigate('/events'); // Navigate to the events catalog route
  };

  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Volunteer Matching Form
        </Typography>
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
              color="secondary"
              fullWidth
              onClick={handleMatchVolunteer}
              style={{ marginTop: '20px' }}
            >
              Match Volunteer
            </Button>
          </>
        )}
      </FormContainer>
    </FullWidthBackground>
  );
};

export default VolunteerMatchingForm;
