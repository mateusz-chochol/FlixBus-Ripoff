import React, {
  useRef,
  useState,
} from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useNotifications } from '../Notifications';

const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const history = useHistory();
  const { showError } = useNotifications();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    e?.preventDefault();

    if (!(emailRef.current?.value && passwordRef.current?.value)) {
      return showError('All text fields must be filled out');
    }

    if (!emailRef.current.value.includes('@')) {
      return showError('Email must contain \'@\' sign');
    }

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    }
    catch {
      showError('Failed to log in. Do you need an account?');
      setLoading(false);
    }
  }

  return (
    <>
      <Box width={1 / 6} minWidth={300}>
        <Grid
          container
          direction="column"
          spacing={6}
        >
          <Grid item>
            <Paper elevation={4}>
              <Grid
                container
                direction="column"
                alignContent="center"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="h2" align="center">Log In</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    inputRef={emailRef}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Log In
                      </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container direction="column" justify="center">
            <Typography variant="h6" align="center">
              Need an account?
            </Typography>
            <Button color="primary" onClick={() => { history.push('/signup') }}>
              <Typography variant="h4">Sign Up</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LoginForm
