import Trip from 'types/Objects/Trip';
import Location from 'types/Objects/Location';

export default interface ResultsTripsListProps {
  title: string,
  tripsToDisplay: Trip[],
  allLocations: Location[],
  departure?: Location,
  destination?: Location,
  departureDate: Date | null,
  departureDateAsString?: string,
  departureId: number,
  destinationId: number,
  handleAddToCartButtonClick: (trip: Trip) => void,
  isSmallScreen: boolean,
}