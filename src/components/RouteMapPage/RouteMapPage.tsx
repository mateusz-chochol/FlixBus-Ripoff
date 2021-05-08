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
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import {
  getAllLocations,
  getLocationsForMap,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import {
  getTrips,
  getLastDepartureId,
  getLastDestinationId,
  getLastDepartureDate,
  getTripsByDepartureIdAndDateAsync,
  getTripsByDepartureAndDestinationIdsAndDateAsync,
} from 'redux/TripsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import Location from 'types/Objects/Location';
import GoogleMap from './GoogleMap';
import RouteMapDrawer from './RouteMapDrawer';
import FooterMenu from './FooterMenu';
import Trip from 'types/Objects/Trip';
import moment from 'moment';

const RouteMapPage: React.FC<WithWidth> = ({ width }) => {
  const isSmallScreen = width === 'xs' || width === 'sm';
  const dispatch = useDispatch();
  const history = useHistory();
  const allLocations = useSelector(getAllLocations);
  const locationsForMap = useSelector(getLocationsForMap);
  const trips = useSelector(getTrips);
  const lastDepartureId = useSelector(getLastDepartureId);
  const lastDestinationId = useSelector(getLastDestinationId);
  const lastDepartureDate = useSelector(getLastDepartureDate);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [isValidTripSelected, setIsValidTripSelected] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().toDate());
  const [tripsDestinations, setTripsDestinations] = useState<Trip[]>([]);
  const navBarHeight = '75px';
  const footerMenuHeight = '200px';

  const handleTripsSummariesListItemClick = (endLocationId: number) => {
    setDestination(allLocations.find(location => location.id === endLocationId));
  }

  const handleFullTripsListItemClick = (trip: Trip) => {
    history.push(routes.tripPage.replace(':tripId', trip.id.toString()));
  }

  const areDatesTheSame = (first: Date, second: Date) => {
    if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDay() === second.getDay()) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    setIsValidTripSelected(false);

    if (departure && destination && departureDate) {
      if (lastDepartureId !== departure.id || lastDestinationId !== destination.id || !areDatesTheSame(departureDate, lastDepartureDate)) {
        dispatch(getTripsByDepartureAndDestinationIdsAndDateAsync({ departureId: departure.id, destinationId: destination.id, departureDate: departureDate }));
      }

      if (trips.find(trip => trip.startLocationId === departure.id && trip.endLocationId === destination.id) !== undefined) {
        setIsValidTripSelected(true);
      }
    }
    else if (destination && !departure) {
      setDestination(undefined);
    }
    else if (departure && departureDate) {
      if (lastDepartureId !== departure.id || !areDatesTheSame(departureDate, lastDepartureDate) || lastDestinationId) {
        dispatch(getTripsByDepartureIdAndDateAsync({ departureId: departure.id, departureDate: departureDate }));
      }
    }
  }, [departure, destination, departureDate, showInfo, dispatch, trips, lastDepartureId, lastDestinationId, lastDepartureDate]);

  useEffect(() => {
    const ids = trips.map(trip => trip.endLocationId);

    if (ids.length > 0) {
      dispatch(getLocationsByIdArrayAsync(ids));
    }
  }, [trips, dispatch]);

  useEffect(() => {
    if (departure && !destination) {
      setTripsDestinations(trips.filter(trip => trip.startLocationId === departure.id));
    }
  }, [departure, destination, trips])

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
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          tripsDestinations={tripsDestinations}
          trips={trips}
          allLocations={allLocations}
          handleTripsSummariesListItemClick={handleTripsSummariesListItemClick}
          handleFullTripsListItemClick={handleFullTripsListItemClick}
        />
      </Hidden>
      <GoogleMap
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        locationsForMap={locationsForMap}
        trips={tripsDestinations}
        isValidTripSelected={isValidTripSelected}
        isSmallScreen={isSmallScreen}
        navBarHeight={navBarHeight}
        footerMenuHeight={footerMenuHeight}
      />
      <Hidden mdUp>
        <FooterMenu
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          allLocations={allLocations}
          trips={tripsDestinations}
          footerMenuHeight={footerMenuHeight}
        />
      </Hidden>
    </Box>
  )
}

export default withWidth()(RouteMapPage);