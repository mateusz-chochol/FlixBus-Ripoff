import React from 'react'
import { Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import PrivateRouteProps from 'types/Props/Misc/PrivateRouteProps';
import DefaultRoute from './DefaultRoute';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, shouldBeLogged, shouldBeAdmin, ...rest }) => {
  const { currentUser, userTokenResult } = useAuth();

  const display = (
    (currentUser && (
      (shouldBeLogged && !shouldBeAdmin) || (shouldBeLogged && shouldBeAdmin && userTokenResult?.claims.admin)
    )) ||
    (!currentUser && !shouldBeLogged && !shouldBeAdmin)
  );

  return Component ? (
    <DefaultRoute {...rest} render={props =>
      display ? <Component {...props} /> : <Redirect to="/" />
    } />
  ) : null;
};

export default PrivateRoute;
