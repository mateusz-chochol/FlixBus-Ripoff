import trips from './tempDataSources/trips.json';
import config from 'reduxConfig.json';

const allTrips = trips.trips;

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

// fake API calls
export const getTripsByDepartureId = async (id: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === id);
}

export const getTripsByDepartureIdAndDate = async (id: string, date: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === id && trip.date === date);
}

export const getTripsByDepartureAndDestinationIds = async (departureId: string, destinationId: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);
}

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: string, destinationId: string, date: string) => {
  await delay();

  return allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === date);
}

export const getTripById = async (id: string) => {
  await delay();

  return allTrips.find(trip => trip.id === id);
}