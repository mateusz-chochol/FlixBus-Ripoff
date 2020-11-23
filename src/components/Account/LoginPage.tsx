import React from 'react';
import { Box } from '@material-ui/core';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <LoginForm />
    </Box>
  )
}

export default LoginPage;
