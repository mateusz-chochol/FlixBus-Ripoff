import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withWidth,
  WithWidth,
  Typography,
} from '@material-ui/core';
import {
  useDispatch,
  useSelector
} from 'react-redux';
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
import {
  getCart,
  addToCartActionCreator
} from 'redux/CartSlice';
import { getRequestsState } from 'redux/RequestsStateSlice';
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
  const requestsState = useSelector(getRequestsState);
  const allLocations = useSelector(getAllLocations);
  const locationsForMap = useSelector(getLocationsForMap);
  const trips = useSelector(getTrips);
  const cart = useSelector(getCart);
  const lastDepartureId = useSelector(getLastDepartureId);
  const lastDestinationId = useSelector(getLastDestinationId);
  const lastDepartureDate = useSelector(getLastDepartureDate);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo, showSuccess } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [isValidTripSelected, setIsValidTripSelected] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().toDate());
  const [tripsDestinations, setTripsDestinations] = useState<Trip[]>([]);
  const [tripDialogOpen, setTripDialogOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldDisplayLoadingScreen, setShouldDisplayLoadingScreen] = useState<boolean>(false);
  const navBarHeight = '75px';
  const footerMenuHeight = '200px';

  const handleTripsSummariesListItemClick = (endLocationId: string) => {
    setDestination(allLocations.find(location => location.id === endLocationId));
  }

  const handleFullTripsListItemClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setTripDialogOpen(true);
  }

  const handleAddTripToCartClick = () => {
    if (selectedTrip) {
      dispatch(addToCartActionCreator({ trip: selectedTrip, passengersCount: 1 }));
      showSuccess(`Trip has been added to your cart (id: ${selectedTrip.id}).`);
    }

    setTripDialogOpen(false);
  }

  const areDatesTheSame = (first: Date, second: Date) => {
    if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDay() === second.getDay()) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    const requestsToCheck = [
      requestsState['trips/getTripsByDepartureAndDestinationIdsAndDateAsync'],
      requestsState['trips/getTripsByDepartureIdAndDateAsync'],
    ];

    if (requestsToCheck.some(request => request === 'pending')) {
      setIsLoading(true);
      setShouldDisplayLoadingScreen(true);
    }
    else {
      const turnOfLoadingTimeout = setTimeout(() => {
        setIsLoading(false);
        setShouldDisplayLoadingScreen(false);
      }, 500);

      return () => clearTimeout(turnOfLoadingTimeout);
    }
  }, [requestsState])

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

  useEffect(() => {
    if (isSmallScreen) {
      setTripDialogOpen(false);
    }
  }, [isSmallScreen])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      flexDirection={isSmallScreen ? 'column' : 'row'}
    >
      <Dialog
        open={tripDialogOpen}
        onClose={() => setTripDialogOpen(false)}
      >
        <DialogTitle>Add trip to cart</DialogTitle>
        <DialogContent>
          {selectedTrip !== undefined ?
            <>
              <Typography color='textSecondary'>Do you want to add to cart trip from {allLocations.find(location => location.id === selectedTrip.startLocationId)?.name} to {allLocations.find(location => location.id === selectedTrip.endLocationId)?.name} for 1 passenger?</Typography>
              <Typography color='textSecondary'>Departure: <b>{selectedTrip.hour} | {selectedTrip.date}</b>, price: <b>{selectedTrip.price}$</b>, trip duration: {selectedTrip.tripDuration}h, seats left: {selectedTrip.seatsLeft}</Typography>
              <Box paddingTop={3}>
                <Typography color='textSecondary'>For an option of adding more passengers or filtering the results please press the search button.</Typography>
              </Box>
            </> :
            <Typography>Error, please reload the page</Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTripDialogOpen(false)} color="primary" autoFocus>
            Close
          </Button>
          <Button onClick={handleAddTripToCartClick} color="primary">
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
      <Hidden smDown>
        <RouteMapDrawer
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          tripsDestinations={tripsDestinations}
          trips={trips.filter(trip => !cart.map(({ trip }) => trip.id).includes(trip.id))}
          allLocations={allLocations}
          handleTripsSummariesListItemClick={handleTripsSummariesListItemClick}
          handleFullTripsListItemClick={handleFullTripsListItemClick}
          isLoading={isLoading}
          shouldDisplayLoadingScreen={shouldDisplayLoadingScreen}
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