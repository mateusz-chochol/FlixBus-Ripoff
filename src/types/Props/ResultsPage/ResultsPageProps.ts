import { WithWidth } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

interface ResultsPageParams {
  departureIdFromUrl: string,
  destinationIdFromUrl: string,
  departureDateAsString: string,
  returnDateAsString?: string,
}

export default interface ResultsPageProps extends RouteComponentProps<ResultsPageParams>, WithWidth { }