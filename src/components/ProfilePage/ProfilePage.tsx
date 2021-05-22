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
  List,
  ListItem,
  Grid,
  CircularProgress,
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
            <Box display='flex' justifyContent='center' alignItems='center' paddingTop={3} paddingBottom={2}>
              <Box paddingRight={1}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  label='Display name'
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
              </Box>
              <Box paddingLeft={1}>
                <TextField
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  label='Phone number'
                  type='tel'
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Box>
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
            <Box paddingX={2} paddingTop={3}>
              <Typography variant='h5' align='center' color='textSecondary'>Change password</Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
              <TextField
                variant='outlined'
                color='secondary'
                fullWidth
                label='New password'
                type='password'
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
              <TextField
                variant='outlined'
                color='secondary'
                fullWidth
                label='Confirm new password'
                type='password'
                value={confirmedPassword}
                onChange={(event) => setConfirmedPassword(event.target.value)}
              />
            </Box>
            <Box paddingBottom={8}>
              {isLoading ?
                <Box display='flex' alignItems='center' justifyContent='center' paddingTop={5}>
                  <CircularProgress color='secondary' thickness={1} size={50} />
                </Box> :
                (transactions.length > 0 ?
                  <>
                    <Box paddingX={2} paddingTop={3}>
                      <Typography variant='h5' align='center' color='textSecondary'>Transactions history</Typography>
                    </Box>
                    <Box>
                      <List>
                        {transactions.map(transaction => {
                          return (
                            <ListItem key={transaction.id} divider>
                              <Grid container direction='column'>
                                <Grid item>
                                  <Typography color='textSecondary'>id: <b>{transaction.id}</b></Typography>
                                </Grid>
                                <Grid item>
                                  <Typography color='textSecondary'>date: <b>{transaction.date}</b></Typography>
                                </Grid>
                                <Grid item>
                                  <Typography color='textSecondary'>cost: <b>{transaction.price}$</b></Typography>
                                </Grid>
                                <Grid item>
                                  <Typography color='textSecondary'>trips: <b>{transaction.tripIds.length}</b></Typography>
                                </Grid>
                                <Grid item>
                                  <Typography color='textSecondary'>total seats: <b>{transaction.tripIds.map(trip => trip.seats).reduce((acc, cur) => acc + cur)}</b></Typography>
                                </Grid>
                              </Grid>
                            </ListItem>
                          )
                        })}
                      </List>
                      <Typography></Typography>
                    </Box>
                  </> :
                  <Box paddingX={2} paddingY={3}>
                    <Typography variant='h5' align='center' color='textSecondary'>Nothing in transactions history yet.</Typography>
                  </Box>
                )
              }
            </Box>
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

        </Paper>
      </Hidden>
    </Box>
  )
}

export default ProfilePage;