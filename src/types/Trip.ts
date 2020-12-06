export default interface Trip {
  id: number,
  startLocationId: number,
  endLocationId: number,
  startTime: Date,
  tripDuration: number,
  price: number,
  maxSeats: number,
  seatsLeft: number,
};