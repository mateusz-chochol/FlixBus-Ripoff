import React from 'react';
import {
  Box,
  List,
  Typography,
  ListSubheader,
} from '@material-ui/core';
import MapTripsListProps from 'types/Props/RouteMapPage/MapTripsListProps';
import TripsSummariesList from './TripsSummariesList';
import FullTripsList from './FullTripsList';

const TripsList: React.FC<MapTripsListProps> = ({
  departure,
  destination,
  locations,
  tripsDestinations,
  trips,
  isSmallScreen,
  listClassName,
  listItemClassName,
  listSubheader,
  typographyProps,
  messageBoxProps,
  handleTripsSummariesListItemClick,
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
          <TripsSummariesList
            departure={departure}
            locations={locations}
            tripsDestinations={tripsDestinations}
            isSmallScreen={isSmallScreen}
            listItemClassName={listItemClassName}
            typographyProps={typographyProps}
            messageBoxProps={messageBoxProps}
            handleTripsSummariesListItemClick={handleTripsSummariesListItemClick}
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