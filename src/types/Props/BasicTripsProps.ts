import Location from 'types/Objects/Location';
import BasicTrip from 'types/Objects/BasicTrip';
import {
  TypographyProps,
  BoxProps,
} from '@material-ui/core';

export default interface BasicTripsProps {
  locations: Location[],
  basicTrips: BasicTrip[],
  isSmallScreen: boolean,
  listItemClassName?: string,
  typographyProps?: TypographyProps,
  messageBoxProps?: BoxProps,
  handleBasicTripsListItemClick: (trip: BasicTrip) => void,
}