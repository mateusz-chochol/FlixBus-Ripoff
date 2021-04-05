import { RouteComponentProps } from 'react-router-dom';

interface ResultsPageParams {
  departureId: string,
  destinationId: string,
}

export default interface ResultsPageProps extends RouteComponentProps<ResultsPageParams> { }