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
  withWidth,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
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
  getTripsByDepartureAndDestinationIdsAsync,
  getLastDepartureId,
  getLastDestinationId,
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
      overflow: 'hidden'
    },
    parentGrid: {
      flexWrap: 'nowrap',
      height: "calc(100vh - 75px)",
    },
    menuPaper: {
      height: "calc(100vh - 75px)",
      backgroundColor: "whitesmoke"
    },
    listItem: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    list: {
      padding: 0,
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    }
  }),
);

const ResultsPage: React.FC<ResultsPageProps> = ({ match, width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm';
  const { departureIdAsString, destinationIdAsString } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const trips = useSelector(getTrips);
  const lastDepartureId = useSelector(getLastDepartureId);
  const lastDestinationId = useSelector(getLastDestinationId);
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().toDate());
  const [returnDate, setReturnDate] = useState<Date | null>(moment().add(1, 'days').toDate());
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
      dispatch(getTripsByDepartureAndDestinationIdsAsync({ departureId: departureId, destinationId: destinationId }))
    }
  }, [departureId, destinationId, dispatch])

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
          <Hidden smDown>
            <Grid
              item
              container
              direction='column'
              xs={2}
            >
              <Paper elevation={0} square className={classes.menuPaper}>
                <Typography variant='h4' align='center'>
                  <Box>Sliders and such</Box>
                </Typography>
              </Paper>
            </Grid>
            <Box height='100%'>
              <Divider orientation='vertical' />
            </Box>
          </Hidden>
          <Grid
            item
            container
            direction='column'
            justify='flex-end'
            xs={isSmallScreen ? 12 : 10}
          >
            <Grid item>
              <Hidden smDown>
                <Box paddingTop={2}>
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
            </Grid>
            <Divider />
            <Grid item>
              <List className={classes.list}>
                {departure?.id === lastDepartureId && destination?.id === lastDestinationId ?
                  (trips.length > 0 ? trips.map(trip => (
                    <React.Fragment key={trip.id}>
                      <ListItem button className={classes.listItem} key={trip.id} onClick={() => handleFullTripsListItemClick(trip)}>
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
                            <ListItemText secondary={`Departure date: ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}`} />
                          </Grid>
                        </Grid>
                      </ListItem>
                    </React.Fragment>
                  )) :
                    <Box>
                      <Typography variant='h5' align='center'>
                        <Box padding={8} color="text.disabled">Sorry, no trips from {departure.name} to {destination.name} found</Box>
                      </Typography>
                    </Box>
                  ) :
                  <Box>
                    <Typography variant='h5' align='center'>
                      <Box padding={8} color="text.disabled">
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
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default withWidth()(ResultsPage);