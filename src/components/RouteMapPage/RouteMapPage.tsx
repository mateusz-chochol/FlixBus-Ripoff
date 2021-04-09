import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Hidden,
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
import Location from 'types/Objects/Location';
import GoogleMap from './GoogleMap';
import RouteMapDrawer from './RouteMapDrawer';
import FooterMenu from './FooterMenu';

const RouteMapPage: React.FC<WithWidth> = ({ width }) => {
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
        <RouteMapDrawer
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          basicTrips={basicTrips}
          trips={trips}
          allLocations={allLocations}
          departureLocationsForTextFields={departureLocationsForTextFields}
          destinationLocationsForTextFields={destinationLocationsForTextFields}
          isSmallScreen={isSmallScreen}
        />
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
        <FooterMenu
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          basicTrips={basicTrips}
          trips={trips}
          allLocations={allLocations}
          departureLocationsForTextFields={departureLocationsForTextFields}
          destinationLocationsForTextFields={departureLocationsForTextFields}
          smallScreenFormsHeight={smallScreenFormsHeight}
          isSmallScreen={isSmallScreen}
        />
      </Hidden>
    </Box>
  )
}

export default withWidth()(RouteMapPage);