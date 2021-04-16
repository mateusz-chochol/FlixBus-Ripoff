import TripType from 'types/Objects/TripType';

export default interface MainPageDateFieldsProps {
  departureDate: Date | null,
  returnDate: Date | null,
  tripType: TripType,
  handleDepartureDateChange: (date: Date | null, setIsDepartureDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => void,
  handleReturnDateChange: (date: Date | null, setIsReturnDateWindowOpen: (value: React.SetStateAction<boolean>) => void) => void,
}