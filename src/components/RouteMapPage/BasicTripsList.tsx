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
  isSmallScreen,
  listItemClassName,
  typographyProps,
  messageBoxProps,
  handleBasicTripsListItemClick
}) => {
  const classes = useStyles();

  return (
    <>
      {basicTrips.length > 0 ? basicTrips.map(trip => (
        <React.Fragment key={trip.id}>
          <Divider orientation="vertical" flexItem />
          <ListItem button key={trip.id} className={listItemClassName} onClick={() => handleBasicTripsListItemClick(trip)}>
            <Grid container className={classes.grid} direction='row'>
              <Grid item container className={classes.grid} alignItems='flex-end' justify={isSmallScreen ? 'space-evenly' : 'space-between'}>
                <Grid item xs={isSmallScreen ? undefined : 4}>
                  <ListItemText primary={locations.find(location => location.id === trip.startLocationId)?.name} />
                </Grid>
                <Grid item xs={2}>
                  <ArrowRightAltIcon />
                </Grid>
                <Grid item xs={isSmallScreen ? undefined : 4}>
                  <ListItemText primary={locations.find(location => location.id === trip.endLocationId)?.name} />
                </Grid>
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
      }
    </>
  )
}

export default BasicTripsList;