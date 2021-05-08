import trips from './tempDataSources/trips.json';

const allTrips = trips.trips;

// fake API calls
export const getTripsByDepartureId = async (id: number) => allTrips.filter(trip => trip.startLocationId === id);

export const getTripsByDepartureAndDateId = async (id: number, date: Date) =>
  allTrips.filter(trip => trip.startLocationId === id && trip.date === date.toISOString().split('T')[0]);

export const getTripsByDepartureAndDestinationIds = async (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: number, destinationId: number, date: Date) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date.toISOString().split('T')[0]);
