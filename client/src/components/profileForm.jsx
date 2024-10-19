import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

// States and skills
const states = [
  { code: 'CA', name: 'California' },
  { code: 'FL', name: 'Florida' },
  { code: 'NY', name: 'New York' },
  { code: 'TX', name: 'Texas' },
];

const skillsList = [
  'Communication',
  'Teamwork',
  'Environmental Awareness',
  'Customer Service',
  'Willingness to Learn',
];

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
    availability: [],
  });

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
    try {
      const response = await fetch('http://localhost:4000/saveProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Profile saved:', result);
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
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile Completion
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              {states.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    {skillsList.map((skill) => (
      <MenuItem key={skill} value={skill} role="option" aria-label={skill}>
        {skill}
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
  <IconButton color="primary" onClick={addDatePicker} aria-label="Add date">
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
      </FormContainer>
    </FullWidthBackground>
  );
};

export default ProfileForm;
