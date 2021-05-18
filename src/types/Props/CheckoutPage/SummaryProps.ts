import CartTrip from 'types/Objects/CartTrip';
import Location from 'types/Objects/Location';

export default interface SummaryProps {
  cart: CartTrip[],
  locations: Location[],
  selectedCartTrip?: CartTrip,
  setSelectedCartTrip: (value: React.SetStateAction<CartTrip | undefined>) => void,
}