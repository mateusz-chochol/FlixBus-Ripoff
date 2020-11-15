import React, {
  useRef,
  useState,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
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
import { useNotifications } from '../Misc/Notifications';
import { routes } from '../../routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginButton: {
      '&&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }),
);

const ForgotPasswordForm: React.FC = () => {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const history = useHistory();
  const { showError } = useNotifications();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    e?.preventDefault();

    if (!emailRef.current?.value) {
      return showError('All text fields must be filled out');
    }

    if (!emailRef.current.value.includes('@')) {
      return showError('Email must contain \'@\' sign');
    }

    try {
      setLoading(true);
      //await login(emailRef.current.value, passwordRef.current.value);
      history.push(routes.mainPage);
    }
    catch {
      showError('Failed to log in. Do you need an account?');
      setLoading(false);
    }
  }

  return (
    <>
      <Box width={1 / 4} minWidth={300}>
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
                <Grid item xs={8}>
                  <Typography variant="h2" align="center">Reset Password</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    inputRef={emailRef}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Reset Password
                      </Button>
                  </Box>
                </Grid>
                <Grid item>
                  <Box mb={1}>
                    <Button
                      className={classes.loginButton}
                      fullWidth
                      variant="text"
                      size="small"
                      onClick={() => { history.push(routes.loginPage) }}
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
            <Button color="primary" onClick={() => { history.push(routes.singupPage) }}>
              <Typography variant="h4">Sign Up</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ForgotPasswordForm
