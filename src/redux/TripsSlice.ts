import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import Trip from 'types/Objects/Trip';
import { AppState } from './Store';

interface TripSliceState {
  lastDepartureId: number,
  lastDestinationId: number,
  list: Trip[]
}

const allTrips = [
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
]

const tripsInitialState: TripSliceState = {
  lastDepartureId: 0,
  lastDestinationId: 0,
  list: []
};

// fake API calls
const getAllTrips = () => allTrips;
const getTripsByDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
const getTripsByDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);
const getTripsByDepartureAndDestinationIds = (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {
    getAllTrips: (state) => {
      state.list = getAllTrips();
    },
    getTripsByDepartureId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        lastDepartureId: payload,
        lastDestinationId: 0,
        list: getTripsByDepartureId(payload)
      }
    },
    getTripsByDestinationId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        lastDepartureId: 0,
        lastDestinationId: payload,
        list: getTripsByDestinationId(payload)
      }
    },
    getTripsByDepartureAndDestinationIds: (state, { payload }: PayloadAction<{ departureId: number, destinationId: number }>) => {
      return {
        ...state,
        lastDepartureId: payload.departureId,
        lastDestinationId: payload.destinationId,
        list: getTripsByDepartureAndDestinationIds(payload.departureId, payload.destinationId)
      }
    },
    setLastDepartureId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        lastDepartureId: payload
      }
    },
    setLastDestinationId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        lastDestinationId: payload
      }
    },
  }
})

export const getTrips = (state: AppState) => state.trips.list;
export const getLastDepartureId = (state: AppState) => state.trips.lastDepartureId;
export const getLastDestinationId = (state: AppState) => state.trips.lastDestinationId;

export const {
  getAllTrips: getAllTripsActionCreator,
  getTripsByDepartureId: getTripsByDepartureIdActionCreator,
  getTripsByDestinationId: getTripsByDestinationIdActionCreator,
  getTripsByDepartureAndDestinationIds: getTripsByDepartureAndDestinationIdsActionCreator,
  setLastDepartureId: setLastDepartureIdActionCreator,
  setLastDestinationId: setLastDestinationIdActionCreator,
} = tripsSlice.actions;

export default tripsSlice.reducer