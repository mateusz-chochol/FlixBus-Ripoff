import Coordinates from 'types/Objects/Coordinates';
import Location from 'types/Objects/Location';
import locations from './tempDataSources/locations.json';

const allLocations: Location[] = locations.locations;

// fake API calls
export const getLocationsByCoordinates = async (upperLeft: Coordinates, bottomRight: Coordinates, zoomLevel: number) => {
  const maxZoom = 14;
  const offset = (maxZoom * 80) / (zoomLevel * zoomLevel * zoomLevel);
  // offset to expand the rectangle a bit so its a bit bigger than the map bounds

  const fitsOnScreen = (location: Location) => {
    return (location.coordinates.lat + offset >= bottomRight.lat &&
      location.coordinates.lat <= upperLeft.lat + offset &&
      location.coordinates.lng + offset >= bottomRight.lng &&
      location.coordinates.lng <= upperLeft.lng + offset) ||
      (location.coordinates.lat >= bottomRight.lat + offset &&
        location.coordinates.lat + offset <= upperLeft.lat &&
        location.coordinates.lng >= bottomRight.lng + offset &&
        location.coordinates.lng + offset <= upperLeft.lng)
  }

  const isImportantEnough = (location: Location) => {
    return location.importance <= zoomLevel;
  }

  return allLocations.filter(location => fitsOnScreen(location) && isImportantEnough(location));
}

export const getLocationsBySubstring = async (substring: string) => {
  return allLocations.filter(location => location.name.startsWith(substring));
}

export const getLocationsByIdArray = async (ids: number[]) => {
  return allLocations.filter(location => ids.includes(location.id));
}