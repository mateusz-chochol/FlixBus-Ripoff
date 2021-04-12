import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Hidden } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import moment from 'moment';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
} from 'redux/LocationsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import SmallMainPage from './SmallMainPage';
import FullMainPage from './FullMainPage';

const MainPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = React.useState<Date | null>(moment().toDate());
  const [returnDate, setReturnDate] = React.useState<Date | null>(moment().add(1, 'days').toDate());

  useEffect(() => {
    if (departure) {
      dispatch(getDepartureLocationsBySubstringAsync(departure.name))
    }
    if (destination) {
      dispatch(getDestinationLocationsBySubstringAsync(destination.name))
    }
  }, [departure, destination, dispatch])

  useEffect(() => {
    if (history.location.pathname !== routes.mainPage) {
      history.replace('/')
    }
  }, [history])

  const handleTripTypeChange = (tripType: TripType) => {
    setTripType(tripType);

    if (moment(departureDate).isAfter(returnDate)) {
      setReturnDate(moment(departureDate).add(1, 'days').toDate());
    }
  }

  const handleDepartureDateChange = (date: Date | null) => {
    if (moment(date).isBefore(moment(), 'day')) {
      showInfo('Departure date cannot be from the past');
    }
    else if (tripType === TripType.OneWay || moment(date).isSameOrBefore(returnDate, 'day')) {
      setDepartureDate(date);
    }
    else {
      setDepartureDate(date);
      setReturnDate(moment(departureDate).add(1, 'days').toDate());
    }
  }

  const handleReturnDateChange = (date: Date | null, setIsReturnDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => {
    if (moment(date).isSameOrAfter(departureDate, 'day')) {
      setReturnDate(date);
    }
    else {
      setIsReturnDateWindowOpen(false);
      showInfo('Return date cannot be before departure date');
    }
  }

  const handlePassengersNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const max = 10;

    if (event.target.value) {
      const numberOfPassengers = Number(event.target.value);

      if (numberOfPassengers > max) {
        setNumberOfPassengers(max);
      }
      else if (numberOfPassengers < 0) {
        setNumberOfPassengers(0);
      }
      else {
        setNumberOfPassengers(numberOfPassengers);
      }
    }
    else {
      setNumberOfPassengers(undefined);
    }
  }

  return (
    <>
      <Hidden smDown>
        <FullMainPage
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          returnDate={returnDate}
          numberOfPassengers={numberOfPassengers}
          tripType={tripType}
          handleTripTypeChange={handleTripTypeChange}
          handleDepartureDateChange={handleDepartureDateChange}
          handleReturnDateChange={handleReturnDateChange}
          handlePassengersNumberChange={handlePassengersNumberChange}
          departureLocations={departureLocations}
          destinationLocations={destinationLocations}
        />
      </Hidden>
      <Hidden mdUp>
        <SmallMainPage
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          returnDate={returnDate}
          numberOfPassengers={numberOfPassengers}
          tripType={tripType}
          handleTripTypeChange={handleTripTypeChange}
          handleDepartureDateChange={handleDepartureDateChange}
          handleReturnDateChange={handleReturnDateChange}
          handlePassengersNumberChange={handlePassengersNumberChange}
          departureLocations={departureLocations}
          destinationLocations={destinationLocations}
        />
      </Hidden>
    </>
  )
}

export default MainPage;
