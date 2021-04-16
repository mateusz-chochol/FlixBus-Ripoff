import React from 'react';
import {
  Box,
  Paper,
  TextField,
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
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import TripType from 'types/Objects/TripType';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import DepartureDestinationFormSmallProps from 'types/Props/DepartureDestinationFormSmallProps';
import DateFields from './DateFields';

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
  returnDate,
  numberOfPassengers,
  tripType,
  handleTripTypeChange,
  handleDepartureDateChange,
  handleReturnDateChange,
  handlePassengersNumberChange,
  departureLocations,
  destinationLocations,
  fullWidth,
}) => {
  const classes = useStyles()

  return (
    <Box width={fullWidth ? '100%' : 2 / 5} minWidth={300}>
      <Paper elevation={4}>
        <Grid
          container
          direction='column'
          alignItems='center'
          className={classes.grid}
        >
          <Grid item container justify='center'>
            <Grid item md={1} />
            <Grid item md={2}>
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
            <Grid item md={2}>
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
            <Grid item xs={7} />
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
              <Grid item xs={12} md={tripType === TripType.OneWay ? 3 : 2}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <TextField
                    id="passengers-number"
                    label="Passengers"
                    type="number"
                    value={numberOfPassengers}
                    onChange={handlePassengersNumberChange}
                    color='secondary'
                    inputProps={{ dir: "rtl" }}
                    InputLabelProps={{ shrink: true, }}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Box
                display='flex'
                alignItems='flex-end'
                justifyContent='center'
              >
                <SearchButton departure={departure} destination={destination} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DepartureDestinationFormSmall;