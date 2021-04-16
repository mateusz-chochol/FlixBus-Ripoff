import TripType from 'types/Objects/TripType';
import Location from 'types/Objects/Location';

export default interface DepartureDestinationFormSmallProps {
  departure?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  destination?: Location,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  departureDate: Date | null,
  returnDate: Date | null,
  numberOfPassengers?: number,
  tripType: TripType,
  handleTripTypeChange: (tripType: TripType) => void,
  handleDepartureDateChange: (date: Date | null, setIsDepartureDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => void,
  handleReturnDateChange: (date: Date | null, setIsReturnDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => void,
  handlePassengersNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  departureLocations: Location[],
  destinationLocations: Location[],
  fullWidth?: boolean,
}