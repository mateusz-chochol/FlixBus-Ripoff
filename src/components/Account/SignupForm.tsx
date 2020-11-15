import React, {
  useRef,
  useState,
  useEffect,
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
import { useSnackbar } from 'notistack';

const SignupForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signup } = useAuth();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      const snackbarKey = enqueueSnackbar(error, {
        variant: 'error',
        onClick: () => { closeSnackbar(snackbarKey) },
        persist: true
      });
      setError('');
    }
  }, [error, enqueueSnackbar, closeSnackbar]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    e?.preventDefault();

    if (!(emailRef.current?.value && passwordRef.current?.value && passwordConfirmRef.current?.value)) {
      return setError('All text fields must be filled out');
    }

    if (!emailRef.current.value.includes('@')) {
      return setError('Email must contain \'@\' sign');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    }
    catch {
      setError('Failed to create an account');
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
                  <Typography variant="h2" align="center">Sign Up</Typography>
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
                  <TextField
                    id="password-confirm"
                    label="Password Confirmation"
                    type="password"
                    inputRef={passwordConfirmRef}
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
                      Sign Up
                      </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container direction="column" justify="center">
            <Typography variant="h6" align="center">
              Already have an account?
            </Typography>
            <Button color="primary" onClick={() => { history.push('/login') }}>
              <Typography variant="h4">Log In</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignupForm