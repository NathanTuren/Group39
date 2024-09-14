import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Full width background that covers the screen
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)', // Off-white background to match the style
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Form container without a box, similar to the login style
const FormContainer = styled('div')({
  maxWidth: '400px',
  width: '100%',
  padding: '0 20px',
});

export const Register = () => {
  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          User Registration
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Register
        </Button>
      </FormContainer>
    </FullWidthBackground>
  );
};

export default Register;
