import React, {useState} from 'react';
import { TextField, Button, Typography , ButtonGroup} from '@mui/material';
import { FullWidthBackground, FormContainer } from './login';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigateRoute = useNavigate(); // we use this to traverse routes given a condition

  const setRoleOnClick = (role) => {
    setSelectedRole(role);
    setIsAdmin(role === "admin"); // Set isAdmin based on the selected role
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
        navigateRoute('/profileForm');
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
      <FormContainer align="center">
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonGroup aria-label="Disabled button group" fullWidth elevation={24}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setRoleOnClick('admin')}
            sx={{
              marginTop: '10px',
              color: selectedRole === 'admin' ? 'white' : 'brown',
              backgroundColor: selectedRole === 'admin' ? 'brown' : 'white',
            }}
          >
            Admin
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setRoleOnClick('user')}
            sx={{
              marginTop: '10px',
              color: selectedRole === 'user' ? 'white' : 'brown',
              backgroundColor: selectedRole === 'user' ? 'brown' : 'white',
            }}
          >
            User
          </Button>
        </ButtonGroup>

        {/* Call an error message depending on fetch request or validations returned from checking if email already exists */}
        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={RegisterUser} 
          sx={{ marginTop: '10px', color: 'white', backgroundColor: 'brown' }}
        >
          Register
        </Button>
      </FormContainer>
    </FullWidthBackground>
  );
};

export default Register;
