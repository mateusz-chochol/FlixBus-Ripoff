import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { AppState } from './RootReducer';
import BasicTrip from 'types/Objects/BasicTrip';
import * as api from 'api/BasicTripsApi';

interface BasicTripsSliceState {
  trips: BasicTrip[],
}

const basicTripsInitialState: BasicTripsSliceState = {
  trips: [],
}

export const getBasicTripsFromDepartureIdAsync = createAsyncThunk<BasicTrip[], number>(
  'basicTrips/getBasicTripsFromDepartureIdAsync',
  async (id) => {
    return await api.getBasicTripsFromDepartureId(id);
  }
)

const basicTripsSlice = createSlice({
  name: 'basicTrips',
  initialState: basicTripsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBasicTripsFromDepartureIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          trips: action.payload
        }
      })
  }
})

export const getBasicTrips = (state: AppState) => state.basicTrips;

export default basicTripsSlice.reducer