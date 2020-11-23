import React from 'react';
import { Box } from '@material-ui/core';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <ForgotPasswordForm />
    </Box>
  )
}

export default ForgotPasswordPage;
