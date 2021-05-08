import trips from './tempDataSources/trips.json';
import moment from 'moment';

const allTrips = trips.trips;

// fake API calls
export const getTripsByDepartureId = async (id: number) => allTrips.filter(trip => trip.startLocationId === id);

export const getTripsByDepartureIdAndDate = async (id: number, date: Date) =>
  allTrips.filter(trip => trip.startLocationId === id && trip.date === moment(date).format('YYYY-MM-DD'));

export const getTripsByDepartureAndDestinationIds = async (departureId: number, destinationId: number) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId);

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: number, destinationId: number, date: Date) =>
  allTrips.filter(trip => trip.startLocationId === departureId && trip.endLocationId === destinationId && trip.date === moment(date).format('YYYY-MM-DD'));
