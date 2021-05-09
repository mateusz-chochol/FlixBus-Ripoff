import trips from './tempDataSources/trips.json';

const allTrips = trips.trips;

// fake API calls
export const getTripsByDepartureId = async (id: number) =>
  allTrips.filter(trip => trip.startLocationId === id);

export const getTripsByDepartureIdAndDate = async (id: number, date: string) =>
  allTrips.filter(trip => trip.startLocationId === id && trip.date === date);

export const getTripsByDepartureAndDestinationIds = async (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: number, destinationId: number, date: string) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date);

export const getTripById = async (id: number) =>
  allTrips.find(trip => trip.id === id);