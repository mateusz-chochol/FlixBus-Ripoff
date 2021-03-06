import Location from 'types/Objects/Location';

export default interface SwitchLocationsButtonProps {
  departure?: Location,
  destination?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  allowEmptyDeparture?: boolean,
  size?: "small" | "medium",
  fontSize?: "inherit" | "default" | "large" | "small",
}