import DefaultRouteProps from './DefaultRouteProps';

export default interface PrivateRouteProps extends DefaultRouteProps {
  shouldBeLogged: boolean,
};