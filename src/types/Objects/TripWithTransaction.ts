import Trip from './Trip';
import Transaction from './Transaction';

export default interface TripWithTransaction {
  trip?: Trip,
  transaction: Transaction,
}