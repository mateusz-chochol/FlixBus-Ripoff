import React from 'react';
import {
  Box,
  ListItem,
  ListItemText,
  Grid,
  Typography,
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
      paddingTop: 4,
    },
  }),
);

const FullTripsList: React.FC<FullTripsProps> = ({
  locations,
  trips,
  listItemClassName,
  typographyProps,
  messageBoxProps,
}) => {
  const classes = useStyles();

  return (
    <>
      {(trips.length > 0 ? trips.map(trip => (
        <ListItem button key={trip.id} className={listItemClassName}>
          <Grid container className={classes.grid} direction='row'>
            <Grid item container className={classes.grid} alignItems='flex-end' justify='space-around'>
              <Grid item xs={5}>
                <ListItemText primary={locations.find(location => location.id === trip.startLocationId)?.name} />
              </Grid>
              <Grid item xs={2}>
                <ArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary={locations.find(location => location.id === trip.endLocationId)?.name} />
              </Grid>
            </Grid>
            <Grid item>
              <ListItemText secondary={`Date: ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}`} />
            </Grid>
          </Grid>
        </ListItem>
      )) :
        <Box {...messageBoxProps}>
          <Typography {...typographyProps}>
            <Box m={2} mt={3} color="text.disabled">Sorry, no trips found</Box>
          </Typography>
        </Box>)
      }
    </>
  )
}

export default FullTripsList;