import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import { setTab } from 'redux/TabsSlice';
import { useDispatch } from 'react-redux';
import DefaultRouteProps from 'types/DefaultRouteProps';

const DefaultRoute: React.FC<DefaultRouteProps> = ({ tabIndex, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTab(tabIndex ?? false));
  }, [dispatch, tabIndex])

  return <Route {...props} />;
};

export default DefaultRoute;
