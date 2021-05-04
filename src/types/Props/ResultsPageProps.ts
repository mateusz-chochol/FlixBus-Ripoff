import { WithWidth } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

interface ResultsPageParams {
  departureIdAsString: string,
  destinationIdAsString: string,
}

export default interface ResultsPageProps extends RouteComponentProps<ResultsPageParams>, WithWidth { }