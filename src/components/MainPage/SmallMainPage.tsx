import React from 'react';
import { Box } from '@material-ui/core';
import SmallMainPageProps from 'types/Props/SmallMainPageProps';
import DepartureDestinationFormSmall from 'components/DepartureDestinationForm/DepartureDestinationFormSmall';

const SmallMainPage: React.FC<SmallMainPageProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  tripType,
  setTripType,
  numberOfPassengers,
  setNumberOfPassengers,
  departureLocations,
  destinationLocations,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <DepartureDestinationFormSmall
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        numberOfPassengers={numberOfPassengers}
        setNumberOfPassengers={setNumberOfPassengers}
        tripType={tripType}
        setTripType={setTripType}
        departureLocations={departureLocations}
        destinationLocations={destinationLocations}
      />
    </Box>
  )
}

export default SmallMainPage;