import React from 'react';
import {
  Box,
  ListItem,
  ListItemText,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FullTripsProps from 'types/Props/FullTripsProps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 0,
      width: '100%',
    },
  }),
);

const FullTripsList: React.FC<FullTripsProps> = ({
  locations,
  trips,
  isSmallScreen,
  listItemClassName,
  typographyProps,
  messageBoxProps,
  handleFullTripsListItemClick,
}) => {
  const classes = useStyles();

  return (
    <>
      {(trips.length > 0 ? trips.map(trip => (
        <React.Fragment key={trip.id}>
          <Divider orientation="vertical" flexItem />
          <ListItem button key={trip.id} className={listItemClassName} onClick={() => handleFullTripsListItemClick(trip)}>
            <Grid container className={classes.grid} direction='row'>
              <Grid item container className={classes.grid} alignItems='flex-end' justify={isSmallScreen ? 'space-evenly' : 'space-between'}>
                <Grid item>
                  <ListItemText primary={locations.find(location => location.id === trip.startLocationId)?.name} />
                </Grid>
                <Grid item>
                  <ArrowRightAltIcon />
                </Grid>
                <Grid item>
                  <ListItemText primary={locations.find(location => location.id === trip.endLocationId)?.name} />
                </Grid>
              </Grid>
              <Grid item>
                <ListItemText secondary={`${trip.date}, ${trip.price}$, seats: ${trip.seatsLeft}`} />
              </Grid>
            </Grid>
          </ListItem>
        </React.Fragment>
      )) :
        <Box {...messageBoxProps}>
          <Typography {...typographyProps}>
            <Box padding={2} color="text.disabled">Sorry, no trips found</Box>
          </Typography>
        </Box>
      )}
    </>
  )
}

export default FullTripsList;