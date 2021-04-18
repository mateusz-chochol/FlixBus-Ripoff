import { RouteComponentProps } from 'react-router-dom';

interface TripPageParams {
  tripId: string,
}

export default interface TripPageProps extends RouteComponentProps<TripPageParams> { }