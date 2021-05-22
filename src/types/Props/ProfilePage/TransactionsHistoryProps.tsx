import Transaction from 'types/Objects/Transaction';

export default interface TransactionsHistoryProps {
  transactions: Transaction[],
  isLoading: boolean,
}