import React, {useEffect, useState} from 'react';
import { TextField, Button, ButtonGroup, Typography, Stack, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login

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
  const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const setRoleOnClick = (role) => {
    setSelectedRole(role);
  };

  // Fetch login data from the backend using Node.js server (localhost:4000)
  const fetchLoginData = async () => {
    try {
      const res = await fetch('http://localhost:4000/volunteers'); // fetch the appropriate API in this case we do a get to /volunteers
      const data = await res.json();
      setLoginData(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // We employ a useEffect to render all the data on loading of the page
  useEffect(() => {
    fetchLoginData();
  }, []); 

  const validateLogin = () => {
    const user = loginData.find(
      (volunteer) => volunteer.email === email && volunteer.pass === password
    );

    console.log(user);
    localStorage.setItem('credentialsId', user.credentialId);
    // If a user exists we render the appropriate page based on admin or general volunteer
    if (user) {

      setError(null); // Clear errors
      if (selectedRole === 'admin' && user.isadmin) {
        navigate('/volunteerMatchingForm'); // Admin dashboard
      } else if (selectedRole === 'user' && !user.isadmin) {
        navigate('/userDashboard'); // Regular user dashboard
      } else {
        setError('Invalid role selected for this user.');
      }
    } else {
      // Invalid credentials
      setError('Invalid email or password.');
    }
  };

  return (
    <FullWidthBackground>
      <Stack spacing={5}> 
        <FormContainer>
          <Typography variant="h5" align="left" gutterBottom>Log In to VolunteerMatch</Typography>
          
          <TextField
            label="Username (Email)"
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

          <ButtonGroup
            aria-label="Disabled button group"
            fullWidth
            elevation={24}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setRoleOnClick("admin")}
              sx={{marginTop: "10px", color: selectedRole === "admin" ? 'white' : "brown", backgroundColor: selectedRole === "admin" ? 'brown' : "white"  }}
            >
              Admin
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setRoleOnClick("user")}
              sx={{marginTop: "10px", color: selectedRole === "user" ? 'white' : "brown", backgroundColor: selectedRole === "user" ? 'brown' : "white"  }}
            >
              User
            </Button>
          </ButtonGroup>

          <Button
            variant="contained"
            fullWidth
            onClick={validateLogin} // Validate whether login is an actual username and password
            sx={{marginTop: "10px", color: 'white', backgroundColor: 'brown' }}
          >
            Sign In
          </Button>
          
          {/* Conditionally render based on error message */}
          {error && <Typography color="error" align="center">{error}</Typography>}
          
        </FormContainer>
        
        <Typography align="center">
          <Link href="/reset">Forgot Your Password?</Link>
        </Typography>
        <Typography align="center">Don't Have an Account?</Typography>
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
