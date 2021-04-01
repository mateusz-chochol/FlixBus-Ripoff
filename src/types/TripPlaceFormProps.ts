import Location from './Location'

export default interface TripPlaceFormProps {
  locations: Location[],
  place: Location | undefined,
  setPlace: React.Dispatch<React.SetStateAction<Location | undefined>>,
  label: string,
  placeholder: string,
}