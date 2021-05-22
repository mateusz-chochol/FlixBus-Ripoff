import React, {
  useState,
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { getRequestsState } from 'redux/RequestsStateSlice';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TripPlaceFormProps from 'types/Props/Misc/TripPlaceFormProps';
import TextField from '@material-ui/core/TextField';
import Location from 'types/Objects/Location';

const TripPlaceForm: React.FC<TripPlaceFormProps> = ({
  locations,
  trips,
  place,
  setPlace,
  toDispatch,
  requestToCheck,
  label,
  placeholder,
  shouldHideOptions,
  disableClearable,
}) => {
  const dispatch = useDispatch();
  const requestsState = useSelector(getRequestsState);
  const [placeTextValue, setPlaceTextValue] = useState<string>('');
  const [placeText, setPlaceText] = useState<Location | null>(place ?? null);
  const [options, setOptions] = useState<Location[]>([]);
  const [noOptionsText, setNoOptionsText] = useState<string>('Type at least 1 character...');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnFocus = () => {
    if (placeTextValue.length < 1) {
      setOptions([]);
    }
  };

  const handleOnBlur = () => {
    const location = options.find(option => option.name === placeTextValue);

    if (location) {
      setPlace(location);
    }
    else {
      setPlace(undefined);
    }
  };

  const handleOnChange = (value: Location | null) => {
    setPlace(locations.find(location => location.id === value?.id));
  }

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (requestsState[requestToCheck] === 'pending') {
      setIsLoading(true);
    }
    else {
      setIsLoading(false);
    }
  }, [requestsState, requestToCheck])

  useEffect(() => {
    let locationsToShow = locations.filter(location => location.name.toUpperCase().startsWith(placeTextValue.toUpperCase()));

    if (trips !== undefined) {
      const tripsEndLocationsIds = trips.map(trip => trip.endLocationId);
      locationsToShow = locations.filter(location => tripsEndLocationsIds.includes(location.id));
    }

    setOptions(locationsToShow);
  }, [locations, placeTextValue, trips])

  useEffect(() => {
    if (!shouldHideOptions) {
      setIsLoading(true);
      setOptions([]);

      if (placeTextValue.length < 1) {
        setIsLoading(false);
        setNoOptionsText('Type at least 1 character...');
      }
      else {
        const delay = (place && place.name === placeTextValue) ? 0 : 1000;

        const delayCallForOptions = setTimeout(() => {
          dispatch(toDispatch(placeTextValue));
          setNoOptionsText('No results found');
        }, delay);

        return () => clearTimeout(delayCallForOptions)
      }
    }
    else {
      setNoOptionsText('No results found');
    }
  }, [placeTextValue, place, dispatch, toDispatch, shouldHideOptions])

  useEffect(() => {
    setPlaceText(place ?? null);
    setPlaceTextValue(place?.name ?? '');
  }, [place])

  return (
    <Autocomplete
      value={placeText}
      getOptionLabel={option => option.name}
      getOptionSelected={(option, value) => option.id === value.id}
      onChange={(event: any, value) => handleOnChange(value)}
      inputValue={placeTextValue}
      onInputChange={(event, value) => setPlaceTextValue(capitalizeFirstLetter(value))}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      fullWidth
      popupIcon={null}
      options={options}
      noOptionsText={noOptionsText}
      loading={isLoading}
      disableClearable={disableClearable ?? false}
      renderInput={(props) =>
        <TextField
          {...props}
          label={label}
          placeholder={placeholder}
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      }
    />
  )
}

export default TripPlaceForm;