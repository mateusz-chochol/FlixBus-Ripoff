import trips from './tempDataSources/trips.json';

const allTrips = trips.trips;

const delayTime = 0;
const delay = () => new Promise(resolve => setTimeout(resolve, delayTime));

// fake API calls
export const getTripsByDepartureId = async (id: number) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === id);
}

export const getTripsByDepartureIdAndDate = async (id: number, date: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === id && trip.date === date);
}

export const getTripsByDepartureAndDestinationIds = async (departureId: number, destinationId: number) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);
}

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: number, destinationId: number, date: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date);
}

export const getTripById = async (id: number) => {
  await delay();

  return allTrips.find(trip => trip.id === id);
}