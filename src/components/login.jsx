import React, {useState} from 'react';
import { TextField, Button, ButtonGroup, Typography, Stack, Link } from '@mui/material';
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
  const [selectedRole, setSelectedRole] = useState(null);

  const setRoleOnClick = (role) => {
    setSelectedRole(role);
  };

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

<ButtonGroup
          aria-label="Disabled button group"
          align="center"
          fullWidth
          elevation={24}
        >
          <Button
          variant="outlined"
          fullWidth
          elevation={24}
          onClick={() => setRoleOnClick("admin")}
          sx={{marginTop: "10px", color: selectedRole === "admin" ? 'white' : "brown" , backgroundColor: selectedRole === "admin" ? 'brown' : "white"  }}
          >
          Admin
          </Button>
          <Button
          variant="outlined"
          fullWidth
          elevation={24}
          onClick={() => setRoleOnClick("user")}
          sx={{marginTop: "10px", color: selectedRole === "user" ? 'white' : "brown", backgroundColor: selectedRole === "user" ? 'brown' : "white"  }}
          >
          User
          </Button>
        </ButtonGroup>

        <Button
          variant="contained"
          fullWidth
          sx={{marginTop: "10px", color: 'white', backgroundColor: 'brown' }}
        >
          Sign In
        </Button>

      </FormContainer>
      <Typography variant="h8" align="center"> <Link href="/reset">Forgot Your Password? </Link> </Typography>
      <Typography variant="h8" align="center"> Don't Have an Account? </Typography>
      <Button
          variant="contained"
          fullWidth
          href="/register"
          sx={{ color: 'white', backgroundColor: 'brown' }}
        >
          Register Here!
        </Button>
      </Stack>
    </FullWidthBackground>
  );
};

export default Login;
