import Location from 'types/Objects/Location'

export default interface TripPlaceFormProps {
  locations: Location[],
  place: Location | undefined,
  setPlace: React.Dispatch<React.SetStateAction<Location | undefined>>,
  label: string,
  placeholder: string,
  disableClearable?: boolean,
}