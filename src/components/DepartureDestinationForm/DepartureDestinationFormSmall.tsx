import React, { useRef } from 'react';
import {
  Box,
  Paper,
  Grid,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
} from 'redux/LocationsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import TripType from 'types/Objects/TripType';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import DepartureDestinationFormSmallProps from 'types/Props/DepartureDestinationForm/DepartureDestinationFormSmallProps';
import DateFields from './DateFields';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 0,
      width: '100%',
    },
  }),
);

const DepartureDestinationFormSmall: React.FC<DepartureDestinationFormSmallProps> = ({
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
  fullWidth,
}) => {
  const classes = useStyles();
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;

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

  return (
    <Box width={fullWidth ? '100%' : 2 / 5} minWidth={300}>
      <Paper elevation={fullWidth ? 0 : 4}>
        <Grid
          container
          direction='column'
          alignItems='center'
          className={classes.grid}
        >
          <Grid item container justify='center'>
            <Grid item>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                mt={1}
              >
                <FormControlLabel
                  value='one way'
                  control={<Radio
                    checked={tripType === TripType.OneWay}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTripTypeChange(TripType.OneWay)}
                  />}
                  name="one-way-radio"
                  label='One way'
                />
              </Box>
            </Grid>
            <Grid item>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                mt={1}
              >
                <FormControlLabel
                  value='round trip'
                  control={<Radio
                    checked={tripType === TripType.RoundTrip}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleTripTypeChange(TripType.RoundTrip) }}
                  />}
                  label='Round trip'
                  name="round-trip-radio"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems='center'
            justify='center'
            spacing={3}
            className={classes.grid}
          >
            <Grid
              item
              container
              alignItems='stretch'
              justify='center'
              spacing={3}
              md={tripType === TripType.OneWay ? 7 : 6}
              direction='column'
              className={classes.grid}
            >
              <Grid item xs={12} md={5}>
                <Box display='flex' justifyContent='flex-end' alignItems='center'>
                  <TripPlaceForm
                    locations={departureLocations}
                    place={departure}
                    setPlace={setDeparture}
                    toDispatch={getDepartureLocationsBySubstringAsync}
                    label="From"
                    placeholder="Start from..."
                    disableClearable={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box display='flex' justifyContent='flex-start' alignItems='center'>
                  <TripPlaceForm
                    locations={destinationLocations}
                    place={destination}
                    setPlace={setDestination}
                    toDispatch={getDestinationLocationsBySubstringAsync}
                    label="To"
                    placeholder="Finish in..."
                    disableClearable={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='center' alignItems='flex-end'>
                  <SwitchLocationsButton
                    departure={departure}
                    setDeparture={setDeparture}
                    destination={destination}
                    setDestination={setDestination}
                    allowEmptyDeparture
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems='stretch'
              justify='space-around'
              spacing={3}
              md={tripType === TripType.OneWay ? 5 : 6}
              direction='column'
              className={classes.grid}
            >
              <DateFields
                departureDate={departureDate}
                returnDate={returnDate}
                tripType={tripType}
                handleDepartureDateChange={handleDepartureDateChange}
                handleReturnDateChange={handleReturnDateChange}
              />
              <Box
                display='flex'
                alignItems='flex-end'
                justifyContent='center'
              >
                <SearchButton
                  departure={departure}
                  destination={destination}
                  departureDate={departureDate}
                  returnDate={tripType === TripType.RoundTrip ? returnDate : null}
                  shouldGetReturnTrips={tripType === TripType.RoundTrip}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DepartureDestinationFormSmall;