import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import FullMainPageProps from 'types/Props/FullMainPageProps';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';

const FullMainPage: React.FC<FullMainPageProps> = ({
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
      height="80%"
      width="100%"
      flexDirection='column'
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
        contentAbove={
          <Typography variant='h2'>
            <Box ml={3} mb={1} fontWeight={500} letterSpacing={6} color="text.disabled">Low cost bus travel</Box>
          </Typography>
        }
      />
    </Box>
  )
}

export default FullMainPage;
