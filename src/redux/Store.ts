import { configureStore, combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';
import TabsReducer from './TabsSlice';
import TripsReducer from './TripsSlice';
import LocationsReducer from './LocationsSlice';

const store = configureStore({
  reducer: combineReducers({
    notifications: NotificationsReducer,
    tab: TabsReducer,
    trips: TripsReducer,
    locations: LocationsReducer,
  })
})

export type AppState = ReturnType<typeof store.getState>

export default store;