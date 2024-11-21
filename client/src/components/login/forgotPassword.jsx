import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { FullWidthBackground, FormContainer } from './login';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";

import Navbar from '../ui/navBar';

export const ResetLogin = () => {
  const navigate = useNavigate();

  return (
    <FullWidthBackground>
      <Navbar />
      <div className="flex w-full h-full">
        <div className="absolute top-5 left-5">
          <Button
            onClick={() => navigate('/login')}
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
          <FormContainer>
            <div className="flex justify-center items-center h-full">
              <IoIosLock size="100" style={{ color: 'brown' }} />
            </div>
            <Typography variant="h5" align="center" gutterBottom> Trouble logging in? </Typography>

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
              sx={{ marginTop: "10px", color: 'white', backgroundColor: 'brown' }}
            >
              Send email
            </Button>
            <div className="flex flex-row">
              <IoRemoveOutline style={{
                width: '200px',
                height: '50px',
              }} />
              <p className="mt-4">OR</p>
              <IoRemoveOutline style={{
                width: '200px',
                height: '50px',
              }} />
            </div>
            <div className="flex justify-center items-center mt-2">
              <a
                href="/register"
                className="w-fit text-[#A0302E] underline decoration-current hover:no-underline"
              >
                Create New Account
              </a>
            </div>

          </FormContainer>

        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/family.png"
            alt="Volunteering"
            className="w-full h-auto"
          />
        </div>
      </div>
    </FullWidthBackground>
  );
};

export default ResetLogin;
