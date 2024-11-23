import React, {useState} from 'react';
import { TextField, Button, Typography, Stack} from '@mui/material';
import { FullWidthBackground, FormContainer } from './login';
import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../ui/navBar';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setErrorMessage] = useState('');

  const navigateRoute = useNavigate(); // we use this to traverse routes given a condition

  const setRoleOnClick = (role) => {
    setSelectedRole(role.target.value);
    setIsAdmin(role.target.value === "admin"); // Set isAdmin based on the selected role
  };

 // After click, we call a POST call to register the username and password into mock data. If email already exists, we spit back an error
  const RegisterUser = async () => {
    // Define the body of the POST call
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        pass: password,
        isadmin: isAdmin
      })
    };

    try {


      const response = await fetch('http://localhost:4000/volunteerRegister', options); // POST request
      const data = await response.json();
      
      if (response.ok) {
        // Successful registration, navigateRoute to profile form
        localStorage.setItem('credentialsId', data.credentialsId);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', selectedRole);
        // Send verification email after successful registration
        const emailResponse = await fetch('http://localhost:4000/sendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        });

        if (emailResponse.ok) {
            // Redirect to the verification page
            navigateRoute('/verification', { state: { email } });
        } else {
            setErrorMessage('Failed to send verification email.');
        }
    } else {
        // Set error message to display under the fields
        setErrorMessage(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      // Catch network or other unexpected errors
      setErrorMessage('An error occurred while processing your request. Please try again.');
    }
  };

  return (
    <FullWidthBackground>
      <Navbar />
      <div className="flex w-full h-full">
        <div className="absolute top-5 left-5">
          <Button
            onClick={() => navigateRoute('/')}
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
              <Typography variant="h3" align="left" gutterBottom><strong>Create an Account.</strong></Typography>

              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
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
                onClick={RegisterUser}
                sx={{
                  marginTop: '10px',
                  color: 'white',
                  backgroundColor: '#A0302E',
                  '&:hover': {
                    backgroundColor: '#802624',
                  },
                }}
              >
                Create Account
              </Button>

              {/* Call an error message depending on fetch request or validations returned from checking if email already exists */}
              {error && <Alert severity="error" align="center" sx={{ marginTop: '10px' }}>{error}</Alert>}

            </FormContainer>
          </Stack>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/register.png"
            alt="Volunteering"
            className="max-w-full h-auto"
            style={{ objectFit: 'contain', maxHeight: '80%' }}
          />
        </div>
      </div>
    </FullWidthBackground>
  );
};

export default Register;
