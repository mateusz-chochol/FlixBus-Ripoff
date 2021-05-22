import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { getLocationsByCoordinatesAsync } from 'redux/LocationsSlice';
import {
  GoogleMap as Map,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import {
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import mapStyles from "./mapStyles";
import Location from 'types/Objects/Location';
import Coordinates from 'types/Objects/Coordinates';
import GoogleMapProps from 'types/Props/RouteMapPage/GoogleMapProps';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: "greedy",
};

const GoogleMap: React.FC<GoogleMapProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  locationsForMap,
  trips,
  isValidTripSelected,
  isSmallScreen,
  navBarHeight,
  footerMenuHeight
}) => {
  const dispatch = useDispatch();
  const mapRef = useRef<any>();
  const [center, setCenter] = useState<Coordinates>({
    lat: 50.0682709,
    lng: 19.9601472,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });
  const mapContainerStyle: CSS.Properties = {
    height: isSmallScreen ? `calc(100vh - ${navBarHeight} - ${footerMenuHeight})` : `calc(100vh - ${navBarHeight})`,
    width: '100%',
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const getUserPosition = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setMap, positionGetterOnError);
    }
  }, [])

  const positionGetterOnError = () => { };

  const setMap = (position: GeolocationPosition) => {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  const getMarkerColor = (location: Location) => {
    if (location.id === departure?.id || location.id === destination?.id) {
      return `${process.env.PUBLIC_URL}/map_markers/default_marker.png`;
    }

    return `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`;
  }

  const handleSelectMarker = (location: Location) => {
    if (location.id === departure?.id) {
      setDeparture(undefined);
    }
    else if (location.id === destination?.id) {
      setDestination(undefined);
    }
    else if (departure) {
      setDestination(location);
    }
    else {
      setDeparture(location);
    }
  }

  const getLocationsToShow = () => {
    const center = mapRef.current.getCenter();
    const bounds = mapRef.current.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    const zoomLevel = mapRef.current.getZoom();

    dispatch(getLocationsByCoordinatesAsync({
      center: {
        lng: center.lng(),
        lat: center.lat()
      },
      upperLeft: {
        lng: northEast.lng(),
        lat: northEast.lat()
      },
      bottomRight: {
        lng: southWest.lng(),
        lat: southWest.lat()
      },
      zoomLevel,
    }))
  }

  const isMarkerVisible = (location: Location) => {
    if ((!departure && !destination) || (location.id === departure?.id || location.id === destination?.id)) {
      return true;
    }
    if (departure) {
      return trips.find(trip => trip.startLocationId === departure.id && trip.endLocationId === location.id) !== undefined;
    }
  }

  const getAdditionalLocationsToShow = () => {
    let array: Location[] = [];

    if (departure && !locationsForMap.find(location => location.id === departure.id)) {
      array.push(departure);
    }

    if (destination && !locationsForMap.find(location => location.id === destination.id)) {
      array.push(destination);
    }

    return array;
  }

  useEffect(() => {
    getUserPosition();
  }, [getUserPosition])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center);
    }
  }, [center])

  if (loadError) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        width={mapContainerStyle.width}
        height={mapContainerStyle.height}
        bgcolor="warning.main"
      >
        <Typography variant='h2' align='center'>
          <Box fontWeight={500} letterSpacing={6} color="text.disabled"> Error loading map</Box>
        </Typography>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        alignItems='center'
        width={mapContainerStyle.width}
        height={mapContainerStyle.height}
        bgcolor="grey.300"
      >
        <Typography variant='h2' align='center'>
          <Box fontWeight={500} letterSpacing={6} color="text.disabled">Loading map</Box>
        </Typography>
        <CircularProgress size={125} thickness={2} />
      </Box>
    );
  }

  return (
    <Box
      display='flex'
      width={mapContainerStyle.width}
      height={mapContainerStyle.height}
      bgcolor="grey.300"
    >
      <Map
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onIdle={getLocationsToShow}
        mapContainerClassName='map'
      >
        {locationsForMap.concat(getAdditionalLocationsToShow()).map((location) => (
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
      </Map>
    </Box>
  )
}

export default GoogleMap;