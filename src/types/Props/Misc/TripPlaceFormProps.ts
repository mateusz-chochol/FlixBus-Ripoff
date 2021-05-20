import Location from 'types/Objects/Location';
import Trip from 'types/Objects/Trip';

export default interface TripPlaceFormProps {
  locations: Location[],
  trips?: Trip[],
  place: Location | undefined,
  setPlace: React.Dispatch<React.SetStateAction<Location | undefined>>,
  toDispatch: (value: string) => void,
  requestToCheck: string,
  shouldHideOptions?: boolean,
  label: string,
  placeholder: string,
  disableClearable?: boolean,
}