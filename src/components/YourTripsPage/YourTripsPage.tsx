import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Paper,
  Box,
  Hidden,
  Typography,
  CircularProgress,
  Divider,
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
import {
  getTrips,
  getTripsByIdsArray,
} from 'redux/TripsSlice';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import { getRequestsState } from 'redux/RequestsStateSlice';
import moment from 'moment';
import Trip from 'types/Objects/Trip';
import TripsList from './TripsList';
import { ReactComponent as TripsSvg } from 'svgs/trips.svg';

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
    divider: {
      width: '100%'
    }
  }),
);

const TripsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const transactions = useSelector(getTransactions);
  const trips = useSelector(getTrips);
  const locations = useSelector(getAllLocations);
  const requestsState = useSelector(getRequestsState);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>(trips.filter(trip => moment(trip.date).isSameOrAfter(moment())));
  const [previousTrips, setPreviousTrips] = useState<Trip[]>(trips.filter(trip => moment(trip.date).isBefore(moment())));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTripIdsWithTransactions = useCallback(() => {
    return transactions.map(transaction => transaction.tripIds.map(tripId => {
      return {
        tripId: tripId.tripId,
        transactionId: transaction.id
      }
    })).flat()
  }, [transactions])

  const isTripInTransactions = useCallback((trip: Trip) => {
    return getTripIdsWithTransactions().map(tripId => tripId.tripId).includes(trip.id);
  }, [getTripIdsWithTransactions]);

  useEffect(() => {
    const requestsToCheck = [
      requestsState['transactions/getTransactionsByUserId'],
      requestsState['trips/getTripsByIdsArray'],
      requestsState['locations/getLocationsByIdArrayAsync'],
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

  useEffect(() => {
    if (transactions.length > 0) {
      dispatch(getTripsByIdsArray(getTripIdsWithTransactions().map(tripId => tripId.tripId)));
    }
  }, [transactions, trips, getTripIdsWithTransactions, dispatch])

  useEffect(() => {
    setUpcomingTrips(trips.filter(trip => moment(trip.date).isSameOrAfter(moment()) && isTripInTransactions(trip)));
    setPreviousTrips(trips.filter(trip => moment(trip.date).isBefore(moment()) && isTripInTransactions(trip)));
  }, [trips, isTripInTransactions])

  useEffect(() => {
    const locationsIds = trips.filter(trip => isTripInTransactions(trip))
      .map(trip => [trip.startLocationId, trip.endLocationId])
      .flat();

    dispatch(getLocationsByIdArrayAsync(locationsIds))
  }, [transactions, trips, isTripInTransactions, dispatch])

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
            <TripsSvg className={classes.fixedItem} width='100%' height='100%' />
          </Box>
          <Paper className={classes.paper} elevation={4}>
            <Box paddingX={2} paddingY={3}>
              <Typography variant='h2' align='center' color='textSecondary'>Your trips</Typography>
            </Box>
            {isLoading ?
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                height='80%'
                width='100%'
              >
                <CircularProgress color='secondary' size={250} thickness={1} />
              </Box> :
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                padding={4}
              >
                <TripsList
                  trips={upcomingTrips}
                  transactions={transactions}
                  locations={locations}
                  getTripIdsWithTransactions={getTripIdsWithTransactions}
                  title='Upcoming trips'
                  emptyListMessage='No upcoming trips'
                />
                <Box display='flex' width='400px' height='1px' marginBottom={4} >
                  <Divider flexItem className={classes.divider} />
                </Box>
                <TripsList
                  trips={previousTrips}
                  transactions={transactions}
                  locations={locations}
                  getTripIdsWithTransactions={getTripIdsWithTransactions}
                  title='Previous trips'
                  emptyListMessage='No previous trips'
                />
              </Box>
            }
          </Paper>
        </Hidden>
        <Hidden smUp>
          <Paper className={classes.paperMobile} elevation={0} square>
            <Box paddingX={2} paddingY={3}>
              <Typography variant='h2' align='center' color='textSecondary'>Your trips</Typography>
            </Box>
            {isLoading ?
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                height='80%'
                width='100%'
              >
                <CircularProgress color='secondary' size={250} thickness={1} />
              </Box> :
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                padding={4}
              >
                <TripsList
                  trips={upcomingTrips}
                  transactions={transactions}
                  locations={locations}
                  getTripIdsWithTransactions={getTripIdsWithTransactions}
                  title='Upcoming trips'
                  emptyListMessage='No upcoming trips'
                />
                <Box display='flex' width='400px' height='1px' marginBottom={4} >
                  <Divider flexItem className={classes.divider} />
                </Box>
                <TripsList
                  trips={previousTrips}
                  transactions={transactions}
                  locations={locations}
                  getTripIdsWithTransactions={getTripIdsWithTransactions}
                  title='Previous trips'
                  emptyListMessage='No previous trips'
                />
              </Box>
            }
          </Paper>
        </Hidden>
      </Box>
    </Paper>
  )
}

export default TripsPage;