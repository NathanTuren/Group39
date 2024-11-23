import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, MenuItem, Select, InputLabel, FormControl, Chip, Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Sidebar from './ui/sidebar';
import { FullWidthBackground } from './login/login';
// Custom container for event cards
const EventCatalogContainer = styled('div')({
  maxWidth: '1200px',
  width: '80%',
  marginTop: '20px',
});

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

// Urgency options
const urgencyOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const EventsCatalog = () => {
  const [events, setEvents] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    location: '',
    requiredSkills: [],
    urgency: '',
    eventDate: null,
  });

  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:4000/events');
      if (response.ok) {
        const eventsData = await response.json();
        setEvents(eventsData);
      } else {
        console.error('Error fetching events:', await response.json());
        setError('Failed to fetch events');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Request failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:4000/skills');
        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error('Error fetching skills:', await response.json());
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchSkills();
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (event) => {
    const { target: { value } } = event;
    setFormData({
      ...formData,
      requiredSkills: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/saveEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setFormData({
        eventName: '',
        eventDescription: '',
        location: '',
        requiredSkills: [],
        urgency: '',
        eventDate: null,
      });
      fetchEvents();
      setShowForm(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Toggle the form visibility
  const handleAddEventClick = () => {
    setShowForm(!showForm);
  };

  return (
    <FullWidthBackground>
      <div className="flex flex-row">
        <Sidebar />
      
        {/* Event Catalog */}
        <EventCatalogContainer className="px-5">
          <Typography variant="h4" align="center" gutterBottom>
            Available Events
          </Typography>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {event.eventname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Date:</strong> {new Date(event.eventdate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Location:</strong> {event.eventlocation}
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                      {event.eventdescr}
                    </Typography>
                    <Button variant="contained" fullWidth style={{ marginTop: '15px', backgroundColor: 'brown' }}>
                      Sign Up
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            style={{ marginTop: '20px', backgroundColor: 'green' }}
            onClick={handleAddEventClick}
          >
            Add New Event
          </Button>
        </EventCatalogContainer>

        {/* Conditionally rendered Event Management Form */}
        {showForm && (
          <FormContainer>
            <Typography variant="h4" align="center" gutterBottom>
              Add New Event
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Event Description"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                required
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel>Required Skills</InputLabel>
                <Select
                    multiple
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleSkillsChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {skills.map((skill) => (
                      <MenuItem key={skill.id} value={skill.skillname}>
                        {skill.skillname}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel>Urgency</InputLabel>
                <Select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  label="Urgency"
                >
                  {urgencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Event Date"
                  value={formData.eventDate}
                  onChange={(newValue) => setFormData({ ...formData, eventDate: newValue })}
                  renderInput={(params) => <TextField {...params} margin="normal" fullWidth required />}
                  inputFormat="MM/dd/yyyy"
                />
              </LocalizationProvider>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: '20px', backgroundColor: 'brown' }}
              >
                Submit
              </Button>
            </form>
          </FormContainer>
        )}
      </div>
    </FullWidthBackground>
  );
};

export default EventsCatalog;
