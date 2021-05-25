import React, { useState } from 'react';
import {
  Paper,
  Box,
  Hidden,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { removeTransaction } from 'redux/TransactionsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import LocationsForm from './LocationsForm';
import TripsForm from './TripsForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: "calc(90vh - 75px)",
      width: "90vw",
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
  }),
);

const AdminPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showSuccess } = useNotifications();
  const [locationToDeleteId, setLocationToDeleteId] = useState<string>('');
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string>('');
  const [tripToDeleteId, setTripToDeleteId] = useState<string>('');

  const handleRemoveLocationButtonClick = () => {
    if (locationToDeleteId !== '') {
      //todo implement location deletion

      showSuccess(`Successfully deleted location with id: ${locationToDeleteId}`)
    }
  }

  const handleRemoveTransactionButtonClick = () => {
    if (transactionToDeleteId !== '') {
      dispatch(removeTransaction(transactionToDeleteId));

      setTransactionToDeleteId('');
      showSuccess(`Successfully deleted transaction with id: ${transactionToDeleteId}`)
    }
  }

  const handleRemoveTripButtonClick = () => {
    if (tripToDeleteId !== '') {
      //todo implement trip deletion

      showSuccess(`Successfully deleted trip with id: ${tripToDeleteId}`)
    }
  }

  return (
    <Paper className={classes.paperBackground} square elevation={0}>
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
            <Grid container>
              <Grid item xs={6}>
                <LocationsForm />
              </Grid>
              <Grid item xs={6}>
                <TripsForm />
              </Grid>
              <Box width='100%' paddingY={5}>
                <Box paddingBottom={5}>
                  <Divider />
                </Box>
                <Grid container item xs={12} justify='center'>
                  <Grid item xs={12}>
                    <Box width='100%' paddingBottom={2}>
                      <Typography variant='h2' color='textSecondary' align='center' gutterBottom>
                        Remove items
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box paddingRight={2} paddingLeft={5}>
                      <TextField
                        value={locationToDeleteId}
                        onChange={(event) => setLocationToDeleteId(event.target.value)}
                        label='Location id'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                      />
                      <Box display='flex' justifyContent='center' paddingTop={3}>
                        <Button
                          variant='contained'
                          disableElevation
                          onClick={handleRemoveLocationButtonClick}
                        >
                          Remove location
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box paddingX={2}>
                      <TextField
                        value={transactionToDeleteId}
                        onChange={(event) => setTransactionToDeleteId(event.target.value)}
                        label='Transaction id'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                      />
                      <Box display='flex' justifyContent='center' paddingTop={3}>
                        <Button
                          variant='contained'
                          disableElevation
                          onClick={handleRemoveTransactionButtonClick}
                        >
                          Remove transaction
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box paddingLeft={2} paddingRight={5}>
                      <TextField
                        value={tripToDeleteId}
                        onChange={(event) => setTripToDeleteId(event.target.value)}
                        label='Trip id'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                      />
                      <Box display='flex' justifyContent='center' paddingTop={3}>
                        <Button
                          variant='contained'
                          disableElevation
                          onClick={handleRemoveTripButtonClick}
                        >
                          Remove trip
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Paper>
        </Hidden>
        <Hidden mdUp>
          <Paper className={classes.paperMobile} elevation={0} square>
            <Grid container direction='column'>
              <Grid item xs={12}>
                <LocationsForm />
              </Grid>
              <Box paddingBottom={2}>
                <Divider />
              </Box>
              <Grid item xs={12}>
                <Box paddingBottom={4}>
                  <TripsForm />
                </Box>
              </Grid>
              <Box paddingBottom={2}>
                <Divider />
              </Box>
              <Grid item xs={12}>
                <Box width='100%' paddingBottom={2}>
                  <Typography variant='h2' color='textSecondary' align='center' gutterBottom>
                    Remove items
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingX={5} paddingY={3}>
                  <TextField
                    value={locationToDeleteId}
                    onChange={(event) => setLocationToDeleteId(event.target.value)}
                    label='Location id'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                  />
                  <Box display='flex' justifyContent='center'>
                    <Button
                      disableElevation
                      onClick={handleRemoveLocationButtonClick}
                      fullWidth
                    >
                      Remove location
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingX={5} paddingY={3}>
                  <TextField
                    value={transactionToDeleteId}
                    onChange={(event) => setTransactionToDeleteId(event.target.value)}
                    label='Transaction id'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                  />
                  <Box display='flex' justifyContent='center'>
                    <Button
                      disableElevation
                      fullWidth
                      onClick={handleRemoveTransactionButtonClick}
                    >
                      Remove transaction
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingX={5} paddingTop={3} paddingBottom={6}>
                  <TextField
                    value={tripToDeleteId}
                    onChange={(event) => setTripToDeleteId(event.target.value)}
                    label='Trip id'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                  />
                  <Box display='flex' justifyContent='center'>
                    <Button
                      disableElevation
                      fullWidth
                      onClick={handleRemoveTripButtonClick}
                    >
                      Remove trip
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Hidden>
      </Box>
    </Paper>
  )
}

export default AdminPage;