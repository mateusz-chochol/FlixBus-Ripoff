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
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;

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
    key: 'Krakow',
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

  useEffect(() => {
    setDepartureText(departure ? departure.key : '')
  }, [departure]);

  useEffect(() => {
    setDestinationText(destination ? destination.key : '')
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
    if (departure && !destination) {
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
                <TextField
                  id="departure-search-bar"
                  label="From"
                  placeholder="Where do you start?"
                  color="secondary"
                  value={departureText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDepartureText(event.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TextField
                  id="destination-search-bar"
                  label="To"
                  placeholder="Where are you going?"
                  color="secondary"
                  value={destinationText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDestinationText(event.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
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