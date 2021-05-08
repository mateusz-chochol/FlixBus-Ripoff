import Location from 'types/Objects/Location';
import Trip from 'types/Objects/Trip';

export default interface RouteMapDrawerProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  departureDate: Date | null,
  setDepartureDate: (value: React.SetStateAction<Date | null>) => void,
  tripsDestinations: Trip[],
  trips: Trip[],
  allLocations: Location[],
  handleTripsSummariesListItemClick: (endLocationId: number) => void,
  handleFullTripsListItemClick: (trip: Trip) => void,
}