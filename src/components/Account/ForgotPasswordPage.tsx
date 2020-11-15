import React from 'react';
import { Box } from '@material-ui/core';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      <ForgotPasswordForm />
    </Box>
  )
}

export default ForgotPasswordPage;
