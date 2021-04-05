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
  {
    id: 13,
    startLocationId: 4,
    endLocationId: 6,
    tripDuration: 7,
    date: new Date().toISOString().split('T')[0],
    price: 75,
    maxSeats: 20,
    seatsLeft: 14
  },
  {
    id: 14,
    startLocationId: 3,
    endLocationId: 2,
    tripDuration: 8,
    date: new Date().toISOString().split('T')[0],
    price: 30,
    maxSeats: 22,
    seatsLeft: 12
  },
  {
    id: 15,
    startLocationId: 1,
    endLocationId: 5,
    tripDuration: 3,
    date: new Date().toISOString().split('T')[0],
    price: 85,
    maxSeats: 18,
    seatsLeft: 14
  },
  {
    id: 16,
    startLocationId: 5,
    endLocationId: 7,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 100,
    maxSeats: 20,
    seatsLeft: 0
  },
  {
    id: 17,
    startLocationId: 6,
    endLocationId: 2,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 120,
    maxSeats: 26,
    seatsLeft: 13
  },
  {
    id: 18,
    startLocationId: 5,
    endLocationId: 1,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 90,
    maxSeats: 20,
    seatsLeft: 8
  },
  {
    id: 19,
    startLocationId: 2,
    endLocationId: 3,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 25,
    maxSeats: 20,
    seatsLeft: 1
  },
  {
    id: 20,
    startLocationId: 3,
    endLocationId: 6,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 70,
    maxSeats: 22,
    seatsLeft: 22
  },
  {
    id: 21,
    startLocationId: 5,
    endLocationId: 2,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 100,
    maxSeats: 18,
    seatsLeft: 16
  },
  {
    id: 22,
    startLocationId: 7,
    endLocationId: 5,
    tripDuration: 8,
    date: new Date().toISOString().split('T')[0],
    price: 110,
    maxSeats: 20,
    seatsLeft: 7
  },
  {
    id: 23,
    startLocationId: 4,
    endLocationId: 2,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 160,
    maxSeats: 25,
    seatsLeft: 12
  },
  {
    id: 24,
    startLocationId: 5,
    endLocationId: 4,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 60,
    maxSeats: 20,
    seatsLeft: 20
  },
  {
    id: 25,
    startLocationId: 1,
    endLocationId: 4,
    tripDuration: 1,
    date: new Date().toISOString().split('T')[0],
    price: 45,
    maxSeats: 24,
    seatsLeft: 16
  },
  {
    id: 26,
    startLocationId: 2,
    endLocationId: 7,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 40,
    maxSeats: 22,
    seatsLeft: 19
  },
  {
    id: 27,
    startLocationId: 7,
    endLocationId: 6,
    tripDuration: 3,
    date: new Date().toISOString().split('T')[0],
    price: 55,
    maxSeats: 18,
    seatsLeft: 4
  },
  {
    id: 28,
    startLocationId: 7,
    endLocationId: 1,
    tripDuration: 3,
    date: new Date().toISOString().split('T')[0],
    price: 120,
    maxSeats: 25,
    seatsLeft: 10
  },
  {
    id: 29,
    startLocationId: 2,
    endLocationId: 5,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 180,
    maxSeats: 26,
    seatsLeft: 0
  },
  {
    id: 30,
    startLocationId: 1,
    endLocationId: 4,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 80,
    maxSeats: 20,
    seatsLeft: 3
  },
  {
    id: 31,
    startLocationId: 4,
    endLocationId: 2,
    tripDuration: 4,
    date: new Date().toISOString().split('T')[0],
    price: 20,
    maxSeats: 20,
    seatsLeft: 15
  },
  {
    id: 32,
    startLocationId: 6,
    endLocationId: 1,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 90,
    maxSeats: 22,
    seatsLeft: 15
  },
  {
    id: 33,
    startLocationId: 3,
    endLocationId: 2,
    tripDuration: 1,
    date: new Date().toISOString().split('T')[0],
    price: 55,
    maxSeats: 18,
    seatsLeft: 2
  },
  {
    id: 34,
    startLocationId: 4,
    endLocationId: 5,
    tripDuration: 2,
    date: new Date().toISOString().split('T')[0],
    price: 30,
    maxSeats: 20,
    seatsLeft: 12
  },
  {
    id: 35,
    startLocationId: 6,
    endLocationId: 3,
    tripDuration: 5,
    date: new Date().toISOString().split('T')[0],
    price: 180,
    maxSeats: 26,
    seatsLeft: 14
  },
  {
    id: 36,
    startLocationId: 2,
    endLocationId: 1,
    tripDuration: 6,
    date: new Date().toISOString().split('T')[0],
    price: 80,
    maxSeats: 20,
    seatsLeft: 7
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