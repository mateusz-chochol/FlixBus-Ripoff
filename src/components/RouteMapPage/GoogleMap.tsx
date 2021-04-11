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
import mapStyles from "./mapStyles";
import Location from 'types/Objects/Location';
import Coordinates from 'types/Objects/Coordinates';
import GoogleMapProps from 'types/Props/GoogleMapProps';

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
  basicTrips,
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
    if (location === departure || location === destination) {
      return `${process.env.PUBLIC_URL}/map_markers/default_marker.png`;
    }

    return `${process.env.PUBLIC_URL}/map_markers/orange_marker.png`;
  }

  const handleSelectMarker = (location: Location) => {
    mapRef.current.panTo(location.coordinates);

    if (location === departure) {
      setDeparture(undefined);
    }
    else if (location === destination) {
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
    const bounds = mapRef.current.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    const zoomLevel = mapRef.current.getZoom();

    dispatch(getLocationsByCoordinatesAsync({
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

  if (loadError) return <>Error</>;
  if (!isLoaded) return <>Loading...</>;

  return (
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
  )
}

export default GoogleMap;