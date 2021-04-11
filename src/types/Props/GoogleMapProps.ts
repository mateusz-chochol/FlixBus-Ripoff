import BasicTrip from 'types/Objects/BasicTrip';
import Location from 'types/Objects/Location';

export default interface GoogleMapProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  locationsForMap: Location[],
  basicTrips: BasicTrip[],
  isValidTripSelected: boolean,
  isSmallScreen: boolean,
  navBarHeight: string,
  footerMenuHeight: string,
}