export default interface Location {
  id: number,
  name: string,
  coordinates: {
    lat: number,
    lng: number
  },
}