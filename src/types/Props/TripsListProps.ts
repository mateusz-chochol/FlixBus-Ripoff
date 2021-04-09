import BasicTrip from 'types/Objects/BasicTrip';
import Trip from 'types/Objects/Trip';
import Location from 'types/Objects/Location';
import {
  TypographyProps,
  BoxProps,
} from '@material-ui/core';

export default interface TripsListProps {
  departure?: Location,
  destination?: Location,
  locations: Location[],
  basicTrips: BasicTrip[],
  trips: Trip[],
  isSmallScreen: boolean,
  listClassName?: string,
  listItemClassName?: string,
  listSubheader?: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  typographyProps?: TypographyProps,
  messageBoxProps?: BoxProps,
}