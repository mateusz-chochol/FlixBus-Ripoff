import { combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';
import TabsReducer from './TabsSlice';
import TripsReducer from './TripsSlice';
import LocationsReducer from './LocationsSlice';
import CartReducer from './CartSlice';

const rootReducer = combineReducers({
  notifications: NotificationsReducer,
  tab: TabsReducer,
  trips: TripsReducer,
  locations: LocationsReducer,
  cart: CartReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;