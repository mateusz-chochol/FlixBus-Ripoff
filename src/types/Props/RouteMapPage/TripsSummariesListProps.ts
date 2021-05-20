import Location from 'types/Objects/Location';
import Trip from 'types/Objects/Trip';
import {
  TypographyProps,
  BoxProps,
} from '@material-ui/core';

export default interface TripsSummariesListProps {
  departure?: Location,
  locations: Location[],
  tripsDestinations: Trip[],
  isSmallScreen: boolean,
  listItemClassName?: string,
  typographyProps?: TypographyProps,
  messageBoxProps?: BoxProps,
  handleTripsSummariesListItemClick: (endLocationId: string) => void,
}