import CartTrip from './CartTrip';
import Passenger from './Passenger';

export default interface PassengersForTrip {
  cartTrip: CartTrip,
  passengers: Passenger[],
}