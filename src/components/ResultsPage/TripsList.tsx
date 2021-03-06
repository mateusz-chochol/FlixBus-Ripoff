import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import { getCart } from 'redux/CartSlice';
import { useSelector } from 'react-redux';
import ResultsTripsListProps from 'types/Props/ResultsPage/ResultsTripsListProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    list: {
      padding: 0,
      height: '100%',
      backgroundColor: theme.palette.background.paper
    },
  }),
);

const TripsList: React.FC<ResultsTripsListProps> = ({
  title,
  tripsToDisplay,
  allLocations,
  departure,
  destination,
  departureDate,
  departureDateAsString,
  departureId,
  destinationId,
  handleAddToCartButtonClick,
  isSmallScreen
}) => {
  const classes = useStyles();
  const cart = useSelector(getCart);
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const tripsToDisplayWithourCartTrips = tripsToDisplay.filter(trip => !cart.map(({ trip }) => trip.id).includes(trip.id));

  const getNoResultsMessage = () => {
    if (!departure || !destination) {
      return "Fill the forms above to search for the trips";
    }

    if (departureDateAsString !== moment(departureDate).format('YYYY-MM-DD') || departure.id !== departureId || destination.id !== destinationId) {
      return "Press search to search for the results"
    }

    if (tripsToDisplayWithourCartTrips.length === 0) {
      if (tripsToDisplay.length === 0) {
        return `Sorry, no trips from ${departure.name} to ${destination.name} found on ${departureDateAsString}`
      }

      return `Sorry, no more trips from ${departure.name} to ${destination.name} found on ${departureDateAsString}`
    }
  }

  const getTitle = () => {
    return isReadyToRender ? `${title}: ${tripsToDisplayWithourCartTrips.length}` : title;
  }

  useEffect(() => {
    setIsReadyToRender(
      departure?.id === departureId &&
      destination?.id === destinationId &&
      departureDateAsString === moment(departureDate).format('YYYY-MM-DD') &&
      tripsToDisplayWithourCartTrips.length > 0
    )
  }, [departure?.id, destination?.id, departureDate, departureDateAsString, departureId, destinationId, tripsToDisplayWithourCartTrips.length])

  return (
    <List className={classes.list} subheader={<ListSubheader component="div">{getTitle()}</ListSubheader>}>
      {isReadyToRender ? tripsToDisplayWithourCartTrips.map(trip => (
        <React.Fragment key={trip.id}>
          <ListItem className={isSmallScreen ? undefined : classes.listItem} key={trip.id}>
            <Grid container direction='row'>
              <Grid
                item
                container
                alignItems='flex-end'
                justify='space-evenly'
              >
                <Grid item>
                  <ListItemText primary={allLocations.find(location => location.id === trip.startLocationId)?.name} />
                </Grid>
                <Grid item>
                  <ArrowRightAltIcon />
                </Grid>
                <Grid item>
                  <ListItemText primary={allLocations.find(location => location.id === trip.endLocationId)?.name} />
                </Grid>
              </Grid>
              <Grid item>
                <ListItemText secondary={
                  <Typography variant='body1' color='textSecondary'>
                    Departure hour: <b>{trip.hour}</b>, price: <b>{trip.price}$</b>, seats left: {trip.seatsLeft}, duration: {trip.tripDuration}h
                  </Typography>}
                />
              </Grid>
            </Grid>
            <ListItemSecondaryAction>
              <Tooltip title='Add to cart'>
                <IconButton edge="end" aria-label="add to cart" onClick={() => handleAddToCartButtonClick(trip)}>
                  <AddCircleIcon color='secondary' />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      )) :
        <Box>
          <Typography variant='h5' align='center'>
            <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
              {getNoResultsMessage()}
            </Box>
          </Typography>
        </Box>
      }
    </List>
  );
}

export default TripsList;