import React, {
  useRef,
  useCallback,
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
  getBasicTripsFromDepartureIdActionCreator,
} from 'redux/BasicTripsSlice';
import { getLocations } from 'redux/LocationsSlice';
import {
  getTrips,
  getLastDepartureId,
  getLastDestinationId,
  getTripsByDepartureAndDestinationIdsActionCreator,
  setLastDepartureIdActionCreator,
  setLastDestinationIdActionCreator,
} from 'redux/TripsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import Location from 'types/Objects/Location';
import TripsList from './TripsList';

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
      margin: 0,
      width: '100%',
      height: '100%',
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
      padding: 0,
    },
    smallListItem: {
      minWidth: '220px',
      minHeight: '80px',
    }
  }),
);

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: "greedy",
};

const center = {
  lat: 50.0682709,
  lng: 19.9601472,
};

const RouteMapPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const mapRef = useRef<any>();
  const isSmallScreen = width === 'xs' || width === 'sm';
  const dispatch = useDispatch();
  const locations = useSelector(getLocations);
  const basicTrips = useSelector(getBasicTrips);
  const trips = useSelector(getTrips);
  const lastDepartureId = useSelector(getLastDepartureId);
  const lastDestinationId = useSelector(getLastDestinationId);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showError } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [isValidTripSelected, setIsValidTripSelected] = useState<boolean>(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });
  const mapContainerStyle = {
    height: isSmallScreen ? '70vh' : '92vh',
    width: "100vw",
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSelectMarker = (location: Location) => {
    mapRef.current.panTo(location.coordinates);

    if (location === departure) {
      return setDeparture(undefined);
    }
    if (location === destination) {
      return setDestination(undefined);
    }
    if (!departure && !destination) {
      return setDeparture(location);
    }
    if (departure) {
      return setDestination(location);
    }
    if (!departure && destination) {
      return setDeparture(location);
    }
  }

  const getMarkerColor = (location: Location) => {
    if (location === departure || location === destination) {
      return `${process.env.PUBLIC_URL}/map_markers/default_marker.png`;
    }

    return `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`;
  }

  const isMarkerVisible = (location: Location) => {
    if ((!departure && !destination) || (location === departure || location === destination)) {
      return true;
    }
    if (departure) {
      return basicTrips.find(trip => trip.startLocationId === departure.id && trip.endLocationId === location.id) !== undefined;
    }
    if (destination && !departure) {
      return basicTrips.find(trip => trip.startLocationId === location.id && trip.endLocationId === destination.id) !== undefined;
    }
  }

  useEffect(() => {
    setIsValidTripSelected(false);

    if (departure === destination && departure) {
      setDeparture(undefined);
      setDestination(undefined);
      showError('Departure and destination cannot be the same');
    }
    else if (destination && !departure) {
      dispatch(setLastDepartureIdActionCreator(0));
      dispatch(setLastDestinationIdActionCreator(0));

      setDeparture(undefined);
      setDestination(undefined);
    }
    else if (departure && destination) {
      if (lastDepartureId !== departure.id || lastDestinationId !== destination.id) {
        dispatch(getTripsByDepartureAndDestinationIdsActionCreator({ departureId: departure.id, destinationId: destination.id }));
      }

      dispatch(getBasicTripsFromDepartureIdActionCreator(departure.id));

      if (trips.find(trip => trip.startLocationId === departure.id && trip.endLocationId === destination.id) !== undefined) {
        setIsValidTripSelected(true);
      }
    }
    else if (departure) {
      dispatch(setLastDepartureIdActionCreator(departure.id));
      dispatch(setLastDestinationIdActionCreator(0));
      dispatch(getBasicTripsFromDepartureIdActionCreator(departure.id));
    }
  }, [departure, destination, showError, dispatch, trips, lastDepartureId, lastDestinationId]);

  if (loadError) return <>Error</>;
  if (!isLoaded) return <>Loading...</>;

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
                  locations={locations}
                  place={departure}
                  setPlace={setDeparture}
                  label="From"
                  placeholder="Start from..."
                  disableClearable={isSmallScreen}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={locations}
                  place={destination}
                  setPlace={setDestination}
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
            locations={locations}
            basicTrips={basicTrips}
            trips={trips}
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
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {locations.map((location) => (
          <Marker
            key={location.name}
            position={location.coordinates}
            icon={getMarkerColor(location)}
            onClick={() => handleSelectMarker(location)}
            visible={isMarkerVisible(location)}
          />
        ))}
        {departure && destination && isValidTripSelected && (
          <Polyline
            path={[
              departure.coordinates,
              destination.coordinates
            ]}
            options={{
              strokeColor: "#ff2527",
            }}
          />
        )}
      </GoogleMap>
      <Hidden mdUp>
        <Box width='100vw' height='22vh'>
          <Paper square className={classes.footerPaper}>
            <Grid
              container
              direction='column'
            >
              <Grid
                item
                container
                spacing={2}
                className={classes.footerGrid}
                alignItems='center'
                justify='center'
                xs={12}
              >
                <Grid item xs={4}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <TripPlaceForm
                      locations={locations}
                      place={departure}
                      setPlace={setDeparture}
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
                      locations={locations}
                      place={destination}
                      setPlace={setDestination}
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
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item container xs={12} justify='center'>
                <Box height='100%' width='100%'>
                  <TripsList
                    departure={departure}
                    destination={destination}
                    locations={locations}
                    basicTrips={basicTrips}
                    trips={trips}
                    listClassName={classes.smallList}
                    listItemClassName={classes.smallListItem}
                    typographyProps={{
                      variant: 'subtitle1',
                      align: 'center',
                      noWrap: true,
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