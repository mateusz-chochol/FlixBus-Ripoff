export default interface Trip {
  id: string,
  startLocationId: string,
  endLocationId: string,
  tripDuration: number,
  date: string,
  hour: string,
  price: number,
  maxSeats: number,
  seatsLeft: number,
  isCanceled?: boolean,
};