import CartTrip from 'types/Objects/CartTrip';
import Location from 'types/Objects/Location';
import PassengersForTrip from 'types/Objects/PassengersForTrip';

export default interface SummaryProps {
  cart: CartTrip[],
  locations: Location[],
  selectedCartTrip?: CartTrip,
  setSelectedCartTrip: (value: React.SetStateAction<CartTrip | undefined>) => void,
  passengersForTrips: PassengersForTrip[],
  mail: string,
  phoneNumber: string,
}