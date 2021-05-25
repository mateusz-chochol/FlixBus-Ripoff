import TransactionTrip from 'types/Objects/TransactionTrip';
import firebase from 'firebase/app';
import { firestore } from '../firebase';
import config from 'reduxConfig.json';

const transactionsRef = firestore.collection('transactions');

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
      .docs.map(doc => convertFirebaseDataToTransaction(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const addTransaction = async (date: string, price: number, tripIds: TransactionTrip[], userId: string, email: string) => {
  await delay();

  try {
    const newTransaction = await (await transactionsRef.add({
      date: date,
      price: price,
      tripIds: tripIds,
      userId: userId,
      email: email,
    })).get()

    return convertFirebaseDataToTransaction(newTransaction)
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}