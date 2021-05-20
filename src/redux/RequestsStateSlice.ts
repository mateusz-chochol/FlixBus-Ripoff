import {
  createSlice,
  AsyncThunk,
} from '@reduxjs/toolkit'
import { AppState } from './RootReducer';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const requestsStateInitialSlice: Record<string, string> = {};

const requestsSlice = createSlice({
  name: 'requestsState',
  initialState: requestsStateInitialSlice,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action): action is PendingAction => action.type.endsWith('/pending'),
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
  }
})

export const getRequestsState = (state: AppState) => state.requestsState;

export default requestsSlice.reducer