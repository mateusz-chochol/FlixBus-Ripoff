import Coordinates from 'types/Objects/Coordinates';
import * as geofire from 'geofire-common';
import { firestore } from '../firebase';
import config from 'reduxConfig.json';

const locationsRef = firestore.collection('locations');

const delay = () => new Promise(resolve => setTimeout(resolve, config.apiDelay));

const convertFirebaseDataToLocation = (doc: any) => {
  const data = doc.data();

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

// fake API calls
export const getLocationsByCoordinates = async (center: Coordinates, upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number) => {
  await delay();

  const calculateRadiusInM = (upperLeft: Coordinates, bottomRight: Coordinates) => {
    const radian = 0.017453292519943295;
    const angle = 0.5 - Math.cos((bottomRight.lat - upperLeft.lat) * radian) / 2 +
      Math.cos(upperLeft.lat * radian) * Math.cos(bottomRight.lat * radian) *
      (1 - Math.cos((bottomRight.lng - upperLeft.lng) * radian)) / 2;

    return 6371 * Math.asin(Math.sqrt(angle)) * 1000;
  }

  const radiusInM = calculateRadiusInM(upperLeft, bottomRight);
  const bounds = geofire.geohashQueryBounds([center.lat, center.lng], radiusInM);

  const snapshotPromises = bounds.map(bound => {
    const query = locationsRef.orderBy('geohash').startAt(bound[0]).endAt(bound[1]);

    return query.get();
  })

  try {
    const snapshots = await Promise.all(snapshotPromises);

    const matchingDocs = snapshots.map(snapshot => snapshot.docs).flat().filter(doc => {
      const { latitude, longitude } = doc.get('coordinates');
      const distanceInM = geofire.distanceBetween([latitude, longitude], [center.lat, center.lng]) * 1000;

      return distanceInM <= radiusInM;
    })

    return matchingDocs.map(doc => convertFirebaseDataToLocation(doc)).filter(location => location.importance <= zoomLevel)
  }
  catch (error) {
    console.error(error);

    throw error;
  }
}

export const getLocationsBySubstring = async (substring: string) => {
  await delay();

  try {
    return (await locationsRef.where('name', '>=', substring).where('name', '<=', substring + '\uf8ff').get())
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
    return (await locationsRef.where('id', 'in', ids).get())
      .docs.map(doc => convertFirebaseDataToLocation(doc))
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