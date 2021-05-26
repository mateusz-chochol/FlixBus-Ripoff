import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { addLocation } from 'redux/LocationsSlice';
import {
  getRequestsState,
  removeFulfilledActionCreator,
} from 'redux/RequestsStateSlice';
import { useNotifications } from 'components/Misc/Notifications';

const LocationsForm: React.FC = () => {
  const dispatch = useDispatch();
  const { showError, showSuccess, showInfo } = useNotifications();
  const requestsState = useSelector(getRequestsState);
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [geohash, setGeohash] = useState<string>('');
  const [importance, setImportance] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]{0,20}$/)) {
      setName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase());
    }
  }

  const handleChangeLatitude = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^-?[0-9]{0,2}\.?[0-9]{0,8}$/)) {
      setLatitude(event.target.value);
    }
  }

  const handleChangeLongitude = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^-?[0-9]{0,2}\.?[0-9]{0,8}$/)) {
      setLongitude(event.target.value);
    }
  }

  const handleChangeGeohash = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/^[0123456789bcdefghjkmnpqrstuvwxyz]{0,6}$/)) {
      setGeohash(event.target.value);
    }
  }

  const handleChangeImportance = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.match(/(^1[0-4]{1}$)|(^[1-9]?$)/)) {
      setImportance(event.target.value);
    }
  }

  const handleAddLocationButtonClick = () => {
    if (name !== '' && latitude !== '' && longitude !== '' && geohash !== '' && importance !== '') {
      let errors = false;

      if (!name.match(/^[A-ZĄĆĘŁŃÓŚŹŻ]{1}[a-ząćęłńóśźż]{0,19}$/)) {
        errors = true;
        showError('Location name can contain only letters and cannot be greater than 20 characters.');
      }

      const coordinatesPattern = /^-?[1-9]?[0-9]{1}(\.[0-9]{1,8})?$/;

      if (!latitude.match(coordinatesPattern) || !longitude.match(coordinatesPattern)) {
        errors = true;
        showError('Coordinates can contain only numbers.');
      }

      if (!geohash.match(/^[0123456789bcdefghjkmnpqrstuvwxyz]{6}$/)) {
        errors = true;
        showError('Geohash can only use letters from its alphabet and must be 6 characters long.')
      }

      if (!importance.match(/^[1-9]{1}[0-4]?$/)) {
        errors = true;
        showError('Importance must be a number between 1 and 14.');
      }

      if (!errors) {
        dispatch(addLocation({
          name: name,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          geohash: geohash,
          importance: parseInt(importance),
        }))

        setButtonDisabled(true);
      }
    }
    else {
      showInfo('You need to fill all the forms before adding the location.')
    }
  }

  useEffect(() => {
    if (requestsState['locations/addLocation'] === 'fulfilled') {
      showSuccess('Location successfully added.')
      setButtonDisabled(false);

      setName('');
      setLatitude('');
      setLongitude('');
      setGeohash('');
      setImportance('');

      dispatch(removeFulfilledActionCreator('locations/addLocation'));
    }

    if (requestsState['locations/addLocation'] === 'rejected') {
      setButtonDisabled(false);
    }
  }, [requestsState, dispatch, showSuccess])

  return (
    <Box display='flex' width='100%' height='100%' flexDirection='column' justifyContent='space-between'>
      <Box display='flex' justifyContent='center' width='100%' padding={3}>
        <Typography color='textSecondary' variant='h2' gutterBottom>
          Locations
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={3}>
        <Box paddingX={5} width='100%'>
          <TextField
            label="Location name"
            variant="outlined"
            value={name}
            onChange={handleChangeName}
            fullWidth
          />
        </Box>
      </Box>
      <Box paddingX={3} paddingTop={5}>
        <Typography color='textSecondary' variant='h5' gutterBottom align='center'>
          Coordinates
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={2}>
        <Box paddingLeft={5} paddingRight={1} width='50%'>
          <TextField
            label="Latitude"
            variant="outlined"
            value={latitude}
            onChange={handleChangeLatitude}
            fullWidth
          />
        </Box>
        <Box paddingRight={5} paddingLeft={1} width='50%'>
          <TextField
            label="Longitude"
            variant="outlined"
            value={longitude}
            onChange={handleChangeLongitude}
            fullWidth
          />
        </Box>
      </Box>
      <Box paddingX={3} paddingTop={5}>
        <Typography color='textSecondary' variant='h5' gutterBottom align='center'>
          Location info
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' width='100%' paddingTop={2}>
        <Box paddingLeft={5} paddingRight={1} width='50%'>
          <TextField
            label="Geohash"
            variant="outlined"
            value={geohash}
            onChange={handleChangeGeohash}
            fullWidth
          />
        </Box>
        <Box paddingRight={5} paddingLeft={1} width='50%'>
          <TextField
            label="Importance"
            variant="outlined"
            value={importance}
            onChange={handleChangeImportance}
            fullWidth
          />
        </Box>
      </Box>
      <Box display='flex' paddingY={8} justifyContent='center' alignItems='flex-end' height='100%'>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleAddLocationButtonClick}
          disabled={buttonDisabled}
        >
          <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' padding={1}>
            Add location
            <Box display='flex' paddingLeft={1} alignContent='center'>
              <AddLocationIcon />
            </Box>
          </Box>
        </Button>
      </Box>
    </Box>
  )
}

export default LocationsForm;