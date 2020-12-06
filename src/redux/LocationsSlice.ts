import { createSlice } from '@reduxjs/toolkit';
import Location from '../types/Location';
import { AppState } from './Store';

const locationsInitialState: Location[] = new Array<Location>(
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
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitialState,
  reducers: {

  }
})

export const getLocations = (state: AppState) => state.locations;

export default locationsSlice.reducer

// Code to check if location is on the screen.
// Its supposed to run on the server but i'm yet to think through how i'm going to do this.

// const isWithin = (point: Coordinates, northEast: Coordinates, southWest: Coordinates) => {
//   console.log('point', point);
//   console.log('upperLeft', northEast);
//   console.log('bottomRight', southWest);

//   return point.lat >= southWest.lat &&
//     point.lat <= northEast.lat &&
//     point.lng >= southWest.lng &&
//     point.lng <= northEast.lng
// }