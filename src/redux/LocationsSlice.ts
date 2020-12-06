import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
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
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitialState,
  reducers: {

  }
})

export const getLocations = (state: AppState) => state.locations;

export default locationsSlice.reducer