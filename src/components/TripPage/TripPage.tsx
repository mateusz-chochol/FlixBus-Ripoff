import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  getTrips,
  getTripById,
} from 'redux/TripsSlice';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import TripPageProps from 'types/Props/TripPageProps';
import TripNotFound from './TripNotFound';

const TripPage: React.FC<TripPageProps> = ({ match }) => {
  const { tripId } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    const id = parseInt(tripId);

    if (!isNaN(id)) {
      dispatch(getTripById(id));
    }
  }, [tripId, dispatch])

  const trip = useSelector(getTrips).find(trip => trip.id === parseInt(tripId));

  useEffect(() => {
    if (trip) {
      dispatch(getLocationsByIdArrayAsync([trip.startLocationId, trip.endLocationId]));
    }
  }, [trip, dispatch])

  const [departure, destination] = useSelector(getAllLocations).filter(location => location.id === trip?.startLocationId || location.id === trip?.endLocationId);

  if (!trip || !departure || !destination) {
    return <TripNotFound />
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 75px)"
      width="100vw"
    >
      <Grid
        container
        direction='column'
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            height="calc(35vh - 75px)"
            width="100vw"
            paddingBottom={2}
          >
            <Grid container justify='space-evenly'>
              <Grid item xs={5}>
                <Typography variant='h2' align='center'>
                  <Box fontWeight={500} letterSpacing={6} color="text.disabled">{departure.name}</Box>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='h2' align='center'>
                  <Box color="text.disabled"><KeyboardArrowRightIcon fontSize='large' /></Box>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant='h2' align='center'>
                  <Box fontWeight={500} letterSpacing={6} color="text.disabled">{destination.name}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Paper square elevation={10}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="calc(65vh)"
              width="100vw"
            >
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TripPage;