import trips from './tempDataSources/trips.json';

const allTrips = trips.trips;

// fake API calls
export const getTripsByDepartureId = async (id: number) => allTrips.filter(trip => trip.startLocationId === id);

export const getTripsByDestinationId = async (id: number) => allTrips.filter(trip => trip.endLocationId === id);

export const getTripsByDepartureAndDestinationIds = async (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: number, destinationId: number, date: Date) => {
  console.log('allTripsFound', allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date.toISOString().split('T')[0]))
  console.log(allTrips)
  console.log(date.toISOString().split('T')[0])
  return allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date.toISOString().split('T')[0]);
}
