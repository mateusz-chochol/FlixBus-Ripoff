import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { AppState } from './Store';
import BasicTrip from 'types/Objects/BasicTrip';

interface BasicTripsSliceState {
  trips: BasicTrip[],
}

const allTrips: BasicTrip[] = new Array<BasicTrip>(
  {
    id: 1,
    startLocationId: 1,
    endLocationId: 2,
  },
  {
    id: 2,
    startLocationId: 2,
    endLocationId: 3,
  },
  {
    id: 3,
    startLocationId: 5,
    endLocationId: 1,
  },
  {
    id: 4,
    startLocationId: 7,
    endLocationId: 3,
  },
  {
    id: 5,
    startLocationId: 2,
    endLocationId: 6,
  },
  {
    id: 6,
    startLocationId: 2,
    endLocationId: 1,
  },
  {
    id: 7,
    startLocationId: 3,
    endLocationId: 2,
  },
  {
    id: 8,
    startLocationId: 6,
    endLocationId: 3,
  },
  {
    id: 9,
    startLocationId: 5,
    endLocationId: 2,
  },
  {
    id: 10,
    startLocationId: 4,
    endLocationId: 3,
  },
  {
    id: 11,
    startLocationId: 6,
    endLocationId: 2,
  },
  {
    id: 12,
    startLocationId: 2,
    endLocationId: 4,
  },
  {
    id: 13,
    startLocationId: 4,
    endLocationId: 6,
  },
  {
    id: 14,
    startLocationId: 3,
    endLocationId: 2,
  },
  {
    id: 15,
    startLocationId: 1,
    endLocationId: 5,
  },
  {
    id: 16,
    startLocationId: 5,
    endLocationId: 7,
  },
  {
    id: 17,
    startLocationId: 6,
    endLocationId: 2,
  },
  {
    id: 18,
    startLocationId: 5,
    endLocationId: 1,
  },
  {
    id: 19,
    startLocationId: 2,
    endLocationId: 3,
  },
  {
    id: 20,
    startLocationId: 3,
    endLocationId: 6,
  },
  {
    id: 21,
    startLocationId: 5,
    endLocationId: 2,
  },
  {
    id: 22,
    startLocationId: 7,
    endLocationId: 5,
  },
  {
    id: 23,
    startLocationId: 4,
    endLocationId: 2,
  },
  {
    id: 24,
    startLocationId: 5,
    endLocationId: 4,
  },
  {
    id: 25,
    startLocationId: 1,
    endLocationId: 4,
  },
  {
    id: 26,
    startLocationId: 2,
    endLocationId: 7,
  },
  {
    id: 27,
    startLocationId: 7,
    endLocationId: 6,
  },
  {
    id: 28,
    startLocationId: 7,
    endLocationId: 1,
  },
  {
    id: 29,
    startLocationId: 2,
    endLocationId: 5,
  },
  {
    id: 30,
    startLocationId: 1,
    endLocationId: 4,
  },
  {
    id: 31,
    startLocationId: 4,
    endLocationId: 2,
  },
  {
    id: 32,
    startLocationId: 6,
    endLocationId: 1,
  },
  {
    id: 33,
    startLocationId: 3,
    endLocationId: 2,
  },
  {
    id: 34,
    startLocationId: 4,
    endLocationId: 5,
  },
  {
    id: 35,
    startLocationId: 6,
    endLocationId: 3,
  },
  {
    id: 36,
    startLocationId: 2,
    endLocationId: 1,
  },
);

const basicTripsInitialState: BasicTripsSliceState = {
  trips: [],
}

// fake calls to API
const getAllTrips = () => allTrips;
const getTripsFromDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
const getTripsFromDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);

const basicTripsSlice = createSlice({
  name: 'basicTrips',
  initialState: basicTripsInitialState,
  reducers: {
    getAllTrips: (state) => {
      state.trips = getAllTrips();
    },
    getTripsFromDepartureId: (state, { payload }: PayloadAction<number>) => {
      state.trips = getTripsFromDepartureId(payload);
    },
    getTripsFromDestinationId: (state, { payload }: PayloadAction<number>) => {
      state.trips = getTripsFromDestinationId(payload);
    },
  }
})

export const getBasicTrips = (state: AppState) => state.basicTrips;

export const {
  getAllTrips: getAllTripsActionCreator,
  getTripsFromDepartureId: getBasicTripsFromDepartureIdActionCreator,
  getTripsFromDestinationId: getBasicTripsFromDestinationIdActionCreator
} = basicTripsSlice.actions;

export default basicTripsSlice.reducer