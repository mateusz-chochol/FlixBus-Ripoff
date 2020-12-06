import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import Trip from '../types/Trip';
import { AppState } from './Store';

const tripsInitialState: Trip[] = new Array<Trip>(
  {
    id: 1,
    startLocationId: 1,
    endLocationId: 2,
    startTime: new Date(),
    tripDuration: 4,
    price: 60,
    maxSeats: 20,
    seatsLeft: 16
  },
  {
    id: 2,
    startLocationId: 2,
    endLocationId: 3,
    startTime: new Date(),
    tripDuration: 6,
    price: 80,
    maxSeats: 22,
    seatsLeft: 18
  },
  {
    id: 3,
    startLocationId: 5,
    endLocationId: 1,
    startTime: new Date(),
    tripDuration: 2,
    price: 50,
    maxSeats: 18,
    seatsLeft: 2
  },
  {
    id: 4,
    startLocationId: 7,
    endLocationId: 3,
    startTime: new Date(),
    tripDuration: 1,
    price: 100,
    maxSeats: 20,
    seatsLeft: 10
  },
  {
    id: 5,
    startLocationId: 2,
    endLocationId: 6,
    startTime: new Date(),
    tripDuration: 5,
    price: 160,
    maxSeats: 26,
    seatsLeft: 0
  },
  {
    id: 6,
    startLocationId: 2,
    endLocationId: 1,
    startTime: new Date(),
    tripDuration: 4,
    price: 60,
    maxSeats: 20,
    seatsLeft: 20
  },
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {

  }
})

export const getTrips = (state: AppState) => state.trips;

export default tripsSlice.reducer