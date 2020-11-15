import React from 'react';
import { Box } from '@material-ui/core';
import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      <SignupForm />
    </Box>
  )
}

export default SignupPage;
