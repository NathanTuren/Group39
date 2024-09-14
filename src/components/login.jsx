import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Custom background container that stretches across the entire width and height
const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)', // Off-white background
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Custom form container without a box or borders
const FormContainer = styled('div')({
  maxWidth: '400px',
  width: '100%',
  padding: '0 20px',
});

export const Login = () => {
  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          Please enter your Username and Password:
        </Typography>
        <TextField
          label="Username"
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
          color="secondary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Sign In
        </Button>
      </FormContainer>
    </FullWidthBackground>
  );
};

export default Login;
