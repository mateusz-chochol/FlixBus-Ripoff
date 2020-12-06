export default interface Trip {
  id: number,
  startLocationId: number,
  endLocationId: number,
  tripDuration: number,
  date: string
  price: number,
  maxSeats: number,
  seatsLeft: number,
};