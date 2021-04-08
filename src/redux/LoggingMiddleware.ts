import { Middleware } from 'redux'
import { AppState } from './RootReducer';

const LoggingMiddleware: Middleware<
  {},
  AppState
> = store => next => action => {
  console.log('Dispatched: ', action, '\nwith state: ', store.getState())
  next(action);
}

export default LoggingMiddleware;