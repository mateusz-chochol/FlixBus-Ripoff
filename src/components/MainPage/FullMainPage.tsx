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
  setDepartureDate,
  returnDate,
  setReturnDate,
  tripType,
  setTripType,
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
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        tripType={tripType}
        setTripType={setTripType}
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
