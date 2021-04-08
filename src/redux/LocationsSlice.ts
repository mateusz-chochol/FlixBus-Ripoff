import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import Coordinates from 'types/Objects/Coordinates';
import Location from 'types/Objects/Location';
import { AppState } from './RootReducer';
import locations from 'tempDataSources/locations.json';

interface LocationsSliceState {
  allLocations: Location[],
  locationsForDepartureTextField: Location[],
  locationsForDestinationTextField: Location[],
  locationsForMap: Location[],
  lastUpperLeft?: Coordinates,
  lastBottomRight?: Coordinates,
}

const allLocations: Location[] = locations.locations;

const locationsInitialState: LocationsSliceState = {
  allLocations: [],
  locationsForDepartureTextField: [],
  locationsForDestinationTextField: [],
  locationsForMap: [],
}

// fake API calls
const getLocationsByCoordinates = (upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number) => {
  const maxZoom = 14;
  const offset = (maxZoom * 80) / (zoomLevel * zoomLevel * zoomLevel);
  // offset to expand the rectangle a bit so its a bit bigger than the map bounds

  const fitsOnScreen = (location: Location) => {
    return (location.coordinates.lat + offset >= bottomRight.lat &&
      location.coordinates.lat <= upperLeft.lat + offset &&
      location.coordinates.lng + offset >= bottomRight.lng &&
      location.coordinates.lng <= upperLeft.lng + offset) ||
      (location.coordinates.lat >= bottomRight.lat + offset &&
        location.coordinates.lat + offset <= upperLeft.lat &&
        location.coordinates.lng >= bottomRight.lng + offset &&
        location.coordinates.lng + offset <= upperLeft.lng)
  }

  const isImportantEnough = (location: Location) => {
    return location.importance <= zoomLevel;
  }

  return allLocations.filter(location => fitsOnScreen(location) && isImportantEnough(location));
}
const getLocationsBySubstring = (substring: string) => {
  return allLocations.filter(location => location.name.startsWith(substring));
}
const getLocationsByIdArray = (ids: number[]) => {
  return allLocations.filter(location => ids.includes(location.id));
}

export const getLocationsByIdArrayAsync = createAsyncThunk<Location[], number[]>(
  'locations/getLocationsByIdArrayAsync',
  async (ids) => {
    return getLocationsByIdArray(ids);
  }
);
export const getDepartureLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDepartureLocationsBySubstringAsync',
  async (substring) => {
    return getLocationsBySubstring(substring);
  }
);
export const getDestinationLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDestinationLocationsBySubstringAsync',
  async (substring) => {
    return getLocationsBySubstring(substring);
  }
);
export const getLocationsByCoordinatesAsync = createAsyncThunk<
  { locationsForMap: Location[], upperLeft: Coordinates, bottomRight: Coordinates },
  { upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number }
>(
  'locations/getLocationsByCoordinatesAsync',
  async ({ upperLeft, bottomRight, zoomLevel }) => {
    return {
      locationsForMap: getLocationsByCoordinates(upperLeft, bottomRight, zoomLevel),
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