import Location from 'types/Objects/Location';
import TripWithTransaction from 'types/Objects/TripWithTransaction';

export default interface TripsListProps {
  list: TripWithTransaction[],
  locations: Location[],
  title: string,
  emptyListMessage: string,
}