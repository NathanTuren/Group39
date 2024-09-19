import React from 'react';
import { TextField, Button, Typography} from '@mui/material';
import { FullWidthBackground, FormContainer} from './login';

export const ResetLogin = () => {
  return (
    <FullWidthBackground>
      <FormContainer>
        <Typography variant="h5" align="left" gutterBottom> Email Reset </Typography>
        <TextField
          label="Email"
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
          Send email
        </Button>

      </FormContainer>

    </FullWidthBackground>
  );
};

export default ResetLogin;
