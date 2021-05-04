import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  withWidth,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
} from 'redux/LocationsSlice';
import {
  getTrips,
  getTripsByDepartureAndDestinationIdsAndDateAsync,
  getReturnTrips,
  getReturnTripsByReturnDateAsync,
} from 'redux/TripsSlice';
import { setTab } from 'redux/TabsSlice';
import ResultsPageProps from 'types/Props/ResultsPageProps';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import Trip from 'types/Objects/Trip';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';
import DepartureDestinationFormSmall from 'components/DepartureDestinationForm/DepartureDestinationFormSmall';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
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
    parentGrid: {
      flexWrap: 'nowrap',
      height: "calc(100vh - 75px)",
    },
    bigMenuPaper: {
      height: "calc(100vh - 75px)",
      width: "100%",
      backgroundColor: "whitesmoke",
      position: "fixed",
      maxWidth: 'inherit'
    },
    smallMenuPaper: {
      backgroundColor: "whitesmoke",
      width: "100%",
    },
    listsGrid: {
      flexWrap: 'nowrap'
    },
    listItem: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    list: {
      padding: 0,
      height: '100%',
      backgroundColor: theme.palette.background.paper
    },
    leftDivider: {
      height: "calc(100vh - 75px)",
      marginRight: "1px"
    },
    formGrid: {
      zIndex: 3,
    },
    listsDivider: {
      left: 'auto',
      zIndex: 2,
    }
  }),
);

