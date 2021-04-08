import { Middleware } from 'redux'
import { AppState } from './RootReducer';

const LoggingMiddleware: Middleware<
  {},
  AppState
> = store => next => action => {
  console.log(store.getState())
  console.log('Dispatched: ', action.type)
  next(action);
}

export default LoggingMiddleware;