import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  Paper,
  Box,
  Hidden,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
  ButtonGroup,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { removeTransaction } from 'redux/TransactionsSlice';
import {
  resumeTrip,
  cancelTrip,
  removeTrip,
  removeTripsByLocationIdActionCreator,
} from 'redux/TripsSlice';
import { removeLocation } from 'redux/LocationsSlice';
import {
  getRequestsState,
  removeFulfilledActionCreator,
} from 'redux/RequestsStateSlice';
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
  const requestsState = useSelector(getRequestsState);
  const { showSuccess, showInfo } = useNotifications();
  const [locationToDeleteId, setLocationToDeleteId] = useState<string>('');
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string>('');
  const [tripToDeleteId, setTripToDeleteId] = useState<string>('');
  const [locationButtonDisabled, setLocationButtonDisabled] = useState<boolean>(false);
  const [tripDeleteButtonDisabled, setTripDeleteButtonDisabled] = useState<boolean>(false);
  const [tripCancelButtonDisabled, setTripCancelButtonDisabled] = useState<boolean>(false);
  const [tripResumeButtonDisabled, setTripResumeButtonDisabled] = useState<boolean>(false);
  const [transactionButtonDisabled, setTransactionButtonDisabled] = useState<boolean>(false);
  const locationIdRef = useRef<string>('');

  const handleRemoveLocationButtonClick = () => {
    if (locationToDeleteId !== '') {
      setLocationButtonDisabled(true);
      dispatch(removeLocation(locationToDeleteId));

      locationIdRef.current = locationToDeleteId;
    }
    else {
      showInfo('You need to specify the location id first.')
    }
  }

  const handleRemoveTransactionButtonClick = async () => {
    if (transactionToDeleteId !== '') {
      setTransactionButtonDisabled(true);
      dispatch(removeTransaction(transactionToDeleteId));
    }
    else {
      showInfo('You need to specify the transaction id first.')
    }
  }

  const handleRemoveTripButtonClick = () => {
    if (tripToDeleteId !== '') {
      setTripDeleteButtonDisabled(true);
      dispatch(removeTrip(tripToDeleteId));
    }
    else {
      showInfo('You need to specify the trip id first.')
    }
  }

  const handleCancelTripButtonClick = () => {
    if (tripToDeleteId !== '') {
      setTripCancelButtonDisabled(true);
      dispatch(cancelTrip(tripToDeleteId));
    }
    else {
      showInfo('You need to specify the trip id first.')
    }
  }

  const handleResumeTripButtonClick = () => {
    if (tripToDeleteId !== '') {
      setTripResumeButtonDisabled(true);
      dispatch(resumeTrip(tripToDeleteId));
    }
    else {
      showInfo('You need to specify the trip id first.')
    }
  }


  useEffect(() => {
    if (requestsState['transactions/removeTransaction'] === 'fulfilled') {
      showSuccess(`Successfully deleted transaction.`);
      setTransactionToDeleteId('');
      setTransactionButtonDisabled(false);

      dispatch(removeFulfilledActionCreator('transactions/removeTransaction'));
    }

    if (requestsState['trips/removeTrip'] === 'fulfilled') {
      showSuccess(`Successfully deleted trip.`);
      setTripToDeleteId('');
      setTripDeleteButtonDisabled(false);

      dispatch(removeFulfilledActionCreator('trips/removeTrip'));
    }

    if (requestsState['trips/resumeTrip'] === 'fulfilled') {
      showSuccess(`Successfully resumed trip.`);
      setTripToDeleteId('');
      setTripResumeButtonDisabled(false);

      dispatch(removeFulfilledActionCreator('trips/resumeTrip'));
    }

    if (requestsState['trips/cancelTrip'] === 'fulfilled') {
      showSuccess(`Successfully canceled trip.`);
      setTripToDeleteId('');
      setTripCancelButtonDisabled(false);

      dispatch(removeFulfilledActionCreator('trips/cancelTrip'));
    }

    if (requestsState['locations/removeLocation'] === 'fulfilled') {
      dispatch(removeTripsByLocationIdActionCreator(locationIdRef.current))

      showSuccess(`Successfully deleted location.`);
      setLocationToDeleteId('');
      setLocationButtonDisabled(false);

      dispatch(removeFulfilledActionCreator('locations/removeLocation'));
    }

    if (requestsState['transactions/removeTransaction'] === 'rejected') {
      setTransactionButtonDisabled(false);
    }

    if (requestsState['trips/removeTrip'] === 'rejected') {
      setTripDeleteButtonDisabled(false);
    }

    if (requestsState['trips/resumeTrip'] === 'rejected') {
      setTripResumeButtonDisabled(false);
    }

    if (requestsState['trips/cancel'] === 'rejected') {
      setTripCancelButtonDisabled(false);
    }

    if (requestsState['locations/removeLocation'] === 'rejected') {
      setLocationButtonDisabled(false);
    }
  }, [requestsState, transactionToDeleteId, tripToDeleteId, locationToDeleteId, dispatch, showSuccess])

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
                          disabled={locationButtonDisabled}
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
                          disabled={transactionButtonDisabled}
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
                        <ButtonGroup variant="contained" disableElevation>
                          <Button
                            variant='contained'
                            disableElevation
                            onClick={handleCancelTripButtonClick}
                            disabled={tripCancelButtonDisabled}
                          >
                            Cancel trip
                          </Button>
                          <Button
                            variant='contained'
                            disableElevation
                            onClick={handleRemoveTripButtonClick}
                            disabled={tripDeleteButtonDisabled}
                          >
                            Remove trip
                          </Button>
                          <Button
                            variant='contained'
                            disableElevation
                            onClick={handleResumeTripButtonClick}
                            disabled={tripResumeButtonDisabled}
                          >
                            Resume trip
                          </Button>
                        </ButtonGroup>
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
                      disabled={locationButtonDisabled}
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
                      disabled={transactionButtonDisabled}
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
                    <ButtonGroup variant="text" disableElevation fullWidth>
                      <Button
                        variant='text'
                        disableElevation
                        onClick={handleCancelTripButtonClick}
                        disabled={tripCancelButtonDisabled}
                      >
                        Cancel trip
                      </Button>
                      <Button
                        variant='text'
                        disableElevation
                        onClick={handleRemoveTripButtonClick}
                        disabled={tripDeleteButtonDisabled}
                      >
                        Remove trip
                      </Button>
                      <Button
                        variant='text'
                        disableElevation
                        onClick={handleResumeTripButtonClick}
                        disabled={tripResumeButtonDisabled}
                      >
                        Resume trip
                      </Button>
                    </ButtonGroup>
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