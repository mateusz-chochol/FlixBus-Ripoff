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
  Button,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useAuth } from 'contexts/AuthContext';
import {
  getTransactions,
  getTransactionsByUserId,
} from 'redux/TransactionsSlice';
import { getRequestsState } from 'redux/RequestsStateSlice';
import DisplayNameAndPhoneForms from './DisplayNameAndPhoneForms';
import NewPasswordForms from './NewPasswordForms';
import TransactionsHistory from './TransactionsHistory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
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
  }),
);

const ProfilePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const transactions = useSelector(getTransactions);
  const requestsState = useSelector(getRequestsState);
  const [displayName, setDisplayName] = useState<string>(currentUser ? currentUser.displayName ?? '' : '')
  const [email, setEmail] = useState<string>(currentUser ? currentUser.email ?? '' : '')
  const [phoneNumber, setPhoneNumber] = useState<string>(currentUser ? currentUser.phoneNumber ?? '' : '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    }
  }, [dispatch, currentUser])

  return (
    <Box
      height='calc(100vh - 75px)'
      width='100vw'
      display='flex'
      justifyContent='center'
      alignItems='center'
      position='relative'
    >
      <Hidden smDown>
        <Paper className={classes.paper} elevation={4}>
          <Box paddingX={2} display='flex' flexDirection='column'>
            <Box paddingX={2} paddingY={3}>
              <Typography variant='h2' align='center' color='textSecondary'>Profile</Typography>
            </Box>
            <DisplayNameAndPhoneForms
              displayName={displayName}
              setDisplayName={setDisplayName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
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
              <Button
                size='large'
                variant='contained'
                color='secondary'
              >
                Update profile
              </Button>
            </Box>
          </Box>
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <Paper className={classes.paperMobile} square elevation={0}>
          <Box paddingX={2} display='flex' flexDirection='column'>
            <Box paddingX={2} paddingY={3}>
              <Typography variant='h2' align='center' color='textSecondary'>Profile</Typography>
            </Box>
            <DisplayNameAndPhoneForms
              displayName={displayName}
              setDisplayName={setDisplayName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              separateLines
            />
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
              <Button
                size='large'
                variant='contained'
                color='secondary'
              >
                Update profile
              </Button>
            </Box>
          </Box>
        </Paper>
      </Hidden>
    </Box>
  )
}

export default ProfilePage;