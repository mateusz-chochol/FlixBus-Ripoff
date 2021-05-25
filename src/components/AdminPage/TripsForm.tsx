import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  InputAdornment,
  createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import UpdateIcon from '@material-ui/icons/Update';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import {
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
} from 'redux/LocationsSlice';
import {
  updateTripsDates,
  addTrip,
} from 'redux/TripsSlice';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useNotifications } from 'components/Misc/Notifications';
import moment from 'moment';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import Location from 'types/Objects/Location';

const pinkMaterialUiThemeForDatePickers = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e91e63'
    },
  },
});

const TripsForm: React.FC = () => {
  const dispatch = useDispatch();
  const { showError, showSuccess, showInfo } = useNotifications();
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().add(1, 'days').toDate());
  const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
  const [tripDuration, setTripDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [maxSeats, setMaxSeats] = useState<string>('');
  const [isDepartureDateWindowOpen, setIsDepartureDateWindowOpen] = useState<boolean>(false);
  const [isDepartureTimeWindowOpen, setIsDepartureTimeWindowOpen] = useState<boolean>(false);

  const handlePriceChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^[0-9]*$/)) {
      setPrice(event.target.value);
    }
  }

  const handleTripDurationChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^[0-9]{0,2}$/)) {
      setTripDuration(event.target.value);
    }
  }

  const handleMaxSeatsChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^[0-9]{0,2}$/)) {
      setMaxSeats(event.target.value);
    }
  }

  const handleAddTripButtonClick = () => {
    if (departure && destination && tripDuration !== '' && price !== '' && maxSeats !== '') {
      let errors = false;

      if (departure.id === destination.id) {
        errors = true;
        showError('Departure and destination cannot be the same.');
      }

      if (!tripDuration.match(/^[1-9]{1}[0-9]?$/)) {
        errors = true;
        showError('Trip duration must be between 1 and 99 hours.');
      }

      if (!price.match(/^[1-9]{1}[0-9]*$/)) {
        errors = true;
        showError('Price must be greater or equal to 1$.');
      }

      if (!maxSeats.match(/^[1-9]{1}[0-9]?$/)) {
        errors = true;
        showError('Max seats must be between 1 and 99.');
      }

      if (!errors) {
        dispatch(addTrip({
          startLocationId: departure.id,
          endLocationId: destination.id,
          tripDuration: parseInt(tripDuration),
          date: moment(departureDate).format('YYYY-MM-DD'),
          hour: moment(departureTime).format('hh:mm'),
          price: parseInt(price),
          maxSeats: parseInt(maxSeats)
        }));

        showSuccess(`Trip from ${departure.name} to ${destination.name} successfully added to the trips collection.`)
      }
    }
    else {
      showInfo('You need to fill all the forms before adding the trip.')
    }
  }

  const handleUpdateTripsButtonClick = () => {
    dispatch(updateTripsDates());

    showSuccess('Successfully updated all trips dates.')
  }

  return (
    <Box display='flex' width='100%' height='100%' flexDirection='column' justifyContent='flex-start'>
      <Box display='flex' justifyContent='center' width='100%' padding={3}>
        <Typography color='textSecondary' variant='h2' gutterBottom>
          Trips
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={3}>
        <Box paddingX={5} width='100%'>
          <TripPlaceForm
            locations={departureLocations}
            place={departure}
            setPlace={setDeparture}
            toDispatch={getDepartureLocationsBySubstringAsync}
            requestToCheck={'locations/getDepartureLocationsBySubstringAsync'}
            disableShrink
            label="Starting location"
            disableClearable
          />
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={3}>
        <Box paddingX={5} width='100%'>
          <TripPlaceForm
            locations={destinationLocations}
            place={destination}
            setPlace={setDestination}
            toDispatch={getDestinationLocationsBySubstringAsync}
            requestToCheck={'locations/getDestinationLocationsBySubstringAsync'}
            disableShrink
            label="End location"
            disableClearable
          />
        </Box>
      </Box>
      <Box paddingX={3} paddingTop={5}>
        <Typography color='textSecondary' variant='h5' gutterBottom align='center'>
          Departure date and hour
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={2}>
        <ThemeProvider theme={pinkMaterialUiThemeForDatePickers}>
          <Box paddingLeft={5} paddingRight={1} width='50%'>
            <DatePicker
              value={departureDate}
              onChange={(date: Date | null) => setDepartureDate(date)}
              color='secondary'
              inputVariant="outlined"
              fullWidth
              open={isDepartureDateWindowOpen}
              onOpen={() => setIsDepartureDateWindowOpen(true)}
              onClose={() => setIsDepartureDateWindowOpen(false)}
              inputProps={{
                "aria-label": 'departure date'
              }}
              disablePast
            />
          </Box>
          <Box paddingRight={5} paddingLeft={1} width='50%'>
            <TimePicker
              value={departureTime}
              onChange={(time: Date | null) => setDepartureTime(time)}
              color='secondary'
              inputVariant="outlined"
              ampm={false}
              minutesStep={5}
              open={isDepartureTimeWindowOpen}
              onOpen={() => setIsDepartureTimeWindowOpen(true)}
              onClose={() => setIsDepartureTimeWindowOpen(false)}
              fullWidth
              inputProps={{
                "aria-label": 'departure hour'
              }}
            />
          </Box>
        </ThemeProvider>
      </Box>
      <Box paddingX={3} paddingTop={5}>
        <Typography color='textSecondary' variant='h5' gutterBottom align='center'>
          Trip info
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={2}>
        <Box paddingLeft={5} paddingRight={1} width='33%'>
          <TextField
            label="Trip duration"
            variant="outlined"
            value={tripDuration}
            onChange={handleTripDurationChange}
            InputProps={{
              endAdornment: <InputAdornment position="start">h</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            color='secondary'
            fullWidth
          />
        </Box>
        <Box paddingRight={1} paddingLeft={1} width='33%'>
          <TextField
            label="Price"
            variant="outlined"
            value={price}
            onChange={handlePriceChange}
            color='secondary'
            InputProps={{
              endAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box paddingRight={5} paddingLeft={1} width='33%'>
          <TextField
            label="Max seats"
            variant="outlined"
            value={maxSeats}
            onChange={handleMaxSeatsChange}
            color='secondary'
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Box display='flex' paddingTop={8} paddingBottom={2} justifyContent='center' alignItems='flex-end' height='100%'>
        <Box paddingX={1}>
          <ButtonGroup variant="contained" disableElevation color='secondary'>
            <Button
              variant='contained'
              onClick={handleUpdateTripsButtonClick}
            >
              <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' paddingY={1}>
                Update trips
                <Box display='flex' paddingLeft={1} alignContent='center'>
                  <UpdateIcon />
                </Box>
              </Box>
            </Button>
            <Button
              variant='contained'
              onClick={handleAddTripButtonClick}
            >
              <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' paddingY={1}>
                Add trip
                <Box display='flex' paddingLeft={1} alignContent='center'>
                  <DirectionsBusIcon />
                </Box>
              </Box>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}

export default TripsForm;