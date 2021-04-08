import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Coordinates from 'types/Objects/Coordinates';
import Location from 'types/Objects/Location';
import { AppState } from './RootReducer';
import * as api from 'api/LocationsApi';

interface LocationsSliceState {
  allLocations: Location[],
  locationsForDepartureTextField: Location[],
  locationsForDestinationTextField: Location[],
  locationsForMap: Location[],
  lastUpperLeft?: Coordinates,
  lastBottomRight?: Coordinates,
}

const locationsInitialState: LocationsSliceState = {
  allLocations: [],
  locationsForDepartureTextField: [],
  locationsForDestinationTextField: [],
  locationsForMap: [],
}

export const getLocationsByIdArrayAsync = createAsyncThunk<Location[], number[]>(
  'locations/getLocationsByIdArrayAsync',
  async (ids) => {
    return api.getLocationsByIdArray(ids);
  }
);

export const getDepartureLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDepartureLocationsBySubstringAsync',
  async (substring) => {
    return api.getLocationsBySubstring(substring);
  }
);

export const getDestinationLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDestinationLocationsBySubstringAsync',
  async (substring) => {
    return api.getLocationsBySubstring(substring);
  }
);

export const getLocationsByCoordinatesAsync = createAsyncThunk<
  { locationsForMap: Location[], upperLeft: Coordinates, bottomRight: Coordinates },
  { upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number }
>(
  'locations/getLocationsByCoordinatesAsync',
  async ({ upperLeft, bottomRight, zoomLevel }) => {
    return {
      locationsForMap: api.getLocationsByCoordinates(upperLeft, bottomRight, zoomLevel),
      upperLeft: upperLeft,
      bottomRight: bottomRight
    };
  },
  {
    condition: ({ upperLeft, bottomRight }, { getState }) => {
      const { locations } = getState() as AppState;

      if (!locations.lastUpperLeft || !locations.lastBottomRight ||
        (upperLeft.lat !== locations.lastUpperLeft.lat ||
          upperLeft.lng !== locations.lastUpperLeft.lng ||
          bottomRight.lat !== locations.lastBottomRight.lat ||
          bottomRight.lng !== locations.lastBottomRight.lng)) {
        return true;
      }

      return false;
    }
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLocationsByCoordinatesAsync.fulfilled, (state, action) => {
        return {
          ...state,
          locationsForMap: action.payload.locationsForMap,
          lastUpperLeft: action.payload.upperLeft,
          lastBottomRight: action.payload.bottomRight,
          allLocations: [
            ...state.allLocations,
            ...action.payload.locationsForMap,
          ]
        }
      })
      .addCase(getDepartureLocationsBySubstringAsync.fulfilled, (state, action) => {
        return {
          ...state,
          locationsForDepartureTextField: action.payload,
          allLocations: [
            ...state.allLocations,
            ...action.payload,
          ]
        }
      })
      .addCase(getDestinationLocationsBySubstringAsync.fulfilled, (state, action) => {
        return {
          ...state,
          locationsForDestinationTextField: action.payload,
          allLocations: [
            ...state.allLocations,
            ...action.payload,
          ]
        }
      })
      .addCase(getLocationsByIdArrayAsync.fulfilled, (state, action) => {
        return {
          ...state,
          allLocations: [
            ...state.allLocations,
            ...action.payload,
          ]
        }
      })
  }
})

export const getAllLocations = (state: AppState) => state.locations.allLocations;
export const getLocationsForDepartureTextField = (state: AppState) => state.locations.locationsForDepartureTextField;
export const getLocationsForDestinationTextField = (state: AppState) => state.locations.locationsForDestinationTextField;
export const getLocationsForMap = (state: AppState) => state.locations.locationsForMap;

export default locationsSlice.reducer