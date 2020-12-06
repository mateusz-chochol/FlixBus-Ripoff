export default interface Trip {
  id: number,
  startLocationId: number,
  endLocationId: number,
  tripDuration: number,
  price: number,
  maxSeats: number,
  seatsLeft: number,
};