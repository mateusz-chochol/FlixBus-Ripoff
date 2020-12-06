import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import Trip from '../types/Trip';
import { AppState } from './Store';

const tripsInitialState: Trip[] = new Array<Trip>();

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {

  }
})

export const getTrips = (state: AppState) => state.trips;

export default tripsSlice.reducer