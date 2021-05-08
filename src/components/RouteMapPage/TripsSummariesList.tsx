import React, {
  useState,
  useEffect,
} from 'react';
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
import TripsSummariesListProps from 'types/Props/TripsSummariesListProps';
import TripSummary from 'types/Objects/TripSummary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
  }),
);

const TripsSummariesList: React.FC<TripsSummariesListProps> = ({
  departure,
  locations,
  tripsDestinations,
  isSmallScreen,
  listItemClassName,
  typographyProps,
  messageBoxProps,
  handleTripsSummariesListItemClick
}) => {
  const classes = useStyles();
  const [tripsSummary, setTripsSummary] = useState<TripSummary[]>([]);

  useEffect(() => {
    const endLocationsIds = tripsDestinations.map(trip => trip.endLocationId)

    const uniqueEndLocationsIds = Array.from(new Set(endLocationsIds));

    let summaries = uniqueEndLocationsIds.map(endLocationId => {
      return {
        endLocationId: endLocationId,
        count: endLocationsIds.filter(id => id === endLocationId).length,
      }
    })

    setTripsSummary(summaries)
  }, [tripsDestinations])

  return (
    <>
      {tripsSummary.length > 0 ? tripsSummary.map(summary => (
        <React.Fragment key={summary.endLocationId}>
          <Divider orientation="vertical" flexItem />
          <ListItem button key={summary.endLocationId} className={listItemClassName} onClick={() => handleTripsSummariesListItemClick(summary.endLocationId)}>
            <Grid container className={classes.grid} direction='row'>
              <Grid item container className={classes.grid} alignItems='flex-end' justify={isSmallScreen ? 'space-evenly' : 'space-between'}>
                <Grid item xs={isSmallScreen ? undefined : 4}>
                  <ListItemText primary={departure?.name} />
                </Grid>
                <Grid item xs={2}>
                  <ArrowRightAltIcon />
                </Grid>
                <Grid item xs={isSmallScreen ? undefined : 4}>
                  <ListItemText primary={locations.find(location => location.id === summary.endLocationId)?.name} />
                </Grid>
                <Grid item>
                  <ListItemText secondary={`Available trips: ${summary.count}`} />
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

export default TripsSummariesList;