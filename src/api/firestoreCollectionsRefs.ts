import { firestore } from '../firebase';

export const locationsRef = firestore.collection('locations');
export const transactionsRef = firestore.collection('transactions');
export const tripsRef = firestore.collection('trips');