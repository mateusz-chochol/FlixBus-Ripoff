import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import LoggingMiddleware from './LoggingMiddleware';
import reduxConfig from 'reduxConfig.json'

let middlewares: Middleware[] = [];

if (reduxConfig.logRedux) {
  middlewares.push(LoggingMiddleware);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

export type AppState = ReturnType<typeof store.getState>;

export default store;