import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Transaction from 'types/Objects/Transaction';
import TransactionTrip from 'types/Objects/TransactionTrip';
import { AppState } from './RootReducer';
import * as api from 'api/TransactionsApi';

interface TransactionsSliceState {
  transactions: Transaction[]
}

const transactionsInitialState: TransactionsSliceState = {
  transactions: [],
};

const filterExistingTransactions = (transactions: Transaction[], transactionsToAdd: Transaction[]) => {
  let transactionsToReturn = transactions;

  transactionsToReturn = transactionsToReturn.concat(transactionsToAdd.filter(transactionToAdd => !transactionsToReturn.map(transaction => transaction.id).includes(transactionToAdd.id)))

  return transactionsToReturn
}

export const getTransactionsByUserId = createAsyncThunk<Transaction[], string>(
  'transactions/getTransactionsByUserId',
  async (id) => {
    return await api.getTransactionsByUserId(id);
  },
  {
    condition: (id, { getState }) => {
      const { transactions } = getState() as AppState;

      return transactions.transactions.length === 0;
    }
  }
);

export const addTransaction = createAsyncThunk<
  Transaction | undefined,
  { date: string, price: number, tripIds: TransactionTrip[], userId: string, email: string }
>(
  'transactions/addTransaction',
  async ({ date, price, tripIds, userId, email }) => {
    // this code should run on Firebase's Cloud Functions after hypothetical transaction finishes
    // but since its unavaible in the Spark plan (the free one) and there are no actual transactions going
    // im doing it here
    // sorry :(

    return await api.addTransaction(date, price, tripIds, userId, email);
  }
)

export const removeTransaction = createAsyncThunk<string, string>(
  'transactions/removeTransaction',
  async (transactionId) => {
    return api.removeTransaction(transactionId);
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: transactionsInitialState,
  reducers: {
    clearTransactions: () => {
      return {
        transactions: []
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTransactionsByUserId.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return state;
        }

        return {
          transactions: filterExistingTransactions(state.transactions, action.payload),
        }
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return state;
        }

        return {
          transactions: [
            ...state.transactions,
            action.payload
          ],
        }
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return state;
        }

        return {
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
        }
      })
  }
})

export const getTransactions = (state: AppState) => state.transactions.transactions;

export const { clearTransactions: clearTransactionsActionCreator } = transactionsSlice.actions;

export default transactionsSlice.reducer