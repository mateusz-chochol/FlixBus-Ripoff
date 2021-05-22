import { firestore } from '../firebase';
import config from 'reduxConfig.json';

const tripsRef = firestore.collection('trips');

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

const convertFirebaseDataToTrip = (doc: any) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
  }
}

export const getTripsByDepartureIdAndDate = async (id: string, date: string) => {
  await delay();

  try {
    return (await tripsRef.where('startLocationId', '==', id).where('date', '==', date).get())
      .docs.map(doc => convertFirebaseDataToTrip(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getTripsByDepartureAndDestinationIdsAndDate = async (departureId: string, destinationId: string, date: string) => {
  await delay();

  try {
    return (await tripsRef.where('startLocationId', '==', departureId).where('endLocationId', '==', destinationId).where('date', '==', date).get())
      .docs.map(doc => convertFirebaseDataToTrip(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getTripById = async (id: string) => {
  await delay();

  try {
    return convertFirebaseDataToTrip(await tripsRef.doc(id).get())
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}