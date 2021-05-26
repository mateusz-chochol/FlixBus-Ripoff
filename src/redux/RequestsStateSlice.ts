import {
  PayloadAction,
  createSlice,
  AsyncThunk,
} from '@reduxjs/toolkit'
import { AppState } from './RootReducer';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']> & { error: Error }

const requestsStateInitialSlice: Record<string, string> = {};

const requestsSlice = createSlice({
  name: 'requestsState',
  initialState: requestsStateInitialSlice,
  reducers: {
    removeRejected: (state) => {
      state['rejected'] = '';
    },
    removeFulfilled: (state, { payload }: PayloadAction<string>) => {
      state[payload] = '';
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state[action.type.split("/pending")[0]] = 'pending'
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state[action.type.split("/fulfilled")[0]] = 'fulfilled'
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.error.name === 'CustomError') {
            state['rejected'] = action.error.message;
          }
          else {
            state['rejected'] = 'Server error. Please comeback later.';
          }
        }
      )
  }
})

export const getRequestsState = (state: AppState) => state.requestsState;

export const {
  removeRejected: removeRejectedActionCreator,
  removeFulfilled: removeFulfilledActionCreator,
} = requestsSlice.actions;

export default requestsSlice.reducer