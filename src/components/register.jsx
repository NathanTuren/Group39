import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { FullWidthBackground, FormContainer } from './login';

export const Register = () => {
  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h5" align="center" gutterBottom>   User Registration </Typography>
        <TextField
          label="First Name"
          type="name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          type="name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
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
          fullWidth
          sx={{marginTop: "10px", color: 'white', backgroundColor: 'brown' }}
        >
          Register
        </Button>
      </FormContainer>
    </FullWidthBackground>
  );
};

export default Register;
