import Location from 'types/Objects/Location';
import BasicTrip from 'types/Objects/BasicTrip';

export default interface TripPlaceFormProps {
  locations: Location[],
  trips?: BasicTrip[],
  place: Location | undefined,
  setPlace: React.Dispatch<React.SetStateAction<Location | undefined>>,
  toDispatch: (value: string) => void,
  shouldHideOptions?: boolean,
  label: string,
  placeholder: string,
  disableClearable?: boolean,
}