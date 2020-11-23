import React from 'react';
import { Box } from '@material-ui/core';
import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <SignupForm />
    </Box>
  )
}

export default SignupPage;
