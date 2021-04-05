import Location from './Location';

export default interface SwitchLocationsButtonProps {
  departure?: Location,
  destination?: Location,
  setDeparture: (value: React.SetStateAction<Location | undefined>) => void,
  setDestination: (value: React.SetStateAction<Location | undefined>) => void,
  size?: "small" | "medium",
  fontSize?: "inherit" | "default" | "large" | "small",
}