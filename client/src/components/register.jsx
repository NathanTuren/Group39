import React, {useState} from 'react';
import { TextField, Button, Typography , ButtonGroup} from '@mui/material';
import { FullWidthBackground, FormContainer } from './login';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const setRoleOnClick = (role) => {
    setSelectedRole(role);
  };

  return (
    <FullWidthBackground>
      <FormContainer align="center">
        <Typography variant="h5" align="center" gutterBottom>   User Registration </Typography>
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
          Register
        </Button>
      </FormContainer>
    </FullWidthBackground>
  );
};

export default Register;
