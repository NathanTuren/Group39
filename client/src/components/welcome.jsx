import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FullWidthBackground } from './login/login.jsx';
import Navbar from './ui/navBar.jsx';

export const Welcome = () => {
  return (
    <FullWidthBackground>
      <Navbar />
      <div className="flex h-screen bg-stone-100 justify-center items-center">
        <Stack
          direction="column"
          className="w-full h-full bg-transparent text-center relative"
        >
          {/* Image with responsive size */}
          <img
            src="/images/tree_planting.png"
            alt="Tree-Planting"
            className="w-full h-[90%] object-cover"
          />

          {/* Heading text with responsive position */}
          <p className="absolute text-red-800 right-[15%] bottom-[70%] text-4xl sm:text-6xl lg:text-8xl whitespace-pre">
            Find Your Community
          </p>

          <div className="absolute flex flex-row justify-center space-x-4 bottom-[60%] left-0 right-0">
            <Button
              variant="contained"
              href="/register"
              className="text-white mt-4"
              sx={{ backgroundColor: 'brown', width: '15%' }}
            >
              Register  &nbsp; <MdOutlineArrowRightAlt />
            </Button>
            <Button
              variant="contained"
              href="/login"
              className="text-white mt-4"
              sx={{ backgroundColor: 'brown', width: '15%' }}
            >
              Login  &nbsp; <MdOutlineArrowRightAlt />
            </Button>
          </div>

        </Stack>
      </div>
    </FullWidthBackground>
  );
};

export default Welcome;
