import React from 'react';
import {
  Box,
  List,
  Typography,
} from '@material-ui/core';
import TripsListProps from 'types/Props/TripsListProps';
import BasicTripsList from './BasicTripsList';
import FullTripsList from './FullTripsList';

const TripsList: React.FC<TripsListProps> = ({
  departure,
  destination,
  locations,
  basicTrips,
  trips,
  listClassName,
  listItemClassName,
  listSubheader,
  typographyProps,
  messageBoxProps,
}) => {
  return (
    (departure || destination) ?
      <List subheader={listSubheader} className={listClassName}>
        {departure && destination ?
          <FullTripsList
            locations={locations}
            trips={trips}
            listItemClassName={listItemClassName}
            typographyProps={typographyProps}
            messageBoxProps={messageBoxProps}
          /> :
          <BasicTripsList
            locations={locations}
            basicTrips={basicTrips}
            listItemClassName={listItemClassName}
            typographyProps={typographyProps}
            messageBoxProps={messageBoxProps}
          />
        }
      </List> :
      <Box {...messageBoxProps}>
        <Typography {...typographyProps}>
          <Box m={2} mt={3} color="text.disabled">Choose departure, destination or both to display trips</Box>
        </Typography>
      </Box>
  )
}

export default TripsList;