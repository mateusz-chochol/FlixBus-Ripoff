import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@material-ui/core';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';
import ResultsPageProps from 'types/Props/ResultsPageProps';
import moment from 'moment';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  // getAllLocations,
  getLocationsByIdArrayAsync,
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
} from 'redux/LocationsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';

const ResultsPage: React.FC<ResultsPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  // const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo, showError } = notificationsFunctionsRef.current;
  const { departureIdAsString, destinationIdAsString } = match.params;
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = React.useState<Date | null>(moment().toDate());
  const [returnDate, setReturnDate] = React.useState<Date | null>(moment().add(1, 'days').toDate());

  useEffect(() => {
    if (isNaN(departureId)) {
      showError(`Departure id is not a number: ${departureIdAsString}`)
    }

    if (isNaN(destinationId)) {
      showError(`Destination id is not a number: ${destinationIdAsString}`)
    }

    if (!isNaN(departureId) && !isNaN(destinationId)) {
      dispatch(getLocationsByIdArrayAsync([departureId, destinationId]))
    }
  }, [departureId, destinationId, departureIdAsString, destinationIdAsString, dispatch, showError])

  useEffect(() => {
    if (departure) {
      dispatch(getDepartureLocationsBySubstringAsync(departure.name))
    }
    if (destination) {
      dispatch(getDestinationLocationsBySubstringAsync(destination.name))
    }
  }, [departure, destination, dispatch])

  const handleTripTypeChange = (tripType: TripType) => {
    setTripType(tripType);

    if (moment(departureDate).isAfter(returnDate)) {
      setReturnDate(moment(departureDate).add(1, 'days').toDate());
    }
  }

  const handleDepartureDateChange = (date: Date | null, setIsDepartureDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => {
    if (moment(date).isBefore(moment(), 'day')) {
      setIsDepartureDateWindowOpen(false);
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
    <Paper square>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="calc(100vh - 75px)"
        width="100vw"
        flexDirection="column"
        padding={5}
        paddingTop={2}
      >
        <DepartureDestinationFormFull
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
          fullWidth
        />
        <Typography variant='h1'>
          <Box>Results page (work in progress)</Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default ResultsPage;