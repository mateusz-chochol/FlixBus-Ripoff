import React, {
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TripPlaceFormProps from 'types/Props/TripPlaceFormProps';
import TextField from '@material-ui/core/TextField';

const TripPlaceForm: React.FC<TripPlaceFormProps> = ({
  locations,
  trips,
  place,
  setPlace,
  toDispatch,
  label,
  placeholder,
  shouldHideOptions,
  disableClearable,
}) => {
  const dispatch = useDispatch();
  const [placeTextValue, setPlaceTextValue] = useState<string>('');
  const [placeText, setPlaceText] = useState<string | null>(place?.name ?? null);
  const [options, setOptions] = useState<string[]>([]);
  const [noOptionsText, setNoOptionsText] = useState<string>('Type at least 1 character');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnFocus = () => {
    if (placeTextValue.length < 1) {
      setOptions([]);
    }
  };

  const handleOnBlur = () => {
    if (options.find(option => option === placeTextValue)) {
      setPlace(locations.find(location => location.name === placeTextValue));
    }
    else {
      setPlace(undefined);
    }
  };

  const handleOnChange = (value: string | null) => {
    setPlace(locations.find(location => location.name.toUpperCase() === value?.toUpperCase()));
  }

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  useEffect(() => {
    setPlaceText(place?.name ?? null);
    setPlaceTextValue(place?.name ?? '')
  }, [place])

  useEffect(() => {
    let locationsToShow = locations.filter(location => location.name.toUpperCase().startsWith(placeTextValue.toUpperCase()));

    if (trips !== undefined) {
      const tripsEndLocationsIds = trips.map(trip => trip.endLocationId);
      locationsToShow = locations.filter(location => tripsEndLocationsIds.includes(location.id));
    }

    setOptions(locationsToShow.map(locations => locations.name));
  }, [locations, placeTextValue, trips])

  useEffect(() => {
    if (!shouldHideOptions) {
      setIsLoading(true);
      setOptions([]);

      if (placeTextValue.length < 1) {
        setIsLoading(false);
        setNoOptionsText('Type at least 1 character...') // maybe change it to 2 in the future
      }
      else {
        const delayCallForOptions = setTimeout(() => {
          dispatch(toDispatch(placeTextValue));
          setIsLoading(false);
          setNoOptionsText('No results found');
        }, 1000)

        return () => clearTimeout(delayCallForOptions)
      }
    }
    else {
      setOptions([]);
      setNoOptionsText('No results found');
    }
  }, [placeTextValue, place, dispatch, toDispatch, shouldHideOptions])

  return (
    <Autocomplete
      value={placeText}
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