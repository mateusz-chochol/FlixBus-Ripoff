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
const getBasicTripsFromDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
const getBasicTripsFromDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);

const basicTripsSlice = createSlice({
  name: 'basicTrips',
  initialState: basicTripsInitialState,
  reducers: {
    getBasicTripsFromDepartureId: (state, { payload }: PayloadAction<number>) => {
      state.trips = getBasicTripsFromDepartureId(payload);
    },
    getBasicTripsFromDestinationId: (state, { payload }: PayloadAction<number>) => {
      state.trips = getBasicTripsFromDestinationId(payload);
    },
  }
})

export const getBasicTrips = (state: AppState) => state.basicTrips;

export const {
  getBasicTripsFromDepartureId: getBasicTripsFromDepartureIdActionCreator,
  getBasicTripsFromDestinationId: getBasicTripsFromDestinationIdActionCreator
} = basicTripsSlice.actions;

export default basicTripsSlice.reducer