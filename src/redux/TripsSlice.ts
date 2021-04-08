import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import Trip from 'types/Objects/Trip';
import { AppState } from './RootReducer';
import trips from 'tempDataSources/trips.json';

interface TripSliceState {
  lastDepartureId: number,
  lastDestinationId: number,
  list: Trip[]
}

const allTrips = trips.trips;

const tripsInitialState: TripSliceState = {
  lastDepartureId: 0,
  lastDestinationId: 0,
  list: []
};

// fake API calls
const getTripsByDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
const getTripsByDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);
const getTripsByDepartureAndDestinationIds = (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {
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
  getTripsByDepartureId: getTripsByDepartureIdActionCreator,
  getTripsByDestinationId: getTripsByDestinationIdActionCreator,
  getTripsByDepartureAndDestinationIds: getTripsByDepartureAndDestinationIdsActionCreator,
  setLastDepartureId: setLastDepartureIdActionCreator,
  setLastDestinationId: setLastDestinationIdActionCreator,
} = tripsSlice.actions;

export default tripsSlice.reducer