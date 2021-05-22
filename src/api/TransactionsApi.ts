import Transaction from 'types/Objects/Transaction';
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
    }
  }

  throw new Error('Response from the server didn\'t contain data to process');
}

export const getTransactionsByUserId = async (id: string) => {
  await delay();

  try {
    return (await transactionsRef.where('userId', '==', id).get())
      .docs.map(doc => convertFirebaseDataToTransaction(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const addTransaction = async (transaction: Transaction) => {
  return transaction;
}