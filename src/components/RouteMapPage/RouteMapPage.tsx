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
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Grid,
  Divider,
  IconButton,
  Paper,
  withWidth,
  WithWidth,
  ListSubheader
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getLocations } from 'redux/LocationsSlice';
import { getTrips } from 'redux/TripsSlice';
import { useNotifications } from 'components/Misc/Notifications';
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
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';
import Location from 'types/Location';
import Trip from 'types/Trip';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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
    grid: {
      margin: 0,
      width: '100%',
      padding: 4,
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
    }
  }),
);

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

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
  const locations = useSelector(getLocations);
  const trips = useSelector(getTrips);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showError } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripsToDisplay, setTripsToDisplay] = useState<Trip[]>(trips);
  const [isValidTripSelected, setIsValidTripSelected] = useState<boolean>(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });

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

  const handleSwitchClick = () => {
    if (trips.find(trip => trip.startLocationId === destination?.id && trip.endLocationId === departure?.id)) {
      const tempDeparture = departure;
      setDeparture(destination);
      setDestination(tempDeparture);
    }
    else {
      resetTextFieldsOnError();
    }
  }

  const getMarkerColor = (location: Location) => {
    if (location === departure || location === destination) {
      return `${process.env.PUBLIC_URL}/map_markers/default_marker.png`;
    }
    else if (tripsToDisplay.find(trip => trip.endLocationId === location.id || trip.startLocationId === location.id) || (!departure && !destination)) {
      return `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`;
    }

    return `${process.env.PUBLIC_URL}/map_markers/grey_marker.png`;
  }

  const resetTextFieldsOnError = useCallback(() => {
    setDeparture(undefined);
    setDestination(undefined);
    showError('Such trip doesn\'t exist. Please choose from existing trips.');
  }, [showError])

  useEffect(() => {
    let tempTrips = trips.filter(trip => trip.seatsLeft > 0);
    setIsValidTripSelected(false);

    if (departure === destination && departure) {
      resetTextFieldsOnError();
    }
    else if (departure && destination) {
      tempTrips = tempTrips.filter(trip => trip.startLocationId === departure.id && trip.endLocationId === destination.id)

      if (tempTrips.length > 0) {
        setIsValidTripSelected(true);
      }
      else {
        resetTextFieldsOnError();
      }
    }
    else if (departure) {
      tempTrips = tempTrips.filter(trip => trip.startLocationId === departure.id);
    }
    else if (destination) {
      tempTrips = tempTrips.filter(trip => trip.endLocationId === destination.id);
    }

    setTripsToDisplay(tempTrips);
  }, [departure, destination, trips, resetTextFieldsOnError]);

  if (loadError) return <>Error</>;
  if (!isLoaded) return <>Loading...</>;

  const departureForm = <>
    <TripPlaceForm
      locations={locations}
      place={departure}
      setPlace={setDeparture}
      label="From"
      placeholder="Where do you start?"
    />
  </>

  const destinationForm = <>
    <TripPlaceForm
      locations={locations}
      place={destination}
      setPlace={setDestination}
      label="To"
      placeholder="Where are you going?"
    />
  </>

  const switchButton = <>
    <IconButton onClick={handleSwitchClick}>
      <LoopIcon fontSize='large' />
    </IconButton>
  </>

  const searchButton = <>
    <IconButton color="secondary">
      <SearchIcon fontSize='large' />
    </IconButton>
  </>

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
                {departureForm}
              </Box>
            </Grid>
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                {destinationForm}
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
                  {switchButton}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display='flex' justifyContent='flex-start' alignItems='center'>
                  {searchButton}
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>
          <List subheader={<ListSubheader>Available trips</ListSubheader>} className={classes.list}>
            {tripsToDisplay.map(trip => (
              <ListItem button key={trip.id}>
                <Grid container className={classes.grid} direction='column'>
                  <Grid item container className={classes.grid} alignItems='flex-end' justify='space-around'>
                    <Grid item xs={5}>
                      <ListItemText primary={locations.find(location => location.id === trip.startLocationId)?.name} />
                    </Grid>
                    <Grid item xs={2}>
                      <ArrowRightAltIcon />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary={locations.find(location => location.id === trip.endLocationId)?.name} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ListItemText secondary={`Date: ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}`} />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
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
            clickable={tripsToDisplay.find(trip => trip.startLocationId === location.id || trip.endLocationId === location.id) !== undefined}
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
        <Box width='100vw'>
          <Paper square>
            <Grid
              container
              spacing={2}
              className={classes.grid}
            >
              <Grid item xs={4}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  {departureForm}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  {switchButton}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  {destinationForm}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  {searchButton}
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