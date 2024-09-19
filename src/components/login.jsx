import React from 'react';
import { TextField, Button, Typography, Stack, Link } from '@mui/material';
import { styled } from '@mui/system';

// Custom background container that stretches across the entire width and height
export const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(249, 245, 235)',  
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Custom form container without a box or borders
export const FormContainer = styled('div')({
  maxWidth: '400px',
  width: '100%',
  padding: '0 20px',
});

export const Login = () => {
  return (
    <FullWidthBackground>
      <Stack spacing={5}> 
      <FormContainer>
        <Typography variant="h5" align="left" gutterBottom> Log In to VolunteerMatch </Typography>
        <TextField
          label="Username (Email)"
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
          Sign In
        </Button>

      </FormContainer>
      <Typography variant="h8" align="center"> <Link href="/reset">Forgot Your Password? </Link> </Typography>
      </Stack>
    </FullWidthBackground>
  );
};

export default Login;
