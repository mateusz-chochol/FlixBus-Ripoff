import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Hidden,
  Drawer,
  Toolbar,
  Grid,
  Divider,
  Paper,
  withWidth,
  WithWidth,
} from '@material-ui/core';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  getBasicTrips,
  getBasicTripsFromDepartureIdAsync,
} from 'redux/BasicTripsSlice';
import {
  getAllLocations,
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
  getLocationsForMap,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import {
  getTrips,
  getLastDepartureId,
  getLastDestinationId,
  getTripsByDepartureAndDestinationIdsAsync,
  setLastDepartureIdActionCreator,
  setLastDestinationIdActionCreator,
} from 'redux/TripsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import Location from 'types/Objects/Location';
import TripsList from './TripsList';
import GoogleMap from './GoogleMap';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: theme.zIndex.appBar - 1,
    },
    footerPaper: {
      height: '100%'
    },
    grid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
    footerGrid: {
      height: '100%',
      padding: 0
    },
    formsGrid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
    list: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
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
    },
    smallList: {
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      '&::-webkit-scrollbar': {
        height: '1em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    },
    smallListItem: {
      minWidth: '220px',
      minHeight: '80px',
      overflow: 'hidden'
    },
    divider: {
      width: '100%',
      height: '1px',
      alignSelf: 'flex-start'
    }
  }),
);

const RouteMapPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm';
  const dispatch = useDispatch();
  const allLocations = useSelector(getAllLocations);
  const departureLocationsForTextFields = useSelector(getLocationsForDepartureTextField);
  const destinationLocationsForTextFields = useSelector(getLocationsForDestinationTextField);
  const locationsForMap = useSelector(getLocationsForMap);
  const basicTrips = useSelector(getBasicTrips).trips;
  const trips = useSelector(getTrips);
  const lastDepartureId = useSelector(getLastDepartureId);
  const lastDestinationId = useSelector(getLastDestinationId);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [isValidTripSelected, setIsValidTripSelected] = useState<boolean>(false);
  const navBarHeight = '75px';
  const smallScreenFormsHeight = '200px';

  useEffect(() => {
    setIsValidTripSelected(false);

    if (departure && destination) {
      if (lastDepartureId !== departure.id || lastDestinationId !== destination.id) {
        dispatch(getTripsByDepartureAndDestinationIdsAsync({ departureId: departure.id, destinationId: destination.id }));
      }

      if (lastDepartureId !== departure.id) {
        dispatch(getBasicTripsFromDepartureIdAsync(departure.id));
      }

      if (trips.find(trip => trip.startLocationId === departure.id && trip.endLocationId === destination.id) !== undefined) {
        setIsValidTripSelected(true);
      }
    }
    else if (destination && !departure) {
      setDestination(undefined);
    }
    else if (departure) {
      if (lastDepartureId !== departure.id) {
        dispatch(getBasicTripsFromDepartureIdAsync(departure.id));
        dispatch(setLastDepartureIdActionCreator(departure.id));
      }

      if (lastDestinationId !== 0) {
        dispatch(setLastDestinationIdActionCreator(0));
      }
    }
  }, [departure, destination, showInfo, dispatch, trips, lastDepartureId, lastDestinationId]);

  useEffect(() => {
    const ids = basicTrips.map(trip => trip.endLocationId);

    if (ids.length > 0) {
      dispatch(getLocationsByIdArrayAsync(ids));
    }
  }, [basicTrips, dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      flexDirection={isSmallScreen ? 'column' : 'row'}
    >
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Toolbar />
          <Grid
            container
            direction='column'
            spacing={2}
            className={classes.grid}
          >
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={departureLocationsForTextFields}
                  place={departure}
                  setPlace={setDeparture}
                  toDispatch={getDepartureLocationsBySubstringAsync}
                  label="From"
                  placeholder="Start from..."
                  disableClearable={isSmallScreen}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={destinationLocationsForTextFields}
                  trips={basicTrips}
                  place={destination}
                  setPlace={setDestination}
                  toDispatch={getDestinationLocationsBySubstringAsync}
                  shouldHideOptions={departure === undefined}
                  label="To"
                  placeholder="Finish in..."
                  disableClearable={isSmallScreen}
                />
              </Box>
            </Grid>
            <Grid
              item
              container
              spacing={1}
              className={classes.grid}
            >
              <Grid item xs={6}>
                <Box display='flex' justifyContent='flex-end' alignItems='center'>
                  <SwitchLocationsButton
                    departure={departure}
                    setDeparture={setDeparture}
                    destination={destination}
                    setDestination={setDestination}
                    fontSize='large'
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display='flex' justifyContent='flex-start' alignItems='center'>
                  <SearchButton departure={departure} destination={destination} />
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>
          <TripsList
            departure={departure}
            destination={destination}
            locations={allLocations}
            basicTrips={basicTrips}
            trips={trips}
            isSmallScreen={isSmallScreen}
            listClassName={classes.list}
            typographyProps={{
              variant: 'h5',
            }}
            messageBoxProps={{
              height: '100%',
            }}
          />
        </Drawer>
      </Hidden>
      <GoogleMap
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        locationsForMap={locationsForMap}
        basicTrips={basicTrips}
        isValidTripSelected={isValidTripSelected}
        isSmallScreen={isSmallScreen}
        navBarHeight={navBarHeight}
        smallScreenFormsHeight={smallScreenFormsHeight}
      />
      <Hidden mdUp>
        <Box width='100vw' height={smallScreenFormsHeight}>
          <Paper square className={classes.footerPaper}>
            <Grid
              container
              direction='row'
              className={classes.footerGrid}
            >
              <Grid
                item
                container
                spacing={2}
                className={classes.formsGrid}
                alignItems='center'
                justify='center'
                xs={12}
              >
                <Grid item xs={4}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <TripPlaceForm
                      locations={departureLocationsForTextFields}
                      place={departure}
                      setPlace={setDeparture}
                      toDispatch={getDepartureLocationsBySubstringAsync}
                      label="From"
                      placeholder="Start from..."
                      disableClearable={isSmallScreen}
                    />
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <SwitchLocationsButton
                      departure={departure}
                      setDeparture={setDeparture}
                      destination={destination}
                      setDestination={setDestination}
                      fontSize='large'
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <TripPlaceForm
                      locations={destinationLocationsForTextFields}
                      trips={basicTrips}
                      place={destination}
                      setPlace={setDestination}
                      toDispatch={getDestinationLocationsBySubstringAsync}
                      shouldHideOptions={departure === undefined}
                      label="To"
                      placeholder="Finish in..."
                      disableClearable={isSmallScreen}
                    />
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <SearchButton departure={departure} destination={destination} />
                  </Box>
                </Grid>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item container xs={12} justify='center'>
                <Box height='100%' width='100%'>
                  <TripsList
                    departure={departure}
                    destination={destination}
                    locations={allLocations}
                    basicTrips={basicTrips}
                    trips={trips}
                    isSmallScreen={isSmallScreen}
                    listClassName={classes.smallList}
                    listItemClassName={classes.smallListItem}
                    typographyProps={{
                      variant: 'subtitle1',
                      align: 'center',
                    }}
                    messageBoxProps={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Hidden>
    </Box>
  )
}

export default withWidth()(RouteMapPage);