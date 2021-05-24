import Trip from 'types/Objects/Trip';
import Transaction from 'types/Objects/Transaction';
import Location from 'types/Objects/Location';
import TripWithTransaction from 'types/Objects/TripWithTransaction';

export default interface TripsListProps {
  trips: Trip[],
  transactions: Transaction[],
  locations: Location[],
  getTripIdsWithTransactions: () => TripWithTransaction[],
  title: string,
  emptyListMessage: string,
}