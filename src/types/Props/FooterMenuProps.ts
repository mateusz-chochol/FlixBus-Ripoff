import Location from 'types/Objects/Location';
import BasicTrip from 'types/Objects/BasicTrip';
import Trip from 'types/Objects/Trip';

export default interface FooterMenuProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  basicTrips: BasicTrip[],
  trips: Trip[],
  allLocations: Location[],
  departureLocationsForTextFields: Location[],
  destinationLocationsForTextFields: Location[],
  footerMenuHeight: string,
}