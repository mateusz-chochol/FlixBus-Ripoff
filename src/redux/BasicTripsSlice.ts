import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { AppState } from './RootReducer';
import BasicTrip from 'types/Objects/BasicTrip';
import basicTrips from 'tempDataSources/basicTrips.json';

interface BasicTripsSliceState {
  trips: BasicTrip[],
}

const allTrips: BasicTrip[] = basicTrips.basicTrips;

const basicTripsInitialState: BasicTripsSliceState = {
  trips: [],
}

// fake calls to API
const getTripsFromDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
const getTripsFromDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);

const basicTripsSlice = createSlice({
  name: 'basicTrips',
  initialState: basicTripsInitialState,
  reducers: {
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
  getTripsFromDepartureId: getBasicTripsFromDepartureIdActionCreator,
  getTripsFromDestinationId: getBasicTripsFromDestinationIdActionCreator
} = basicTripsSlice.actions;

export default basicTripsSlice.reducer