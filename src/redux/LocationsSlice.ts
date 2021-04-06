import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import Coordinates from 'types/Objects/Coordinates';
import Location from 'types/Objects/Location';
import { AppState } from './Store';

interface LocationsSliceState {
  allLocations: Location[],
  locationsForDepartureTextField: Location[],
  locationsForDestinationTextField: Location[],
  locationsForMap: Location[],
}

const allLocations: Location[] = new Array<Location>(
  {
    id: 1,
    name: 'Kraków',
    coordinates: {
      lat: 50.0682709,
      lng: 19.9601472
    },
    importance: 1,
  },
  {
    id: 2,
    name: 'Berlin',
    coordinates: {
      lat: 52.5065133,
      lng: 13.1445545
    },
    importance: 1,
  },
  {
    id: 3,
    name: 'Białystok',
    coordinates: {
      lat: 53.1275431,
      lng: 23.0159837
    },
    importance: 1,
  },
  {
    id: 4,
    name: 'Warszawa',
    coordinates: {
      lat: 52.2326063,
      lng: 20.7810167
    },
    importance: 1,
  },
  {
    id: 5,
    name: 'Paryż',
    coordinates: {
      lat: 48.8588377,
      lng: 2.2770205
    },
    importance: 1,
  },
  {
    id: 6,
    name: 'Barcelona',
    coordinates: {
      lat: 41.3947688,
      lng: 2.0787282
    },
    importance: 1,
  },
  {
    id: 7,
    name: 'Amsterdam',
    coordinates: {
      lat: 52.3546449,
      lng: 4.8339211
    },
    importance: 1,
  },
  {
    id: 8,
    name: 'Praga',
    coordinates: {
      lat: 50.073658,
      lng: 14.418540
    },
    importance: 7,
  },
);

const locationsInitialState: LocationsSliceState = {
  allLocations: [],
  locationsForDepartureTextField: [],
  locationsForDestinationTextField: [],
  locationsForMap: [],
}

// fake API calls where allLocations would be a source on backend
const getDefaultLocations = () => locationsInitialState;
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
    getDefaultLocations: () => getDefaultLocations(),
    getLocationsByCoordinates: (state, { payload }: PayloadAction<{ upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number }>) => {
      const locationsByCoordinates = getLocationsByCoordinates(payload.upperLeft, payload.bottomRight, payload.zoomLevel);

      return {
        ...state,
        locationsForMap: locationsByCoordinates,
        allLocations: [
          ...state.allLocations,
          ...locationsByCoordinates,
        ]
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
  getDefaultLocations: getDefaultLocationsActionCreator,
  getLocationsByCoordinates: getLocationsByCoordinatesActionCreator,
  getDepartureLocationsBySubstring: getDepartureLocationsBySubstringActionCreator,
  getDestinationLocationsBySubstring: getDestinationLocationsBySubstringActionCreator,
  getLocationsByIdArray: getLocationsByIdArrayActionCreator,
} = locationsSlice.actions;

export default locationsSlice.reducer