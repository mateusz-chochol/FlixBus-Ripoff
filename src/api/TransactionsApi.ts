import TransactionTrip from 'types/Objects/TransactionTrip';
import firebase from 'firebase/app';
import { tripsRef, transactionsRef } from './firestoreCollectionsRefs';
import config from 'reduxConfig.json';

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

const convertFirebaseDataToTransaction = (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
  const data = doc.data();

  if (data) {
    return {
      id: doc.id,
      price: data.price,
      date: data.date,
      tripIds: data.tripIds,
      email: data.email,
    }
  }

  throw new Error('Response from the server didn\'t contain data to process');
}

export const getTransactionsByUserId = async (id: string) => {
  await delay();

  try {
    return (await transactionsRef.where('userId', '==', id).orderBy('date', 'desc').get())
      .docs.map(doc => convertFirebaseDataToTransaction(doc)).filter(transaction => transaction !== undefined);
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const addTransaction = async (date: string, price: number, tripIds: TransactionTrip[], userId: string, email: string) => {
  await delay();

  try {
    const promises = tripIds.map(async (tripId) => {
      const trip = await tripsRef.doc(tripId.tripId).get();
      const tripData = trip.data();

      if (tripData) {
        trip.ref.update({
          seatsLeft: tripData.seatsLeft - tripId.seats,
        })
      }
    })

    await Promise.all(promises);
  }
  catch (error) {
    console.error(error);

    throw error;
  }

  try {
    const newTransactionRef = await transactionsRef.add({
      date: date,
      price: price,
      tripIds: tripIds,
      userId: userId,
      email: email,
    })

    if (userId !== '') {
      const newTransaction = await newTransactionRef.get();

      return convertFirebaseDataToTransaction(newTransaction);
    }

    return undefined;
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const removeTransaction = async (transactionId: string) => {
  await delay();

  try {
    const transactionData = (await transactionsRef.doc(transactionId).get()).data()

    if (transactionData) {
      const promises = transactionData.tripIds.map(async (tripId: TransactionTrip) => {
        const trip = await tripsRef.doc(tripId.tripId).get();
        const tripData = trip.data();

        if (tripData) {
          trip.ref.update({
            seatsLeft: tripData.seatsLeft + tripId.seats,
          })
        }
      })

      await Promise.all(promises);
    }
    else {
      const error = new Error(`Couldn't find the transaction with id: ${transactionId}.`);
      error.name = 'CustomError';

      throw error;
    }
  }
  catch (error) {
    console.error(error);

    throw error;
  }

  try {
    await transactionsRef.doc(transactionId).delete();

    return transactionId;
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}