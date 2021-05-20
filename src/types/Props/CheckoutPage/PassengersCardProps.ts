import CartTrip from 'types/Objects/CartTrip';
import PassengersForTrip from 'types/Objects/PassengersForTrip';

export default interface PassengersCardProps {
  selectedCartTrip?: CartTrip,
  passengersForTrips: PassengersForTrip[],
  setPassengersForTrips: (value: React.SetStateAction<PassengersForTrip[]>) => void,
  error: boolean,
  removeError: (value: string) => void
}