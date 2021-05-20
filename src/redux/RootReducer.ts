import { combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';
import TabsReducer from './TabsSlice';
import TripsReducer from './TripsSlice';
import LocationsReducer from './LocationsSlice';
import CartReducer from './CartSlice';
import RequestsStateReducer from './RequestsStateSlice';

const rootReducer = combineReducers({
  notifications: NotificationsReducer,
  tab: TabsReducer,
  trips: TripsReducer,
  locations: LocationsReducer,
  cart: CartReducer,
  requestsState: RequestsStateReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;