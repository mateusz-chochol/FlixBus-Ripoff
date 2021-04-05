import React from 'react';
import { IconButton } from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import SwitchLocationsButtonProps from 'types/Props/SwitchLocationsButtonProps';

const SwitchLocationsButton: React.FC<SwitchLocationsButtonProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  size,
  fontSize,
}) => {
  const handleSwitchClick = () => {
    const tempDeparture = departure;
    setDeparture(destination);
    setDestination(tempDeparture);
  }

  return (
    <IconButton size={size} onClick={handleSwitchClick}>
      <LoopIcon fontSize={fontSize} />
    </IconButton>
  )
}

export default SwitchLocationsButton