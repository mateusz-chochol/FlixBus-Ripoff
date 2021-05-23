import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Trip from 'types/Objects/Trip';
import { AppState } from './RootReducer';
import * as api from 'api/TripsApi';
import moment from 'moment';

interface TripSliceState {
  lastDepartureId: string,
  lastDestinationId: string,
  lastDepartureDate: string,
  list: Trip[],
  returnList: Trip[],
}

const tripsInitialState: TripSliceState = {
  lastDepartureId: "0",
  lastDestinationId: "0",
  lastDepartureDate: moment().format('YYYY-MM-DD'),
  list: [],
  returnList: [],
};

export const getTripsByDepartureIdAndDateAsync = createAsyncThunk<
  { list: Trip[], lastDepartureId: string, lastDepartureDate: string },
  { departureId: string, departureDate: Date }
>(
  'trips/getTripsByDepartureIdAndDateAsync',
  async ({ departureId, departureDate }) => {
    return {
      lastDepartureId: departureId,
      lastDepartureDate: moment(departureDate).format('YYYY-MM-DD'),
      list: await api.getTripsByDepartureIdAndDate(departureId, moment(departureDate).format('YYYY-MM-DD'))
    }
  },
  {
    condition: ({ departureId, departureDate }, { getState }) => {
      const { lastDepartureId, lastDepartureDate, lastDestinationId } = (getState() as AppState).trips

      return departureId !== lastDepartureId || moment(departureDate).format('YYYY-MM-DD') !== lastDepartureDate || lastDestinationId !== "0";
    }
  }
);

export const getTripsByDepartureAndDestinationIdsAndDateAsync = createAsyncThunk<
  { list: Trip[], lastDepartureId: string, lastDestinationId: string, lastDepartureDate: string },
  { departureId: string, destinationId: string, departureDate: Date, shouldZeroLastProperties?: boolean }
>(
  'trips/getTripsByDepartureAndDestinationIdsAndDateAsync',
  async ({ departureId, destinationId, departureDate, shouldZeroLastProperties }) => {
    if (shouldZeroLastProperties) {
      return {
        lastDepartureId: "0",
        lastDestinationId: "0",
        lastDepartureDate: moment().format('YYYY-MM-DD'),
        list: await api.getTripsByDepartureAndDestinationIdsAndDate(departureId, destinationId, moment(departureDate).format('YYYY-MM-DD'))
      }
    }

    return {
      lastDepartureId: departureId,
      lastDestinationId: destinationId,
      lastDepartureDate: moment(departureDate).format('YYYY-MM-DD'),
      list: await api.getTripsByDepartureAndDestinationIdsAndDate(departureId, destinationId, moment(departureDate).format('YYYY-MM-DD'))
    }
  },
  {
    condition: ({ departureId, destinationId, departureDate, shouldZeroLastProperties }, { getState }) => {
      const { lastDepartureId, lastDestinationId, lastDepartureDate } = (getState() as AppState).trips

      return shouldZeroLastProperties ||
        departureId !== lastDepartureId ||
        destinationId !== lastDestinationId ||
        moment(departureDate).format('YYYY-MM-DD') !== lastDepartureDate
    }
  }
);

export const getReturnTripsByReturnDateAsync = createAsyncThunk<
  Trip[],
  { departureId: string, destinationId: string, returnDate: Date }
>(
  'trips/getReturnTripsByReturnDateAsync',
  async ({ departureId, destinationId, returnDate }) => {
    return await api.getTripsByDepartureAndDestinationIdsAndDate(destinationId, departureId, moment(returnDate).format('YYYY-MM-DD'))
  }
);

export const getTripById = createAsyncThunk<Trip | undefined, string>(
  'trips/getTripById',
  async (id) => {
    return await api.getTripById(id);
  },
  {
    condition: (id, { getState }) => {
      const { trips } = getState() as AppState;

      return trips.list.find(trip => trip.id === id) === undefined;
    }
  }
);

export const updateTripsDates = createAsyncThunk(
  'trips/updateTripsDates',
  async () => {
    await api.updateTripsDates();
  }
)

const tripsSlice = createSlice({
  name: 'trips',
  initialState: tripsInitialState,
  reducers: {
    setLastDepartureId: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        lastDepartureId: payload
      }
    },
    setLastDestinationId: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        lastDestinationId: payload
      }
    },
    clearReturnTrips: (state) => {
      return {
        ...state,
        returnList: []
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTripsByDepartureIdAndDateAsync.fulfilled, (state, action) => {
        return {
          ...state,
          list: action.payload.list,
        }
      })
      .addCase(getTripsByDepartureIdAndDateAsync.pending, (state, action) => {
        return {
          ...state,
          list: [],
          lastDepartureId: action.meta.arg.departureId,
          lastDepartureDate: moment(action.meta.arg.departureDate).format('YYYY-MM-DD'),
          lastDestinationId: "0",
        }
      })
      .addCase(getTripsByDepartureAndDestinationIdsAndDateAsync.fulfilled, (state, action) => {
        return {
          ...state,
          list: action.payload.list
        }
      })
      .addCase(getTripsByDepartureAndDestinationIdsAndDateAsync.pending, (state, action) => {
        return {
          ...state,
          lastDepartureId: action.meta.arg.departureId,
          lastDestinationId: action.meta.arg.destinationId,
          lastDepartureDate: moment(action.meta.arg.departureDate).format('YYYY-MM-DD'),
        }
      })
      .addCase(getReturnTripsByReturnDateAsync.fulfilled, (state, action) => {
        return {
          ...state,
          returnList: action.payload
        }
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return state;
        }

        return {
          ...state,
          list: state.list.concat(action.payload)
        }
      })
  }
})

export const getTrips = (state: AppState) => state.trips.list;
export const getReturnTrips = (state: AppState) => state.trips.returnList;
export const getLastDepartureId = (state: AppState) => state.trips.lastDepartureId;
export const getLastDestinationId = (state: AppState) => state.trips.lastDestinationId;
export const getLastDepartureDate = (state: AppState) => moment(state.trips.lastDepartureDate).toDate();

export const {
  setLastDepartureId: setLastDepartureIdActionCreator,
  setLastDestinationId: setLastDestinationIdActionCreator,
  clearReturnTrips: clearReturnTripsActionCreator
} = tripsSlice.actions;

export default tripsSlice.reducer