import React from 'react';
import { FullWidthBackground, FormContainer } from './login';
import { Button, Typography, Stack} from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login

export const VerificationPending = () => {
    const navigate = useNavigate();

    return (
  

<FullWidthBackground>
<div className="flex w-full h-full">
  <div className="absolute top-5 left-5">
    <Button
      onClick={() => navigate('/register')}
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
        <Typography variant="h3" align="left" gutterBottom><strong>Account Verification.</strong></Typography>
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
            <p>We’ve sent you a verification email. Please check your inbox and click the link to verify your account.</p>
            <p>Once verified, we will take you to profile setup.</p>
        </div>
       

      </FormContainer>


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

export default VerificationPending;
