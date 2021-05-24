import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Hidden,
  Paper,
  Typography,
  TextField,
  Fab,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useAuth } from 'contexts/AuthContext';
import { useNotifications } from 'components/Misc/Notifications';
import {
  getTransactions,
  getTransactionsByUserId,
} from 'redux/TransactionsSlice';
import { getRequestsState } from 'redux/RequestsStateSlice';
import NewPasswordForms from './NewPasswordForms';
import TransactionsHistory from './TransactionsHistory';
import { ReactComponent as ProfileFirstSvg } from 'svgs/profile.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      zIndex: 5,
      height: "calc(90vh - 75px)",
      width: "90vw",
      maxWidth: "500px",
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    },
    paperBackground: {
      height: "calc(100vh - 75px)",
      width: "100vw",
      backgroundColor: 'whitesmoke'
    },
    paperMobile: {
      height: "calc(100vh - 75px)",
      width: "100vw",
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    },
    fixedItem: {
      pointerEvents: 'none'
    },
  }),
);

const ProfilePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const transactions = useSelector(getTransactions);
  const requestsState = useSelector(getRequestsState);
  const [displayName, setDisplayName] = useState<string>(currentUser ? currentUser.displayName ?? '' : '')
  const [email, setEmail] = useState<string>(currentUser ? currentUser.email ?? '' : '')
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updatingProfile, setUpdatingProgile] = useState<boolean>(false);

  const handleSaveButtonClick = async () => {
    let errors = false;

    if (email !== '' && !email.match(/^.+@.+\.[a-z]+$/)) {
      showError('Email must be empty or must be in a correct format.');
      errors = true;
    }

    if (newPassword.length > 0) {
      if (newPassword.length < 6) {
        showError('Password must be at least 6 characters.');
        errors = true;
      }
      else if (newPassword !== confirmedPassword) {
        showError('Passwords do not match.');
        errors = true;
      }
    }

    if (!errors && currentUser) {
      const updates: Promise<void>[] = [];

      if (displayName !== currentUser.displayName) {
        updates.push(currentUser.updateProfile({
          displayName: displayName
        }));
      }

      if (email !== currentUser.email) {
        updates.push(currentUser.updateEmail(email));
      }

      if (newPassword.length > 0) {
        updates.push(currentUser.updatePassword(newPassword));
      }

      if (updates.length > 0) {
        try {
          setUpdatingProgile(true);

          await Promise.all(updates);

          showSuccess('Profile successfully updated.');
        }
        catch (error) {
          console.error(error);

          showError('Something went wrong.')
        }

        setUpdatingProgile(false);
      }
    }
  }

  useEffect(() => {
    const requestsToCheck = [
      requestsState['transactions/getTransactionsByUserId'],
    ];

    if (requestsToCheck.some(request => request === 'pending')) {
      setIsLoading(true);
    }
    else {
      const turnOfLoadingTimeout = setTimeout(() => setIsLoading(false), 800);

      return () => clearTimeout(turnOfLoadingTimeout);
    }
  }, [requestsState])

  useEffect(() => {
    if (currentUser) {
      dispatch(getTransactionsByUserId(currentUser.uid));
      setNewPassword('');
    }
  }, [dispatch, currentUser])

  return (
    <Paper className={classes.paperBackground} square elevation={0}>
      <Box
        height='calc(100vh - 75px)'
        width='100vw'
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='relative'
        overflow='hidden'
      >
        <Hidden xsDown>
          <Box
            position='absolute'
            zIndex={4}
            right={0}
            left={0}
            paddingLeft={10}
            paddingRight={5}
          >
            <ProfileFirstSvg className={classes.fixedItem} width='100%' height='100%' />
          </Box>
          <Paper className={classes.paper} elevation={4}>
            <Box paddingX={2} display='flex' flexDirection='column'>
              <Box paddingX={2} paddingY={3}>
                <Typography variant='h2' align='center' color='textSecondary'>Profile</Typography>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' paddingTop={3} paddingBottom={2} paddingX={2}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  label='Display name'
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  type='email'
                  label='Email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Box>
              <NewPasswordForms
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmedPassword={confirmedPassword}
                setConfirmedPassword={setConfirmedPassword}
              />
              <TransactionsHistory transactions={transactions} isLoading={isLoading} />
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding={2}
                position='absolute'
                bottom='5%'
                left={0}
                right={0}
              >
                <Fab
                  variant="extended"
                  color='secondary'
                  size='large'
                  onClick={handleSaveButtonClick}
                  disabled={updatingProfile}
                >
                  <Box paddingRight={1}>
                    Save profile
                </Box>
                  <Box display='flex' alignItems='center'>
                    <SaveIcon />
                  </Box>
                </Fab>
              </Box>
            </Box>
          </Paper>
        </Hidden>
        <Hidden smUp>
          <Paper className={classes.paperMobile} square elevation={0}>
            <Box paddingX={2} display='flex' flexDirection='column'>
              <Box paddingX={2} paddingY={3}>
                <Typography variant='h2' align='center' color='textSecondary'>Profile</Typography>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' paddingTop={3} paddingBottom={2} paddingX={2}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  label='Display name'
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  type='email'
                  label='Email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Box>
              <NewPasswordForms
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmedPassword={confirmedPassword}
                setConfirmedPassword={setConfirmedPassword}
              />
              <TransactionsHistory transactions={transactions} isLoading={isLoading} />
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding={2}
                position='absolute'
                bottom={0}
                left={0}
                right={0}
              >
                <Fab
                  variant="extended"
                  color='secondary'
                  size='large'
                  onClick={handleSaveButtonClick}
                  disabled={updatingProfile}
                >
                  <Box paddingRight={1}>
                    Save profile
                </Box>
                  <Box display='flex' alignItems='center'>
                    <SaveIcon />
                  </Box>
                </Fab>
              </Box>
            </Box>
          </Paper>
        </Hidden>
      </Box>
    </Paper>
  )
}

export default ProfilePage;