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
  Typography,
  TextField,
  Grid,
  Divider,
  IconButton
} from '@material-ui/core';
import {
  GoogleMap,
  useLoadScript,
  Marker,
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
    }
  }),
);

interface TempMarker {
  key: string,
  position: {
    lat: number,
    lng: number
  },
}

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

const tempMarkers = new Array<TempMarker>(
  {
    key: 'Kraków',
    position: {
      lat: 50.0682709,
      lng: 19.9601472
    }
  },
  {
    key: 'Berlin',
    position: {
      lat: 52.5065133,
      lng: 13.1445545
    }
  },
  {
    key: 'Białystok',
    position: {
      lat: 53.1275431,
      lng: 23.0159837
    }
  },
)

const RouteMapPage: React.FC = () => {
  const classes = useStyles();
  const mapRef = useRef<any>();
  const [departureText, setDepartureText] = useState<string>('');
  const [destinationText, setDestinationText] = useState<string>('');
  const [departure, setDeparture] = useState<TempMarker>();
  const [destination, setDestination] = useState<TempMarker>();
  const [textFieldFocused, setTextFieldFocused] = useState<string>('none');

  useEffect(() => {
    setDepartureText(departure ? departure.key : '');
  }, [departure]);

  useEffect(() => {
    setDestinationText(destination ? destination.key : '');
  }, [destination]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSelectMarker = (marker: TempMarker) => {
    mapRef.current.panTo(marker.position);

    if (marker === destination) {
      return setDestination(undefined);
    }
    if (marker === departure) {
      return setDeparture(undefined);
    }
    if (!departure && !destination) {
      return setDeparture(marker);
    }
    if (departure) {
      return setDestination(marker);
    }
    if (!departure && destination) {
      return setDeparture(marker);
    }
  }

  const handleSwitchClick = () => {
    const tempDeparture = departure;
    setDeparture(destination);
    setDestination(tempDeparture);
  }

  if (loadError) return <>Error</>;
  if (!isLoaded) return <>Loading...</>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
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
                <Autocomplete
                  id="departure-search-bar"
                  fullWidth
                  blurOnSelect
                  options={tempMarkers.map(marker => marker.key).filter(place => place !== destinationText)}
                  popupIcon={null}
                  inputValue={departureText}
                  open={departureText.length > 0 && textFieldFocused === 'departure'}
                  onFocus={() => setTextFieldFocused('departure')}
                  onInputChange={(event: React.ChangeEvent<{}>, value: string) => setDepartureText(value)}
                  onBlur={() => setTextFieldFocused('none')}
                  onChange={(event, value) => setDeparture(tempMarkers.find(marker => marker.key === value))}
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
              </Box>
            </Grid>
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Autocomplete
                  id="destination-search-bar"
                  fullWidth
                  blurOnSelect
                  options={tempMarkers.map(marker => marker.key).filter(place => place !== departureText)}
                  popupIcon={null}
                  inputValue={destinationText}
                  open={destinationText.length > 0 && textFieldFocused === 'destination'}
                  onFocus={() => setTextFieldFocused('destination')}
                  onInputChange={(event: React.ChangeEvent<{}>, value: string) => setDestinationText(value)}
                  onBlur={() => setTextFieldFocused('none')}
                  onChange={(event, value) => setDestination(tempMarkers.find(marker => marker.key === value))}
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
                  <IconButton onClick={handleSwitchClick}>
                    <LoopIcon fontSize='large' />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display='flex' justifyContent='flex-start' alignItems='center'>
                  <IconButton color="secondary">
                    <SearchIcon fontSize='large' />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>
          <List>
            <ListItem />
            <ListItem />
            <ListItem>
              <ListItemText>
                <Typography variant="h2">List of trips</Typography>
              </ListItemText>
            </ListItem>
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
        {tempMarkers.map((marker) => (
          <Marker
            key={marker.key}
            position={marker.position}
            onClick={() => handleSelectMarker(marker)}
          />
        ))}
      </GoogleMap>
    </Box>
  )
}

export default RouteMapPage;