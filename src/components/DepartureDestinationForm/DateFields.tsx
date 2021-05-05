import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import TripType from 'types/Objects/TripType';
import MainPageDateFieldsProps from 'types/Props/MainPageDateFieldsProps';

const DateFields: React.FC<MainPageDateFieldsProps> = ({
  departureDate,
  returnDate,
  tripType,
  handleDepartureDateChange,
  handleReturnDateChange,
}) => {
  const [isDepartureDateWindowOpen, setIsDepartureDateWindowOpen] = useState<boolean>(false);
  const [isReturnDateWindowOpen, setIsReturnDateWindowOpen] = useState<boolean>(false);

  return (
    <>
      <Grid item xs={12} md={tripType === TripType.OneWay ? 6 : 4}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <DatePicker
            label="Departure"
            value={departureDate}
            onChange={(date: Date | null) => handleDepartureDateChange(date, setIsDepartureDateWindowOpen)}
            color='secondary'
            inputVariant="outlined"
            open={isDepartureDateWindowOpen}
            onOpen={() => setIsDepartureDateWindowOpen(true)}
            onClose={() => setIsDepartureDateWindowOpen(false)}
            fullWidth
            inputProps={{
              "aria-label": 'departure date'
            }}
          />
        </Box>
      </Grid>
      {tripType === TripType.RoundTrip &&
        <Grid item xs={12} md={4}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <DatePicker
              label="Return"
              value={returnDate}
              onChange={(date: Date | null) => handleReturnDateChange(date, setIsReturnDateWindowOpen)}
              color='secondary'
              inputVariant="outlined"
              open={isReturnDateWindowOpen}
              onOpen={() => setIsReturnDateWindowOpen(true)}
              onClose={() => setIsReturnDateWindowOpen(false)}
              fullWidth
              inputProps={{
                "aria-label": 'return date'
              }}
            />
          </Box>
        </Grid>
      }
    </>
  )
}

export default DateFields;