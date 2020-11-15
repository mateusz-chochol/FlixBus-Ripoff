import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import LoginForm from './LoginForm';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useNotifications } from '../Notifications';

const LoginPage: React.FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { showInfo } = useNotifications();

  useEffect(() => {
    if (currentUser) {
      showInfo('You are already logged in');
      history.push('/');
    }
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      <LoginForm />
    </Box>
  )
}

export default LoginPage;
