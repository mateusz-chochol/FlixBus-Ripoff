import Coordinates from './Coordinates';

export default interface Location {
  id: string,
  name: string,
  coordinates: Coordinates,
  importance: number,
}