const ResultsPage: React.FC<ResultsPageProps> = ({ match, width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm' || width === 'md';
  const { departureIdAsString, destinationIdAsString, departureDateAsString, returnDateAsString } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const trips = useSelector(getTrips);
  const returnTrips = useSelector(getReturnTrips);
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(returnDateAsString ? TripType.RoundTrip : TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment(departureDateAsString).isSameOrAfter(moment()) ?
    moment.utc(departureDateAsString).toDate() :
    moment().toDate()
  );
  const [returnDate, setReturnDate] = useState<Date | null>(returnDateAsString && moment(returnDateAsString).isSameOrAfter(departureDate) ?
    moment.utc(returnDateAsString).toDate() :
    moment(departureDate).add(1, 'days').toDate()
  );
  const [hasSetup, setHasSetup] = useState<boolean>(false);

  const handleFullTripsListItemClick = (trip: Trip) => {
    history.push(routes.tripPage.replace(':tripId', trip.id.toString()));
  }

  useEffect(() => {
    dispatch(setTab(false));
  }, [dispatch])

  useEffect(() => {
    if (!isNaN(departureId) && !isNaN(destinationId)) {
      dispatch(getLocationsByIdArrayAsync([departureId, destinationId]))
      dispatch(getTripsByDepartureAndDestinationIdsAndDateAsync({ departureId: departureId, destinationId: destinationId, departureDate: moment.utc(departureDateAsString).toDate() }))

      if (returnDateAsString) {
        dispatch(getReturnTripsByReturnDateAsync({ departureId: departureId, destinationId: destinationId, returnDate: moment.utc(returnDateAsString).toDate() }))
      }
    }
  }, [departureId, destinationId, departureDateAsString, returnDateAsString, dispatch])

  useEffect(() => {
    if (!hasSetup) {
      const allLocationsIds = allLocations.map(location => location.id);

      if (allLocationsIds.includes(departureId) && allLocationsIds.includes(destinationId)) {
        setDeparture(allLocations.find(location => location.id === departureId));
        setDestination(allLocations.find(location => location.id === destinationId));
        setHasSetup(true);
      }
    }
  }, [departureId, destinationId, allLocations, hasSetup])

  useEffect(() => {
    if (departure) {
      dispatch(getDepartureLocationsBySubstringAsync(departure.name))
    }
    if (destination) {
      dispatch(getDestinationLocationsBySubstringAsync(destination.name))
    }
  }, [departure, destination, dispatch])

  console.log(moment.utc(returnDate?.toLocaleDateString()).toDate().toISOString().split('T')[0])

  return (
    <Paper square className={classes.paper}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Grid
          container
          className={classes.parentGrid}
          alignItems='flex-start'
        >
          <Hidden mdDown>
            <Grid
              item
              container
              direction='column'
              xs={2}
            >
              <Paper elevation={0} square className={classes.bigMenuPaper}>
                <Grid
                  item
                  container
                  direction='row'
                  justify='flex-end'
                  className={classes.parentGrid}
                >
                  <Grid
                    item
                    container
                    direction='column'
                  >
                    <Typography variant='h4' align='center'>
                      Sliders and such
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider orientation='vertical' className={classes.leftDivider} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Hidden>
          <Grid
            item
            container
            direction='column'
            justify='flex-end'
            xs={isSmallScreen ? 12 : 10}
          >
            <Grid item className={classes.formGrid}>
              <Paper square elevation={0}>
                <Hidden smDown>
                  <Box paddingTop={2} color='white'>
                    <DepartureDestinationFormFull
                      departure={departure}
                      setDeparture={setDeparture}
                      destination={destination}
                      setDestination={setDestination}
                      departureDate={departureDate}
                      setDepartureDate={setDepartureDate}
                      returnDate={returnDate}
                      setReturnDate={setReturnDate}
                      numberOfPassengers={numberOfPassengers}
                      setNumberOfPassengers={setNumberOfPassengers}
                      tripType={tripType}
                      setTripType={setTripType}
                      departureLocations={departureLocations}
                      destinationLocations={destinationLocations}
                      fullWidth
                    />
                  </Box>
                </Hidden>
                <Hidden mdUp>
                  <Box paddingTop={2} paddingLeft={6} paddingRight={6}>
                    <DepartureDestinationFormSmall
                      departure={departure}
                      setDeparture={setDeparture}
                      destination={destination}
                      setDestination={setDestination}
                      departureDate={departureDate}
                      setDepartureDate={setDepartureDate}
                      returnDate={returnDate}
                      setReturnDate={setReturnDate}
                      numberOfPassengers={numberOfPassengers}
                      setNumberOfPassengers={setNumberOfPassengers}
                      tripType={tripType}
                      setTripType={setTripType}
                      departureLocations={departureLocations}
                      destinationLocations={destinationLocations}
                      fullWidth
                    />
                  </Box>
                </Hidden>
                <Hidden lgUp>
                  <Divider />
                  <Paper elevation={0} square className={classes.smallMenuPaper}>
                    <Typography variant='h4' align='center'>
                      Sliders and such
                    </Typography>
                  </Paper>
                </Hidden>
              </Paper>
            </Grid>
            <Divider />
            <Grid item container className={classes.listsGrid}>
              <Grid item xs={tripType === TripType.OneWay ? 12 : 6}>
                <List className={classes.list} subheader={<ListSubheader component="div">Departure trips</ListSubheader>}>
                  {departure?.id === departureId && destination?.id === destinationId ?
                    (trips.length > 0 ? trips.map(trip => (
                      <React.Fragment key={trip.id}>
                        <ListItem button className={isSmallScreen ? undefined : classes.listItem} key={trip.id} onClick={() => handleFullTripsListItemClick(trip)}>
                          <Grid container direction='row'>
                            <Grid item container alignItems='flex-end' justify='space-evenly'>
                              <Grid item>
                                <ListItemText primary={allLocations.find(location => location.id === trip.startLocationId)?.name} />
                              </Grid>
                              <Grid item>
                                <ArrowRightAltIcon />
                              </Grid>
                              <Grid item>
                                <ListItemText primary={allLocations.find(location => location.id === trip.endLocationId)?.name} />
                              </Grid>
                            </Grid>
                            <Grid item>
                              <ListItemText secondary={`Date: ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}, duration: ${trip.tripDuration}h`} />
                            </Grid>
                          </Grid>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add to cart">
                              <AddCircleIcon color='secondary' />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    )) :
                      <Box>
                        <Typography variant='h5' align='center'>
                          <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                            {departureDateAsString ?
                              `Sorry, no trips from ${departure.name} to ${destination.name} found on ${departureDateAsString}` :
                              "Press search to search for the results"
                            }
                          </Box>
                        </Typography>
                      </Box>
                    ) :
                    <Box>
                      <Typography variant='h5' align='center'>
                        <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                          {departure && destination ?
                            "Press search to search for the results" :
                            "Fill the forms above to search for the trips"
                          }
                        </Box>
                      </Typography>
                    </Box>
                  }
                </List>
              </Grid>
              {tripType === TripType.RoundTrip &&
                <>
                  <Grid item>
                    <Divider orientation='vertical' absolute className={classes.listsDivider} />
                  </Grid>
                  <Grid item xs={6}>
                    <List className={classes.list} subheader={<ListSubheader component="div">Return trips</ListSubheader>}>
                      {departure?.id === departureId && destination?.id === destinationId ?
                        (returnTrips.length > 0 ? returnTrips.map(trip => (
                          <React.Fragment key={trip.id}>
                            <ListItem button className={isSmallScreen ? undefined : classes.listItem} key={trip.id} onClick={() => handleFullTripsListItemClick(trip)}>
                              <Grid container direction='row'>
                                <Grid item container alignItems='flex-end' justify='space-evenly'>
                                  <Grid item>
                                    <ListItemText primary={allLocations.find(location => location.id === trip.startLocationId)?.name} />
                                  </Grid>
                                  <Grid item>
                                    <ArrowRightAltIcon />
                                  </Grid>
                                  <Grid item>
                                    <ListItemText primary={allLocations.find(location => location.id === trip.endLocationId)?.name} />
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <ListItemText secondary={`Date: ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}, duration: ${trip.tripDuration}h`} />
                                </Grid>
                              </Grid>
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="add to cart">
                                  <AddCircleIcon color='secondary' />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </React.Fragment>
                        )) :
                          <Box>
                            <Typography variant='h5' align='center'>
                              <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                                {returnDateAsString ?
                                  `Sorry, no trips from ${destination.name} to ${departure.name} found on ${returnDateAsString}` :
                                  "Press search to search for the results"
                                }
                              </Box>
                            </Typography>
                          </Box>
                        ) :
                        <Box>
                          <Typography variant='h5' align='center'>
                            <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                              {departure && destination ?
                                "Press search to search for the results" :
                                "Fill the forms above to search for the trips"
                              }
                            </Box>
                          </Typography>
                        </Box>
                      }
                    </List>
                  </Grid>
                </>
              }
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default withWidth()(ResultsPage);