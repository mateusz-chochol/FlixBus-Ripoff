import { RouteComponentProps } from 'react-router-dom';

interface ResultsPageParams {
  departureId: string,
  destinationId: string,
}

export interface ResultsPageProps extends RouteComponentProps<ResultsPageParams> { }