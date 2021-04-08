import trips from './tempDataSources/trips.json';

const allTrips = trips.trips;

// fake API calls
export const getTripsByDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);
export const getTripsByDestinationId = (id: number) => allTrips.filter(trip => trip.endLocationId === id);
export const getTripsByDepartureAndDestinationIds = (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);