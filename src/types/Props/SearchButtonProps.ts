import Location from 'types/Objects/Location';

export default interface SearchButtonProps {
  departure?: Location,
  destination?: Location,
  departureDate?: Date | null,
  returnDate?: Date | null,
  shouldGetReturnTrips?: boolean,
}