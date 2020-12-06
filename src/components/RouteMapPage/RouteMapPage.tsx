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
  TextField,
  Grid,
  Divider,
  IconButton,
  Paper,
  withWidth,
  WithWidth,
  ListSubheader
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getLocations } from '../../redux/LocationsSlice';
import { getTrips } from '../../redux/TripsSlice';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';
import Location from '../../types/Location';
import Trip from '../../types/Trip';
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
        backgroundColor: 'rgba(0,0,0,.1)',
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
  const [departureText, setDepartureText] = useState<string>('');
  const [destinationText, setDestinationText] = useState<string>('');
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripsToDisplay, setTripsToDisplay] = useState<Trip[]>(trips);
  const [toggleDepartureRerenderAutocomplete, setToggleDepartureRerenderAutocomplete] = useState<number>(0);
  const [toggleDestinationRerenderAutocomplete, setToggleDestinationRerenderAutocomplete] = useState<number>(0);

  useEffect(() => {
    const tempTrips = trips.filter(trip => trip.seatsLeft > 0);

    if (departure && destination) {
      setTripsToDisplay(tempTrips.filter(trip => trip.startLocationId === departure.id && trip.endLocationId === destination.id));
    }
    else if (departure) {
      setTripsToDisplay(tempTrips.filter(trip => trip.startLocationId === departure.id));
    }
    else if (destination) {
      setTripsToDisplay(tempTrips.filter(trip => trip.endLocationId === destination.id));
    }
    else {
      setTripsToDisplay(tempTrips);
    }
  }, [departure, destination, trips]);

  useEffect(() => {
    setDepartureText(departure ? departure.name : '');
  }, [departure]);

  useEffect(() => {
    setDestinationText(destination ? destination.name : '');
  }, [destination]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSelectMarker = (location: Location) => {
    mapRef.current.panTo(location.coordinates);

    if (location === departure) {
      setToggleDepartureRerenderAutocomplete(number => number + 1);
      return setDeparture(undefined);
    }
    if (location === destination) {
      setToggleDestinationRerenderAutocomplete(number => number + 1);
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
    const tempDeparture = departure;
    setDeparture(destination);
    setDestination(tempDeparture);
  }

  if (loadError) return <>Error</>;
  if (!isLoaded) return <>Loading...</>;

  const departureForm = <>
    <Autocomplete
      id="departure-search-bar"
      key={toggleDepartureRerenderAutocomplete}
      fullWidth
      freeSolo
      popupIcon={null}
      options={locations.map(location => location.name)}
      getOptionDisabled={(option) => option === destinationText}
      getOptionSelected={(option, value) => { console.log(value); return option === value }}
      inputValue={departureText ?? ''}
      onInputChange={(event, value) => setDepartureText(value)}
      onChange={(event, value) => setDeparture(locations.find(location => location.name === value))}
      renderInput={(props) =>
        <TextField
          {...props}
          label="From"
          placeholder="Where do you start?"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      }
    />
  </>

  const destinationForm = <>
    <Autocomplete
      id="destination-search-bar"
      key={toggleDestinationRerenderAutocomplete}
      fullWidth
      freeSolo
      popupIcon={null}
      options={locations.map(location => location.name)}
      getOptionDisabled={(option) => option === departureText}
      inputValue={destinationText ?? ''}
      onInputChange={(event, value) => setDestinationText(value)}
      onChange={(event, value) => setDestination(locations.find(location => location.name === value))}
      renderInput={(props) =>
        <TextField
          {...props}
          label="To"
          placeholder="Where are you going?"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      }
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
                <Grid container className={classes.grid} alignItems='flex-end' justify='space-around'>
                  <Grid item xs={5}>
                    <ListItemText>{locations.find(location => location.id === trip.startLocationId)?.name}</ListItemText>
                  </Grid>
                  <Grid item xs={2}>
                    <ArrowRightAltIcon />
                  </Grid>
                  <Grid item xs={4}>
                    <ListItemText>{locations.find(location => location.id === trip.endLocationId)?.name}</ListItemText>
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
            icon={location === departure || location === destination ?
              `${process.env.PUBLIC_URL}/map_markers/default_marker.png` :
              `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`
            }
            onClick={() => handleSelectMarker(location)}
          />
        ))}
        {departure && destination && (
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