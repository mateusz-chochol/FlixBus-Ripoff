import {
  createSlice,
  PayloadAction,
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

// fake API calls where allLocations would be a source on backend
const getLocationsByCoordinates = (upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number) => {
  const maxZoom = 14;
  const longituteOffset = (maxZoom * 80) / (zoomLevel * zoomLevel * zoomLevel);
  const latitudeOffset = (maxZoom * 80) / (zoomLevel * zoomLevel * zoomLevel);

  const fitsOnScreen = (location: Location) => {
    return (location.coordinates.lat + latitudeOffset >= bottomRight.lat &&
      location.coordinates.lat <= upperLeft.lat + latitudeOffset &&
      location.coordinates.lng + longituteOffset >= bottomRight.lng &&
      location.coordinates.lng <= upperLeft.lng + longituteOffset) ||
      (location.coordinates.lat >= bottomRight.lat + latitudeOffset &&
        location.coordinates.lat + latitudeOffset <= upperLeft.lat &&
        location.coordinates.lng >= bottomRight.lng + longituteOffset &&
        location.coordinates.lng + longituteOffset <= upperLeft.lng)
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

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitialState,
  reducers: {
    getLocationsByCoordinates: (state, { payload }: PayloadAction<{ upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number }>) => {
      if (payload.upperLeft !== state.lastUpperLeft || payload.bottomRight !== state.lastBottomRight) {
        const locationsByCoordinates = getLocationsByCoordinates(payload.upperLeft, payload.bottomRight, payload.zoomLevel);

        return {
          ...state,
          locationsForMap: locationsByCoordinates,
          lastUpperLeft: payload.upperLeft,
          lastBottomRight: payload.bottomRight,
          allLocations: [
            ...state.allLocations,
            ...locationsByCoordinates,
          ]
        }
      }
    },
    getDepartureLocationsBySubstring: (state, { payload }: PayloadAction<string>) => {
      const locationsBySubstring = getLocationsBySubstring(payload);

      return {
        ...state,
        locationsForDepartureTextField: locationsBySubstring,
        allLocations: [
          ...state.allLocations,
          ...locationsBySubstring,
        ]
      }
    },
    getDestinationLocationsBySubstring: (state, { payload }: PayloadAction<string>) => {
      const locationsBySubstring = getLocationsBySubstring(payload);

      return {
        ...state,
        locationsForDestinationTextField: locationsBySubstring,
        allLocations: [
          ...state.allLocations,
          ...locationsBySubstring,
        ]
      }
    },
    getLocationsByIdArray: (state, { payload }: PayloadAction<number[]>) => {
      const locationsByIdArray = getLocationsByIdArray(payload);

      return {
        ...state,
        allLocations: [
          ...state.allLocations,
          ...locationsByIdArray,
        ]
      }
    }
  }
})

export const getAllLocations = (state: AppState) => state.locations.allLocations;
export const getLocationsForDepartureTextField = (state: AppState) => state.locations.locationsForDepartureTextField;
export const getLocationsForDestinationTextField = (state: AppState) => state.locations.locationsForDestinationTextField;
export const getLocationsForMap = (state: AppState) => state.locations.locationsForMap;

export const {
  getLocationsByCoordinates: getLocationsByCoordinatesActionCreator,
  getDepartureLocationsBySubstring: getDepartureLocationsBySubstringActionCreator,
  getDestinationLocationsBySubstring: getDestinationLocationsBySubstringActionCreator,
  getLocationsByIdArray: getLocationsByIdArrayActionCreator,
} = locationsSlice.actions;

export default locationsSlice.reducer