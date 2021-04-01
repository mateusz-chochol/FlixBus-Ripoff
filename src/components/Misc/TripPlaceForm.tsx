import React, {
  useState,
  useEffect,
} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TripPlaceFormProps from 'types/TripPlaceFormProps';
import TextField from '@material-ui/core/TextField';

const TripPlaceForm: React.FC<TripPlaceFormProps> = ({
  locations,
  place,
  setPlace,
  label,
  placeholder
}) => {
  const [placeTextValue, setPlaceTextValue] = useState<string>('');
  const [placeText, setPlaceText] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [noOptionsText, setNoOptionsText] = useState<string>('Type at least 1 character');

  useEffect(() => {
    setPlaceText(place?.name ?? '');
  }, [place])

  useEffect(() => {
    setPlace(locations.find(location => location.name === placeText));
  }, [placeText, locations, setPlace])

  useEffect(() => {
    if (placeTextValue.length < 1) {
      setOptions(placeText ? [placeText] : []);
      setNoOptionsText('Type at least 1 character...') // maybe change it to 2 in the future
    }
    else if (place && place.name === placeTextValue) {
      setOptions([]);
      setNoOptionsText(`You chose ${place.name}`)
    }
    else {
      setOptions(locations.map(location => location.name));
      setNoOptionsText('No results found')
    }
  }, [placeTextValue, placeText, place, locations])

  return (
    <Autocomplete
      value={placeText}
      onChange={(event: any, value) => setPlaceText(value ?? '')}
      inputValue={placeTextValue}
      onInputChange={(event, value) => setPlaceTextValue(value)}
      onBlur={() => setPlace(locations.find(location => location.name === placeTextValue))}
      fullWidth
      popupIcon={null}
      options={options}
      noOptionsText={noOptionsText}
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