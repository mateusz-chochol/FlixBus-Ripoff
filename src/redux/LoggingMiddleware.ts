import { Middleware } from 'redux'
import { AppState } from './RootReducer';
import reduxConfig from 'reduxConfig.json';

const LoggingMiddleware: Middleware<
  {},
  AppState
> = store => next => action => {
  if (!reduxConfig.logPending && action?.meta?.requestStatus === 'pending') {
    next(action);
  }
  else {
    console.log('Dispatched: ', action, '\nwith state: ', store.getState())
    next(action);
  }
}

export default LoggingMiddleware;