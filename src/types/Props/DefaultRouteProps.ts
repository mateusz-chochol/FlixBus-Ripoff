import { RouteProps } from 'react-router-dom';

export default interface DefaultRouteProps extends RouteProps {
  tabIndex?: number | false,
};