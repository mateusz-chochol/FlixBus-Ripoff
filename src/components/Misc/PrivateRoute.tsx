import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { useNotifications } from 'components/Misc/Notifications';
import PrivateRouteProps from 'types/Props/PrivateRouteProps';
import DefaultRoute from './DefaultRoute';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, shouldBeLogged, ...rest }) => {
  const { currentUser } = useAuth();
  const { showInfo } = useNotifications();

  const display = (currentUser && shouldBeLogged) || (!currentUser && !shouldBeLogged);

  useEffect(() => {
    if (!display && Component) {
      const infoMessage = shouldBeLogged ? "You need to log in to see this page" : "You are already logged in";
      showInfo(infoMessage);
    }
    // eslint-disable-next-line
  }, [])

  return Component ? (
    <DefaultRoute {...rest} render={props =>
      display ? <Component {...props} /> : <Redirect to="/" />
    } />
  ) : null;
};

export default PrivateRoute;
