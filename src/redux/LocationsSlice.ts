import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import Coordinates from 'types/Objects/Coordinates';
import Location from 'types/Objects/Location';
import { AppState } from './Store';

interface LocationsSliceState {
  allLocations: Location[],
  locationsForTextField: Location[],
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
  },
  {
    id: 2,
    name: 'Berlin',
    coordinates: {
      lat: 52.5065133,
      lng: 13.1445545
    },
  },
  {
    id: 3,
    name: 'Białystok',
    coordinates: {
      lat: 53.1275431,
      lng: 23.0159837
    },
  },
  {
    id: 4,
    name: 'Warszawa',
    coordinates: {
      lat: 52.2326063,
      lng: 20.7810167
    }
  },
  {
    id: 5,
    name: 'Paryż',
    coordinates: {
      lat: 48.8588377,
      lng: 2.2770205
    }
  },
  {
    id: 6,
    name: 'Barcelona',
    coordinates: {
      lat: 41.3947688,
      lng: 2.0787282
    }
  },
  {
    id: 7,
    name: 'Amsterdam',
    coordinates: {
      lat: 52.3546449,
      lng: 4.8339211
    }
  },
  {
    id: 8,
    name: 'Prague',
    coordinates: {
      lat: 50.073658,
      lng: 14.418540
    }
  },
);

const locationsInitialState: LocationsSliceState = {
  allLocations: allLocations,
  locationsForTextField: allLocations,
  locationsForMap: [],
}

// fake API calls
const getDefaultLocations = () => locationsInitialState;
const getLocationsByCoordinates = (upperLeft: Coordinates, bottomRight: Coordinates) => {
  return allLocations.filter(location => {
    return location.coordinates.lat >= bottomRight.lat &&
      location.coordinates.lat <= upperLeft.lat &&
      location.coordinates.lng >= bottomRight.lng &&
      location.coordinates.lng <= upperLeft.lng
  })
}
const getLocationsBySubstring = (substring: string) => {
  console.log(allLocations.filter(location => location.name.startsWith(substring)))
  return allLocations.filter(location => location.name.startsWith(substring));
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitialState,
  reducers: {
    getDefaultLocations: () => getDefaultLocations(),
    getLocationsByCoordinates: (state, { payload }: PayloadAction<{ upperLeft: Coordinates, bottomRight: Coordinates }>) => {
      const locationsByCoordinates = getLocationsByCoordinates(payload.upperLeft, payload.bottomRight);

      return {
        ...state,
        locationsForMap: locationsByCoordinates,
        allLocations: [
          ...state.allLocations,
          ...locationsByCoordinates,
        ]
      }
    },
    getLocationsBySubstring: (state, { payload }: PayloadAction<string>) => {
      const locationsBySubstring = getLocationsBySubstring(payload);

      return {
        ...state,
        locationsForTextField: locationsBySubstring,
        allLocations: [
          ...state.allLocations,
          ...locationsBySubstring,
        ]
      }
    },
  }
})

export const getAllLocations = (state: AppState) => state.locations.allLocations;
export const getLocationsForTextField = (state: AppState) => state.locations.locationsForTextField;
export const getLocationsForMap = (state: AppState) => state.locations.locationsForMap;

export const {
  getDefaultLocations: getDefaultLocationsActionCreator,
  getLocationsByCoordinates: getLocationsByCoordinatesActionCreator,
  getLocationsBySubstring: getLocationsBySubstringActionCreator,
} = locationsSlice.actions;

export default locationsSlice.reducer