export default interface Trip {
  id: number,
  startLocationId: number,
  endLocationId: number,
  tripDuration: number,
  date: string,
  hour: string,
  price: number,
  maxSeats: number,
  seatsLeft: number,
};