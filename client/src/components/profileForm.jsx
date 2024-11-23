import React, { useState, useEffect } from 'react';
import {
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Grid,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

import { FullWidthBackground } from './login/login.jsx';
import { FaUserCircle } from "react-icons/fa";

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

export const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: [null],
  });

  const [states, setStates] = useState([]);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:4000/states', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const statesData = await response.json();
        setStates(statesData);
      } else {
        console.error('Error fetching states:', await response.json());
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:4000/skills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

  useEffect(() => {
    fetchStates();
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (event) => {
    const { target: { value } } = event;
    setFormData({
      ...formData,
      skills: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentialsId = parseInt(localStorage.getItem('credentialsId'), 10);
    // const userId = parseInt(localStorage.getItem('userId'), 10);

 

    // Find the corresponding stateId for the selected state code
    const selectedState = states.find((state) => state.statecode === formData.state);
    const stateId = selectedState ? selectedState.id : null;

    if (!stateId || stateId === null) {
        console.error('Invalid state selected.');
        return;
    }
    
    try {
      const response = await fetch('http://localhost:4000/saveProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, stateId, credentialsId}),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Profile saved:', result);
        navigate('/userDashboard');
      } else {
        console.error('Error saving profile:', await response.json());
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const addDatePicker = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, null],
    }));
  };

  const handleDateChange = (index, newValue) => {
    const newAvailability = [...formData.availability];
    newAvailability[index] = newValue;
    setFormData({ ...formData, availability: newAvailability });
  };

  return (
    <FullWidthBackground className="flex flex-col h-[80%]">
      {/* <FormContainer> */}
      <div className="flex justify-center my-[20px]">
        <FaUserCircle size="80" />
      </div>

        <Typography variant="h5" align="center" gutterBottom>
          User Profile Completion
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '60%', margin: '0 auto', maxHeight: '80vh', marginBottom:'50px'}}>
          <TextField
            id="fullName"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            id="address1"
            label="Address 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            id="address2"
            label="Address 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{ maxLength: 100 }}
          />

          {/* Use Grid to layout City, State, and Zip Code on the same line */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="city"
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  label="State"
                  labelId="state-label"
                >
                  {states.length > 0 ? (
                    states.map((state) => (
                      <MenuItem key={state.statecode} value={state.statecode}>
                        {state.statename || 'Unnamed State'}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No states available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                inputProps={{ maxLength: 9, minLength: 5 }}
              />
            </Grid>
          </Grid>

          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="skills-label">Skills</InputLabel>
            <Select
              id="skills"
              multiple
              name="skills"
              value={formData.skills}
              onChange={handleSkillsChange}
              label="Skills"
              labelId="skills-label"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {skills.map((skill) => (
                <MenuItem key={skill.id} value={skill.skillname} role="option" aria-label={skill.skillname}>
                  {skill.skillname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="preferences"
            label="Preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {formData.availability.map((date, index) => (
              <DatePicker
                key={index}
                label="Date Available"
                value={date}
                onChange={(newValue) => handleDateChange(index, newValue)}
                slots={{ textField: TextField }} // Use slots prop for TextField
                inputFormat="MM/dd/yyyy"
              />
            ))}
            <IconButton style={{marginTop: "8px"}} color="brown" onClick={addDatePicker} aria-label="Add date">
              <AddIcon />
            </IconButton>
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
      {/* </FormContainer> */}
    </FullWidthBackground>
  );
};

export default ProfileForm;
