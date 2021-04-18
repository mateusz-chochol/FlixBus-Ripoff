import TripType from 'types/Objects/TripType';
import Location from 'types/Objects/Location';

export default interface DepartureDestinationFormSmallProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  departureDate: Date | null,
  setDepartureDate: (value: React.SetStateAction<Date | null>) => void,
  returnDate: Date | null,
  setReturnDate: (value: React.SetStateAction<Date | null>) => void,
  numberOfPassengers?: number,
  setNumberOfPassengers: (value: React.SetStateAction<number | undefined>) => void,
  tripType: TripType,
  setTripType: (value: React.SetStateAction<TripType>) => void,
  departureLocations: Location[],
  destinationLocations: Location[],
  fullWidth?: boolean,
}