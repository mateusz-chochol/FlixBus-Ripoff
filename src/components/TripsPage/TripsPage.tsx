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
import { ReactComponent as TripsSvg } from 'svgs/trips.svg';
import Trip from 'types/Objects/Trip';
import TripsList from './TripsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
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
      },
      backgroundColor: 'whitesmoke'
    },
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
    <Paper className={classes.paper} square elevation={0}>
      <Hidden smDown>
        <Box position='relative'>
          <Box position='absolute' right='5%' top='10vh'>
            <Box padding={3}>
              <Typography variant='h1' color='textSecondary'>
                Trips history
              </Typography>
            </Box>
            <TripsSvg />
          </Box>
        </Box>
        {isLoading ?
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            height='100%'
            width='50%'
          >
            <CircularProgress size={250} thickness={1} />
          </Box> :
          <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
            height='100%'
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
      </Hidden>
    </Paper>
  )
}

export default TripsPage;