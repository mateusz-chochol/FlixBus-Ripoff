import firebase from 'firebase/app';
import { firestore } from '../firebase';
import config from 'reduxConfig.json';
import moment from 'moment';

const tripsRef = firestore.collection('trips');

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

const convertFirebaseDataToTrip = (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
  const data = doc.data();

  if (data) {
    return {
      id: doc.id,
      startLocationId: data.startLocationId,
      endLocationId: data.endLocationId,
      tripDuration: data.tripDuration,
      date: data.date,
      hour: data.hour,
      price: data.price,
      maxSeats: data.maxSeats,
      seatsLeft: data.seatsLeft
    }
  }

  throw new Error('Response from the server didn\'t contain data to process');
}

export const getTripsByDepartureIdAndDate = async (id: string, date: string) => {
  await delay();

  try {
    return (await tripsRef.where('startLocationId', '==', id).where('date', '==', date).where('seatsLeft', '!=', 0).get())
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
    return (await tripsRef.where('startLocationId', '==', departureId).where('endLocationId', '==', destinationId).where('date', '==', date).where('seatsLeft', '!=', 0).get())
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

export const getTripsByIdsArray = async (ids: string[]) => {
  await delay();

  try {
    const documentsPromises = ids.map(id => tripsRef.doc(id).get());

    return (await Promise.all(documentsPromises)).map(doc => convertFirebaseDataToTrip(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const updateTripsDates = async () => {
  const today = moment().format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

  try {
    const promises: Promise<void>[] = [];

    (await tripsRef.get()).forEach(snapshot => {
      const coinToss = Math.floor(Math.random() * 2) === 0;

      promises.push(snapshot.ref.update({
        date: coinToss ? today : tomorrow
      }))
    })

    await Promise.all(promises);
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}