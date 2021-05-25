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

const filterExistingLocations = (allLocations: Location[], locationsToAdd?: Location[], locationToAdd?: Location) => {
  let locationsToReturn = allLocations;

  if (locationsToAdd) {
    locationsToReturn = locationsToReturn.concat(locationsToAdd.filter(locationToAdd => !locationsToReturn.map(location => location.id).includes(locationToAdd.id)));
  }

  if (locationToAdd && !locationsToReturn.map(location => location.id).includes(locationToAdd.id)) {
    locationsToReturn = locationsToReturn.concat(locationToAdd);
  }

  return locationsToReturn;
}

export const addLocation = createAsyncThunk<
  void,
  { name: string, latitude: number, longitude: number, geohash: string, importance: number }
>(
  'locations/addLocation',
  async ({ name, latitude, longitude, geohash, importance }) => {
    return await api.addLocation(name, latitude, longitude, geohash, importance);
  }
)

export const getLocationsByIdAsync = createAsyncThunk<Location | undefined, string>(
  'locations/getLocationsByIdAsync',
  async (id) => {
    return await api.getLocationById(id);
  },
  {
    condition: (id, { getState }) => {
      const { locations } = getState() as AppState;

      return !locations.allLocations.map(location => location.id).includes(id);
    }
  }
);

export const getLocationsByIdArrayAsync = createAsyncThunk<Location[], string[]>(
  'locations/getLocationsByIdArrayAsync',
  async (ids, thunkAPI) => {
    const { locations } = thunkAPI.getState() as AppState;
    const uniqueIds = Array.from(new Set(ids));
    const idsToAskFor = uniqueIds.filter(id => !locations.allLocations.map(location => location.id).includes(id));

    let locationsToReturn = locations.allLocations.filter(location => uniqueIds.includes(location.id));

    if (idsToAskFor.length > 0) {
      locationsToReturn = locationsToReturn.concat(await api.getLocationsByIdArray(idsToAskFor));
    }

    return locationsToReturn;
  },
  {
    condition: (ids, { getState }) => {
      const uniqueIds = Array.from(new Set(ids));
      const { locations, requestsState } = getState() as AppState;
      const idsToAskFor = uniqueIds.filter(id => !locations.allLocations.map(location => location.id).includes(id));

      return idsToAskFor.length > 0 && requestsState['locations/getLocationsByIdArrayAsync'] !== 'pending';
    }
  }
);

export const getDepartureLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDepartureLocationsBySubstringAsync',
  async (substring) => {
    return await api.getLocationsBySubstring(substring);
  },
  {
    condition: (substring) => {
      return substring.length > 0;
    }
  }
);

export const getDestinationLocationsBySubstringAsync = createAsyncThunk<Location[], string>(
  'locations/getDestinationLocationsBySubstringAsync',
  async (substring) => {
    return await api.getLocationsBySubstring(substring);
  },
  {
    condition: (substring) => {
      return substring.length > 0;
    }
  }
);

export const getLocationsByCoordinatesAsync = createAsyncThunk<
  { locationsForMap: Location[], upperLeft: Coordinates, bottomRight: Coordinates },
  { center: Coordinates, upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number }
>(
  'locations/getLocationsByCoordinatesAsync',
  async ({ center, upperLeft, bottomRight, zoomLevel }) => {
    return {
      locationsForMap: await api.getLocationsByCoordinates(center, upperLeft, bottomRight, zoomLevel),
      upperLeft: upperLeft,
      bottomRight: bottomRight
    };
  },
  {
    condition: ({ upperLeft, bottomRight }, { getState }) => {
      const { locations, requestsState } = getState() as AppState;
      const isRequestAlreadyPending = requestsState['locations/getLocationsByCoordinatesAsync'] === 'pending'

      return !isRequestAlreadyPending && (!locations.lastUpperLeft || !locations.lastBottomRight ||
        (upperLeft.lat !== locations.lastUpperLeft.lat ||
          upperLeft.lng !== locations.lastUpperLeft.lng ||
          bottomRight.lat !== locations.lastBottomRight.lat ||
          bottomRight.lng !== locations.lastBottomRight.lng));
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
          allLocations: filterExistingLocations(state.allLocations, action.payload.locationsForMap)
        }
      })
      .addCase(getLocationsByCoordinatesAsync.pending, (state, action) => {
        return {
          ...state,
          lastUpperLeft: action.meta.arg.upperLeft,
          lastBottomRight: action.meta.arg.bottomRight,
        }
      })
      .addCase(getDepartureLocationsBySubstringAsync.fulfilled, (state, action) => {
        return {
          ...state,
          locationsForDepartureTextField: action.payload,
          allLocations: filterExistingLocations(state.allLocations, action.payload)
        }
      })
      .addCase(getDepartureLocationsBySubstringAsync.pending, (state) => {
        return {
          ...state,
          locationsForDepartureTextField: [],
        }
      })
      .addCase(getDestinationLocationsBySubstringAsync.fulfilled, (state, action) => {
        return {
          ...state,
          locationsForDestinationTextField: action.payload,
          allLocations: filterExistingLocations(state.allLocations, action.payload)
        }
      })
      .addCase(getDestinationLocationsBySubstringAsync.pending, (state) => {
        return {
          ...state,
          locationsForDepartureTextField: [],
        }
      })
      .addCase(getLocationsByIdArrayAsync.fulfilled, (state, action) => {
        return {
          ...state,
          allLocations: filterExistingLocations(state.allLocations, action.payload)
        }
      })
      .addCase(getLocationsByIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          allLocations: filterExistingLocations(state.allLocations, undefined, action.payload)
        }
      })
  }
})

export const getAllLocations = (state: AppState) => state.locations.allLocations;
export const getLocationsForDepartureTextField = (state: AppState) => state.locations.locationsForDepartureTextField;
export const getLocationsForDestinationTextField = (state: AppState) => state.locations.locationsForDestinationTextField;
export const getLocationsForMap = (state: AppState) => state.locations.locationsForMap;

export default locationsSlice.reducer;