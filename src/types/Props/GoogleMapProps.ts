import Trip from 'types/Objects/Trip';
import Location from 'types/Objects/Location';

export default interface GoogleMapProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  locationsForMap: Location[],
  trips: Trip[],
  isValidTripSelected: boolean,
  isSmallScreen: boolean,
  navBarHeight: string,
  footerMenuHeight: string,
}