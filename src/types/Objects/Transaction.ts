import TransactionTrip from './TransactionTrip';

export default interface Transaction {
  id: string,
  price: number,
  date: string,
  tripIds: TransactionTrip[],
}