import Location from './Location';

export default interface Trip {
  startLocation: Location,
  endLocation: Location,
  startTime: Date,
  tripDuration: number,
  price: number,
  maxSeats: number,
  seatsLeft: number,
};