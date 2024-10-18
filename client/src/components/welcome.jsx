import React from 'react';
import { Button, Typography, Box, Stack, Paper } from '@mui/material';
import { FullWidthBackground } from './login';

export const Welcome = () => {
  return (
    <FullWidthBackground>
      <Stack
        direction="row"
        sx={{
          height: '100%',
          display: "inherit",
          width: '100%',
          margin: 0, 
          padding: 0,
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(249, 245, 235)',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: '80%',
              height: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(249, 245, 235)',
              color: 'brown',
            }}
          >
            <Stack spacing={2} alignItems="center">
                <img src="/images/volunteer.png" alt="Logo" width="300" />
              <Typography variant="h3" align="center"> Find Your Community </Typography>
            </Stack>
          </Paper>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(249, 245, 235)',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              padding: 3,
              width: '60%',
              height: '60%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(249, 245, 235)',
              color: 'white',
            }}
          >
            <Stack spacing={3} alignItems="center" justifyContent="center">
            <Typography variant="h5" align="center" sx={{color: "brown"}}> Lets Get Started! </Typography>
              <Button
                variant="contained"
                fullWidth
                href="/register"
                sx={{ color: 'white', backgroundColor: 'brown' }}
              >
                Create an Account
              </Button>

              <Typography variant="h5" align="center" sx={{color: "brown"}}> Already a User? </Typography>
              <Button
                variant="contained"
                fullWidth
                href="/login"
                sx={{ color: 'white', backgroundColor: 'brown' }}
              >
                Login
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
      </FullWidthBackground>
  );
};

export default Welcome;
