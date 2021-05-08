import Location from 'types/Objects/Location';
import Trip from 'types/Objects/Trip';

export default interface FooterMenuProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  departureDate: Date | null,
  setDepartureDate: (value: React.SetStateAction<Date | null>) => void,
  trips: Trip[],
  allLocations: Location[],
  footerMenuHeight: string,
}