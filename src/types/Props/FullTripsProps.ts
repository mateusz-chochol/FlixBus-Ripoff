import Location from 'types/Objects/Location';
import Trip from 'types/Objects/Trip';
import {
  TypographyProps,
  BoxProps,
} from '@material-ui/core';

export default interface FullTripsProps {
  locations: Location[],
  trips: Trip[],
  listItemClassName?: string,
  typographyProps?: TypographyProps,
  messageBoxProps?: BoxProps
}