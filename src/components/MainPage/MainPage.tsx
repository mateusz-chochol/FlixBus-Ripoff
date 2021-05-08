import React, {
  useState,
  useEffect,
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
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import SmallMainPage from './SmallMainPage';
import FullMainPage from './FullMainPage';

const MainPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(TripType.OneWay);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().toDate());
  const [returnDate, setReturnDate] = useState<Date | null>(moment().add(1, 'days').toDate());

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

  return (
    <>
      <Hidden smDown>
        <FullMainPage
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          tripType={tripType}
          setTripType={setTripType}
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
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          tripType={tripType}
          setTripType={setTripType}
          departureLocations={departureLocations}
          destinationLocations={destinationLocations}
        />
      </Hidden>
    </>
  )
}

export default MainPage;
