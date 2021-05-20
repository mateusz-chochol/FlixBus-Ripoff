import Trip from 'types/Objects/Trip';
import Location from 'types/Objects/Location';
import {
  TypographyProps,
  BoxProps,
} from '@material-ui/core';

export default interface MapTripsListProps {
  departure?: Location,
  destination?: Location,
  locations: Location[],
  tripsDestinations: Trip[],
  trips: Trip[],
  isSmallScreen: boolean,
  listClassName?: string,
  listItemClassName?: string,
  listSubheader?: string,
  typographyProps?: TypographyProps,
  messageBoxProps?: BoxProps,
  handleTripsSummariesListItemClick: (endLocationId: number) => void,
  handleFullTripsListItemClick: (trip: Trip) => void,
  isLoading: boolean,
  shouldDisplayLoadingScreen: boolean,
}