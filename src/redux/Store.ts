import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import LoggingMiddleware from './LoggingMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoggingMiddleware)
})

export type AppState = ReturnType<typeof store.getState>

export default store;