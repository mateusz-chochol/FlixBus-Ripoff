import React, {
  useRef,
  useCallback,
  useState
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
} from '@material-ui/core';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
  }
)

const RouteMapPage: React.FC = () => {
  const classes = useStyles();
  const mapRef = useRef<any>();
  const [departure, setDeparture] = useState<TempMarker>();
  const [destination, setDestination] = useState<TempMarker>();
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
          <List>
            <ListItem />
            <ListItem />
            <ListItem>
              <ListItemText>
                <Typography variant="h2">Menu place -holder</Typography>
              </ListItemText>
            </ListItem>
            {departure && (
              <ListItem>
                <ListItemText>
                  <Typography variant="h2">{departure.key}</Typography>
                </ListItemText>
              </ListItem>
            )}
            {destination && (
              <ListItem>
                <ListItemText>
                  <Typography variant="h2">{destination.key}</Typography>
                </ListItemText>
              </ListItem>
            )}
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
        onClick={() => { }}
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