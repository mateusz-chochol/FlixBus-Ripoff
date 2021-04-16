import React from 'react';
import { Box } from '@material-ui/core';
import DepartureDestinationFormSmallProps from 'types/Props/DepartureDestinationFormSmallProps';
import DepartureDestinationFormSmall from 'components/DepartureDestinationForm/DepartureDestinationFormSmall';

const SmallMainPage: React.FC<DepartureDestinationFormSmallProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  departureDate,
  returnDate,
  numberOfPassengers,
  tripType,
  handleTripTypeChange,
  handleDepartureDateChange,
  handleReturnDateChange,
  handlePassengersNumberChange,
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
    </Box>
  )
}

export default SmallMainPage;