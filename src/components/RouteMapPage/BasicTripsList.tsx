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
import BasicTripsProps from 'types/Props/BasicTripsProps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
  }),
);

const BasicTripsList: React.FC<BasicTripsProps> = ({
  locations,
  basicTrips,
  listItemClassName,
  typographyProps,
  messageBoxProps,
}) => {
  const classes = useStyles();

  return (
    <>
      {basicTrips.length > 0 ? basicTrips.map(trip => (
        <ListItem button key={trip.id} className={listItemClassName}>
          <Grid container className={classes.grid} direction='column'>
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
          </Grid>
        </ListItem>
      )) :
        <Box {...messageBoxProps}>
          <Typography {...typographyProps}>
            <Box m={2} mt={3} color="text.disabled">Sorry, no trips found</Box>
          </Typography>
        </Box>
      }
    </>
  )
}

export default BasicTripsList;