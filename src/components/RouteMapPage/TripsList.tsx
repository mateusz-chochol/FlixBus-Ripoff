import React from 'react';
import {
  Box,
  List,
  Typography,
  ListSubheader,
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
  isSmallScreen,
  listClassName,
  listItemClassName,
  listSubheader,
  typographyProps,
  messageBoxProps,
  handleBasicTripsListItemClick,
  handleFullTripsListItemClick,
}) => {
  return (
    <List subheader={<ListSubheader>{listSubheader}</ListSubheader>} className={listClassName}>
      {departure || destination ?
        (departure && destination ?
          <FullTripsList
            locations={locations}
            trips={trips}
            isSmallScreen={isSmallScreen}
            listItemClassName={listItemClassName}
            typographyProps={typographyProps}
            messageBoxProps={messageBoxProps}
            handleFullTripsListItemClick={handleFullTripsListItemClick}
          /> :
          <BasicTripsList
            locations={locations}
            basicTrips={basicTrips}
            isSmallScreen={isSmallScreen}
            listItemClassName={listItemClassName}
            typographyProps={typographyProps}
            messageBoxProps={messageBoxProps}
            handleBasicTripsListItemClick={handleBasicTripsListItemClick}
          />
        ) :
        <Box {...messageBoxProps}>
          <Typography {...typographyProps}>
            <Box padding={2} color="text.disabled">Choose departure, destination or both to display trips</Box>
          </Typography>
        </Box>
      }
    </List>
  )
}

export default TripsList;