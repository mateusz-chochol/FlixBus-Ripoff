import React, {
  useState,
  useEffect,
} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TripPlaceFormProps from 'types/Props/TripPlaceFormProps';
import TextField from '@material-ui/core/TextField';

const TripPlaceForm: React.FC<TripPlaceFormProps> = ({
  locations,
  trips,
  place,
  setPlace,
  label,
  placeholder,
  disableClearable,
}) => {
  const [placeTextValue, setPlaceTextValue] = useState<string>('');
  const [placeText, setPlaceText] = useState<string>(place?.name ?? '');
  const [options, setOptions] = useState<string[]>([]);
  const [noOptionsText, setNoOptionsText] = useState<string>('Type at least 1 character');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  useEffect(() => {
    setPlaceText(place?.name ?? '');
  }, [place])

  useEffect(() => {
    setPlace(locations.find(location => location.name.toUpperCase() === placeText?.toUpperCase()));
  }, [placeText, locations, setPlace])

  useEffect(() => {
    setIsLoading(true);
    setOptions([]);

    if (placeTextValue.length < 1) {
      setIsLoading(false);
      setNoOptionsText('Type at least 1 character...') // maybe change it to 2 in the future
    }
    else if (place && place.name.toUpperCase() === placeTextValue.toUpperCase()) {
      setIsLoading(false);
      setNoOptionsText(`You chose ${place.name}`)
    }
    else {
      setNoOptionsText('No results found');

      const delayCallForOptions = setTimeout(() => {
        let locationsToShow = locations.filter(location => location.name.toUpperCase().startsWith(placeTextValue.toUpperCase()));

        if (trips !== undefined) {
          const tripsEndLocationsIds = trips.map(trip => trip.endLocationId);
          locationsToShow = locationsToShow.filter(location => tripsEndLocationsIds.includes(location.id));
        }

        setOptions(locationsToShow.map(locations => locations.name));
        setIsLoading(false);
      }, 1000)

      return () => clearTimeout(delayCallForOptions)
    }
  }, [placeTextValue, placeText, place, locations])

  return (
    <Autocomplete
      value={placeText}
      onChange={(event: any, value) => setPlaceText(value ?? '')}
      inputValue={placeTextValue}
      onInputChange={(event, value) => setPlaceTextValue(capitalizeFirstLetter(value))}
      onBlur={() => setPlace(locations.find(location => location.name === placeTextValue))}
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