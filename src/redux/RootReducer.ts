import { combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';
import TabsReducer from './TabsSlice';
import TripsReducer from './TripsSlice';
import LocationsReducer from './LocationsSlice';

const rootReducer = combineReducers({
  notifications: NotificationsReducer,
  tab: TabsReducer,
  trips: TripsReducer,
  locations: LocationsReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;