import BasicTrip from 'types/Objects/BasicTrip';
import basicTrips from './tempDataSources/basicTrips.json';

const allTrips: BasicTrip[] = basicTrips.basicTrips;

// fake API calls
export const getBasicTripsFromDepartureId = (id: number) => allTrips.filter(trip => trip.startLocationId === id);