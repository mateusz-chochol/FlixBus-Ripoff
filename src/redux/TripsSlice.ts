import { createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Objects/Trip';
import { AppState } from './Store';

const tripsInitialState: Trip[] = new Array<Trip>(
  {
    id: 1,
    startLocationId: 1,
    endLocationId: 2,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 60,
    maxSeats: 20,
    seatsLeft: 16
  },
  {
    id: 2,
    startLocationId: 2,
    endLocationId: 3,
    tripDuration: 6,
    date: new Date().toISOString().split('T')[0],
    price: 80,
    maxSeats: 22,
    seatsLeft: 18
  },
  {
    id: 3,
    startLocationId: 5,
    endLocationId: 1,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 50,
    maxSeats: 18,
    seatsLeft: 2
  },
  {
    id: 4,
    startLocationId: 7,
    endLocationId: 3,
    tripDuration: 1,
    date: new Date().toISOString().split('T')[0],
    price: 100,
    maxSeats: 20,
    seatsLeft: 10
  },
  {
    id: 5,
    startLocationId: 2,
    endLocationId: 6,
    tripDuration: 5,
    date: new Date().toISOString().split('T')[0],
    price: 160,
    maxSeats: 26,
    seatsLeft: 0
  },
  {
    id: 6,
    startLocationId: 2,
    endLocationId: 1,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 60,
    maxSeats: 20,
    seatsLeft: 20
  },
  {
    id: 7,
    startLocationId: 3,
    endLocationId: 2,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 60,
    maxSeats: 20,
    seatsLeft: 16
  },
  {
    id: 8,
    startLocationId: 6,
    endLocationId: 3,
    tripDuration: 6,
    date: new Date().toISOString().split('T')[0],
    price: 80,
    maxSeats: 22,
    seatsLeft: 18
  },
  {
    id: 9,
    startLocationId: 5,
    endLocationId: 2,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 50,
    maxSeats: 18,
    seatsLeft: 2
  },
  {
    id: 10,
    startLocationId: 4,
    endLocationId: 3,
    tripDuration: 1,
    date: new Date().toISOString().split('T')[0],
    price: 100,
    maxSeats: 20,
    seatsLeft: 10
  },
  {
    id: 11,
    startLocationId: 6,
    endLocationId: 2,
    tripDuration: 5,
    date: new Date().toISOString().split('T')[0],
    price: 160,
    maxSeats: 26,
    seatsLeft: 12
  },
  {
    id: 12,
    startLocationId: 2,
    endLocationId: 4,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
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