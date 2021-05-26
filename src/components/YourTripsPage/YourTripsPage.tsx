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
import { ReactComponent as MapSvg } from 'svgs/map.svg';
import TripWithTransaction from 'types/Objects/TripWithTransaction';

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
  const [upcomingList, setUpcomingList] = useState<TripWithTransaction[]>([]);
  const [previousList, setPreviousList] = useState<TripWithTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTripsWithTransaction = useCallback(() => {
    return transactions.map(transaction => transaction.tripIds.map(tripId => {
      return {
        trip: trips.find(trip => trip.id === tripId.tripId),
        transaction: transaction
      }
    })).flat()
  }, [transactions, trips])

  const getTripIdsWithTransactionIds = useCallback(() => {
    return transactions.map(transaction => transaction.tripIds.map(tripId => {
      return {
        tripId: tripId.tripId,
        transactionId: transaction.id
      }
    })).flat()
  }, [transactions])

  const isTripInTransactions = useCallback((trip: Trip) => {
    return getTripIdsWithTransactionIds().map(tripId => tripId.tripId).includes(trip.id);
  }, [getTripIdsWithTransactionIds]);

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
    if (currentUser && transactions.length === 0) {
      dispatch(getTransactionsByUserId(currentUser.uid));
    }
  }, [dispatch, currentUser, transactions.length])

  useEffect(() => {
    if (transactions.length > 0) {
      dispatch(getTripsByIdsArray(getTripIdsWithTransactionIds().map(tripId => tripId.tripId)));
    }
  }, [transactions, getTripIdsWithTransactionIds, dispatch])

  useEffect(() => {
    setUpcomingList(getTripsWithTransaction().filter(tripWithTransaction =>
      tripWithTransaction.trip && moment(tripWithTransaction.trip.date).isSameOrAfter(moment().add(-1, 'days'))))

    setPreviousList(getTripsWithTransaction().filter(tripWithTransaction =>
      tripWithTransaction.trip && moment(tripWithTransaction.trip.date).isBefore(moment().add(-1, 'days'))))
  }, [getTripsWithTransaction])

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
            <MapSvg className={classes.fixedItem} width='100%' height='100%' />
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
                  list={upcomingList}
                  locations={locations}
                  title='Upcoming trips'
                  emptyListMessage='No upcoming trips'
                />
                <Box display='flex' width='400px' height='1px' marginBottom={4}>
                  {upcomingList.length === 0 &&
                    <Divider flexItem className={classes.divider} />
                  }
                </Box>
                <TripsList
                  list={previousList}
                  locations={locations}
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
                  list={upcomingList}
                  locations={locations}
                  title='Upcoming trips'
                  emptyListMessage='No upcoming trips'
                />
                <Box display='flex' width='400px' height='1px' marginBottom={4}>
                  {upcomingList.length === 0 &&
                    <Divider flexItem className={classes.divider} />
                  }
                </Box>
                <TripsList
                  list={previousList}
                  locations={locations}
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