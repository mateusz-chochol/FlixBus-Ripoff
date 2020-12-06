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
  IconButton,
  Paper,
  withWidth,
  WithWidth,
} from '@material-ui/core';
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
    }
  }),
);

interface TempMarker {
  key: string,
  position: {
    lat: number,
    lng: number
  },
};

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
    },
  },
  {
    key: 'Berlin',
    position: {
      lat: 52.5065133,
      lng: 13.1445545
    },
  },
  {
    key: 'Białystok',
    position: {
      lat: 53.1275431,
      lng: 23.0159837
    },
  },
);

const RouteMapPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const mapRef = useRef<any>();
  const isSmallScreen = width === 'xs' || width === 'sm';
  const [departureText, setDepartureText] = useState<string>('');
  const [destinationText, setDestinationText] = useState<string>('');
  const [departure, setDeparture] = useState<TempMarker>();
  const [destination, setDestination] = useState<TempMarker>();

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

  const departureForm = <>
    <Autocomplete
      id="departure-search-bar"
      fullWidth
      blurOnSelect
      freeSolo
      popupIcon={null}
      options={tempMarkers.map(marker => marker.key)}
      getOptionDisabled={(option) => option === destinationText}
      inputValue={departureText ?? ''}
      onInputChange={(event, value) => setDepartureText(value)}
      onChange={(event, value) => setDeparture(tempMarkers.find(marker => marker.key === value))}
      onBlur={() => setDepartureText(departure?.key ?? '')}
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
      fullWidth
      blurOnSelect
      freeSolo
      popupIcon={null}
      options={tempMarkers.map(marker => marker.key)}
      getOptionDisabled={(option) => option === departureText}
      inputValue={destinationText ?? ''}
      onInputChange={(event, value) => setDestinationText(value)}
      onChange={(event, value) => setDestination(tempMarkers.find(marker => marker.key === value))}
      onBlur={() => setDestinationText(destination?.key ?? '')}
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
            icon={marker === departure || marker === destination ?
              `${process.env.PUBLIC_URL}/map_markers/default_marker.png` :
              `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`
            }
            onClick={() => handleSelectMarker(marker)}
          />
        ))}
        {departure && destination && (
          <Polyline
            path={[
              departure.position,
              destination.position
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