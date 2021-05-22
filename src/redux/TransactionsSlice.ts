import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Transaction from 'types/Objects/Transaction';
import { AppState } from './RootReducer';
import * as api from 'api/TransactionsApi';

interface TransactionsSliceState {
  transactions: Transaction[]
}

const transactionsInitialState: TransactionsSliceState = {
  transactions: [],
};

export const getTransactionsByUserId = createAsyncThunk<Transaction[], string>(
  'transactions/getTransactionsByUserId',
  async (id) => {
    return await api.getTransactionsByUserId(id);
  }
);

export const addTransaction = createAsyncThunk<void, Transaction>(
  'transactions/addTransaction',
  async (transaction) => {
    // this code should run on Firebase's Cloud Functions after hypothetical transaction finishes
    // but since its unavaible in the Spark plan (the free one) and there are no actual transactions going
    // im doing it here
    // sorry :(

    await api.addTransaction(transaction);
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
          ...state,
          transactions: action.payload,
        }
      })
      .addCase(addTransaction.pending, (state, action) => {
        return {
          transactions: [
            ...state.transactions,
            action.meta.arg
          ],
        }
      })
      .addCase(addTransaction.rejected, (state, action) => {
        return {
          transactions: state.transactions.filter(transaction => transaction.id !== action.meta.arg.id),
        }
      })
  }
})

export const getTransactions = (state: AppState) => state.transactions.transactions;

export const { clearTransactions: clearTransactionsActionCreator } = transactionsSlice.actions;

export default transactionsSlice.reducer