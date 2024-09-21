import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//npm install @mui/x-date-pickers@latest date-fns@2.x
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

const states = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  // Add more states as needed
];

const skillsList = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  // Add more skills as needed
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
    availabilityStart: null,
    availabilityEnd: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      skills: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile Completion
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
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
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="State"
            >
              {states.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            inputProps={{ maxLength: 9 }}
          />
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel>Skills</InputLabel>
            <Select
              multiple
              name="skills"
              value={formData.skills}
              onChange={handleSkillsChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {skillsList.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
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
            <DatePicker
              label="Availability Start"
              value={formData.availabilityStart}
              onChange={(newValue) => setFormData({ ...formData, availabilityStart: newValue })}
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth required />
              )}
              inputFormat="MM/dd/yyyy"
            />
            <DatePicker
              label="Availability End"
              value={formData.availabilityEnd}
              onChange={(newValue) => setFormData({ ...formData, availabilityEnd: newValue })}
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth required />
              )}
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
    </FullWidthBackground>
  );
};

export default ProfileForm;
