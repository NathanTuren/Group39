import React, { useState } from 'react';
import { TextField, Button, Typography, Stack, Link } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../ui/navBar';

// Custom background container that stretches across the entire width and height
export const FullWidthBackground = styled('div')({
  backgroundColor: 'rgb(245,245,244)',
});

// Custom form container without a box or borders
export const FormContainer = styled('div')({
  maxWidth: '400px',
  width: '100%',
  padding: '0 20px',
});


export const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  // const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const setRoleOnClick = (role) => {
    setSelectedRole(role.target.value);
  };


  const validateLogin = async () => {
    try {
      // Send email and password to the /login endpoint
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass: password, role: selectedRole }) // pass the password as "pass" to match server expectations
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem('credentialsId', data.userId); // Store user ID or token as needed
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', selectedRole);
        setError(null); // Clear errors

        if (selectedRole === 'admin' && data.isAdmin) { // If admin, navigate to admin dashboard
          navigate('/userDashboard'); // Admin dashboard
        } else if (selectedRole === 'user' && !data.isAdmin) { // if user, navigate to user dashaboard
          navigate('/userDashboard'); // Regular user dashboard
        } else {
          setError('Invalid role selected for this user.');
        }
      } else {
        setError(data.message); // // If login fails, show the error message from the API
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while trying to log in.');
    }
  };

  return (
    <FullWidthBackground>
      <Navbar />
      <div className="flex w-full h-full">
        <div className="absolute top-5 left-5">
          <Button
            onClick={() => navigate('/')}
            startIcon={<FaArrowLeft />}
            sx={{
              marginTop: '175px',
              marginLeft: '50px',
              textTransform: 'none',
              color: '#A0302E',
              fontWeight: 'bold',
            }}
          >
            Back
          </Button>
        </div>

        <div className="flex h-screen bg-stone-100 items-center ml-[15%]">
          <Stack spacing={5}>
            <FormContainer>
              <Typography variant="h3" align="left" gutterBottom><strong>Log in.</strong></Typography>

              <TextField
                label="Username (Email)"
                variant="standard"
                margin="normal"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                variant="standard"
                margin="normal"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box className="my-5">
                <FormControl fullWidth variant="standard">
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    margin="normal"
                    value={selectedRole}
                    onChange={setRoleOnClick}
                    label="Role"
                    fullWidth
                  >
                    <MenuItem value="admin" sx={{ backgroundColor: selectedRole === "admin" ? 'brown' : 'white', color: selectedRole === "admin" ? 'black' : 'brown' }}>
                      Admin
                    </MenuItem>
                    <MenuItem value="user" sx={{ backgroundColor: selectedRole === "user" ? 'brown' : 'white', color: selectedRole === "user" ? 'black' : 'brown' }}>
                      User
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                onClick={validateLogin} // Validate whether login is an actual username and password
                sx={{
                  marginTop: '10px',
                  color: 'white',
                  backgroundColor: '#A0302E',
                  '&:hover': {
                    backgroundColor: '#802624',
                  },
                }}
              >
                Sign In
              </Button>

              {/* Conditionally render based on error message */}
              {error && <Alert severity="error" align="center" sx={{ marginTop: '10px' }}>{error}</Alert>}

            </FormContainer>

            <Typography align="left">
            <a
                href="/reset"
                
                className=" px-5 w-fit text-[#A0302E] underline decoration-current hover:no-underline"
              >
                Forgot Password?
              </a>
              </Typography>
            <div className="px-5 space-y-4">
              <Typography align="left">Don't Have an Account?</Typography>
              <a
                href="/register"
                sx={{ margin: '1 !important' }}
                className="w-fit text-[#A0302E] underline decoration-current hover:no-underline"
              >
                Create One Now
              </a>
            </div>
          </Stack>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/volunteering.png"
            alt="Volunteering"
            className="w-full h-auto"
          />
        </div>
      </div>
    </FullWidthBackground>
  );
};

export default Login;
