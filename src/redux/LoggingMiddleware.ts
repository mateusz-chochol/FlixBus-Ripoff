import { Middleware } from 'redux'
import { AppState } from './RootReducer';

const LoggingMiddleware: Middleware<
  {},
  AppState
> = store => next => action => {
  console.log('Dispatched: ', action.type)
  next(action);
}

export default LoggingMiddleware;