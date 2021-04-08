import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Trip from 'types/Objects/Trip';
import { AppState } from './RootReducer';
import * as api from 'api/TripsApi';

interface TripSliceState {
  lastDepartureId: number,
  lastDestinationId: number,
  list: Trip[]
}

const tripsInitialState: TripSliceState = {
  lastDepartureId: 0,
  lastDestinationId: 0,
  list: []
};

export const getTripsByDepartureIdAsync = createAsyncThunk<
  { list: Trip[], lastDepartureId: number },
  number
>(
  'trips/getTripsByDepartureIdAsync',
  async (id) => {
    return {
      lastDepartureId: id,
      list: api.getTripsByDepartureId(id)
    }
  }
);

export const getTripsByDestinationIdAsync = createAsyncThunk<
  { list: Trip[], lastDestinationId: number },
  number
>(
  'trips/getTripsByDestinationIdAsync',
  async (id) => {
    return {
      lastDestinationId: id,
      list: api.getTripsByDestinationId(id)
    }
  }
);

export const getTripsByDepartureAndDestinationIdsAsync = createAsyncThunk<
  { list: Trip[], lastDepartureId: number, lastDestinationId: number },
  { departureId: number, destinationId: number }
>(
  'trips/getTripsByDepartureAndDestinationIdsAsync',
  async ({ departureId, destinationId }) => {
    return {
      lastDepartureId: departureId,
      lastDestinationId: destinationId,
      list: api.getTripsByDepartureAndDestinationIds(departureId, destinationId)
    }
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {
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
  },
  extraReducers: builder => {
    builder
      .addCase(getTripsByDepartureIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          lastDepartureId: action.payload.lastDepartureId,
          lastDestinationId: 0,
          list: action.payload.list
        }
      })
      .addCase(getTripsByDestinationIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          lastDepartureId: 0,
          lastDestinationId: action.payload.lastDestinationId,
          list: action.payload.list
        }
      })
      .addCase(getTripsByDepartureAndDestinationIdsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          lastDepartureId: action.payload.lastDepartureId,
          lastDestinationId: action.payload.lastDestinationId,
          list: action.payload.list
        }
      })
  }
})

export const getTrips = (state: AppState) => state.trips.list;
export const getLastDepartureId = (state: AppState) => state.trips.lastDepartureId;
export const getLastDestinationId = (state: AppState) => state.trips.lastDestinationId;

export const {
  setLastDepartureId: setLastDepartureIdActionCreator,
  setLastDestinationId: setLastDestinationIdActionCreator,
} = tripsSlice.actions;

export default tripsSlice.reducer