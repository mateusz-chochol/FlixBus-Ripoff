import Coordinates from 'types/Objects/Coordinates';
import * as geofire from 'geofire-common';
import firebase from 'firebase/app';
import { locationsRef, tripsRef } from './firestoreCollectionsRefs';
import config from 'reduxConfig.json';

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

const convertFirebaseDataToLocation = (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
  const data = doc.data();

  if (data) {
    return {
      id: doc.id,
      name: data.name,
      coordinates: {
        lat: data.coordinates.latitude,
        lng: data.coordinates.longitude
      },
      importance: data.importance
    }
  }

  throw new Error('Response from the server didn\'t contain data to process');
}

export const getLocationsByCoordinates = async (center: Coordinates, upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number) => {
  await delay();

  const calculateRadiusInM = (upperLeft: Coordinates, bottomRight: Coordinates) => {
    const radian = 0.017453292519943295;
    const angle = 0.5 - Math.cos((bottomRight.lat - upperLeft.lat) * radian) / 2 +
      Math.cos(upperLeft.lat * radian) * Math.cos(bottomRight.lat * radian) *
      (1 - Math.cos((bottomRight.lng - upperLeft.lng) * radian)) / 2;

    return 6371 * Math.asin(Math.sqrt(angle)) * 500; // for some reason multiplying by 500 (so half the radius) seems to give
  }                                                  // a bit more accurate results later in getting the proper bounds

  const radius = calculateRadiusInM(upperLeft, bottomRight);
  const bounds = geofire.geohashQueryBounds([center.lat, center.lng], radius);

  const allowedZoomLevels = Array.from(Array(zoomLevel + 1).keys())

  try {
    const snapshotPromises = bounds.map(bound => {
      const query = locationsRef.orderBy('geohash').where('importance', 'in', allowedZoomLevels).startAt(bound[0]).endAt(bound[1]);

      return query.get();
    })

    const snapshots = await Promise.all(snapshotPromises);

    return snapshots.map(snapshot => snapshot.docs).flat().map(doc => convertFirebaseDataToLocation(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getLocationsBySubstring = async (substring: string) => {
  await delay();

  try {
    return (await locationsRef.where('name', '>=', substring).where('name', '<=', substring + '\uf8ff').limit(5).get())
      .docs.map(doc => convertFirebaseDataToLocation(doc))
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getLocationsByIdArray = async (ids: string[]) => {
  await delay();

  try {
    const documentsPromises = ids.map(id => locationsRef.doc(id).get());

    return (await Promise.all(documentsPromises)).map(doc => convertFirebaseDataToLocation(doc));
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getLocationById = async (id: string) => {
  await delay();

  try {
    return convertFirebaseDataToLocation(await locationsRef.doc(id).get())
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const addLocation = async (name: string, latitude: number, longitude: number, geohash: string, importance: number) => {
  await delay();

  try {
    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(importance)) {
      const newLocation = await (await locationsRef.add({
        name: name,
        coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
        geohash: geohash,
        importance: importance
      })).get()

      return convertFirebaseDataToLocation(newLocation);
    }
  }
  catch (error) {
    console.error(error)

    throw error;
  }
}

export const removeLocation = async (locationId: string) => {
  await delay();

  try {
    const tripsWithThisDeparture = tripsRef.where('startLocationId', '==', locationId).get();
    const tripsWithThisDestination = tripsRef.where('endLocationId', '==', locationId).get();
    const allTrips = await Promise.all([tripsWithThisDeparture, tripsWithThisDestination]);

    const promises: Promise<void>[] = [];

    allTrips.forEach(snapshot => snapshot.forEach(async (trip) => promises.push(trip.ref.delete())));

    await Promise.all(promises);
  }
  catch (error) {
    console.error(error);

    throw error;
  }

  try {
    await locationsRef.doc(locationId).delete();

    return locationId;
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}