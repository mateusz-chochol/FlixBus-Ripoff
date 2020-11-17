import { configureStore, combineReducers } from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsSlice';
import TabsReducer from './TabsSlice';

const store = configureStore({
  reducer: combineReducers({
    notifications: NotificationsReducer,
    tab: TabsReducer,
  })
})

export type AppState = ReturnType<typeof store.getState>

export default store;