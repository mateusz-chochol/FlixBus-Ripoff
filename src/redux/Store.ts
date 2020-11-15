import { configureStore, combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';

const store = configureStore({
  reducer: combineReducers({
    notifications: NotificationsReducer
  })
})

export type AppState = ReturnType<typeof store.getState>

export default store;