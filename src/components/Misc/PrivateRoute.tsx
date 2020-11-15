import React, { useEffect } from 'react'
import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../Misc/Notifications';

interface PrivateRouteProps extends RouteProps {
  shouldBeLogged: boolean
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, shouldBeLogged, ...rest }) => {
  const { currentUser } = useAuth();
  const { showInfo } = useNotifications();

  const display = (currentUser && shouldBeLogged) || (!currentUser && !shouldBeLogged);

  useEffect(() => {
    if (!display) {
      const infoMessage = shouldBeLogged ? "You need to log in to see this page" : "You are already logged in";
      showInfo(infoMessage);
    }
    // eslint-disable-next-line
  }, [])

  return Component ? (
    <Route {...rest} render={props =>
      display ? <Component {...props} /> : <Redirect to="/" />
    } />
  ) : null;
};

export default PrivateRoute;
