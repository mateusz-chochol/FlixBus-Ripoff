import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Grid,
  Collapse
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TripWithTransactionListItem from 'types/Objects/TripWithTransactionListItem';
import TripsListProps from 'types/Props/TripsPage/TripsListProps';

const TripsList: React.FC<TripsListProps> = ({
  trips,
  transactions,
  locations,
  getTripIdsWithTransactions,
  title,
  emptyListMessage,
}) => {
  const [listOpenState, setListOpenState] = useState<TripWithTransactionListItem[]>([]);

  const handleListItemClick = (tripId: string) => {
    setListOpenState(listOpenState => listOpenState.map(listItem => {
      if (listItem.tripId === tripId) {
        return {
          transactionId: listItem.transactionId,
          tripId: listItem.tripId,
          open: !listItem.open,
        }
      }

      return listItem;
    }))
  }

  useEffect(() => {
    setListOpenState(getTripIdsWithTransactions().map(tripWithTransaction => {
      return {
        transactionId: tripWithTransaction.transactionId,
        tripId: tripWithTransaction.tripId,
        open: true,
      }
    }));
  }, [transactions, getTripIdsWithTransactions])

  if (trips.length > 0) {
    return (
      <Box minWidth='350px'>
        <Typography variant='h3' gutterBottom color='textSecondary' align='center'>{title}</Typography>
        <List>
          {trips.map(trip => {
            const listItem = listOpenState.find(listItem => listItem.tripId === trip.id);
            const isOpen = listItem?.open;
            const transaction = transactions.find(transaction => transaction.id === listItem?.transactionId);

            return (
              <Box key={trip.id}>
                <ListItem button onClick={() => handleListItemClick(trip.id)}>
                  <Grid
                    item
                    container
                    alignItems='center'
                    justify='space-between'
                  >
                    <Grid item>
                      <Typography variant='button' align='left'>{locations.find(location => location.id === trip.startLocationId)?.name}</Typography>
                    </Grid>
                    <Grid item>
                      <ArrowRightAltIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant='button' align='right'>{locations.find(location => location.id === trip.endLocationId)?.name}</Typography>
                    </Grid>
                    <Grid item>
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </Grid>
                  </Grid>
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <Box paddingBottom={1}>
                    <Typography color='textSecondary'>Departure date: <b>{trip.date}</b></Typography>
                    <Typography color='textSecondary'>Departure hour: <b>{trip.hour}</b></Typography>
                    <Typography color='textSecondary'>Trip duration: <b>{trip.tripDuration}h</b></Typography>
                    <Typography color='textSecondary'>Price per seat: <b>{trip.price}$</b></Typography>
                    {transaction &&
                      <>
                        <Typography color='textSecondary'>Seats: <b>{transaction.tripIds.find(tripId => tripId.tripId === trip.id)?.seats}</b></Typography>
                        <Typography color='textSecondary'>Trip id: <b>{trip.id}</b></Typography>
                        <Typography color='textSecondary'>Transaction id: <b>{transaction.id}</b></Typography>
                      </>
                    }
                  </Box>
                </Collapse>
              </Box>
            )
          })}
        </List>
      </Box>
    )
  }

  return (
    <Box paddingY={5}>
      <Typography variant='h4' gutterBottom color='textSecondary' align='center'>{emptyListMessage}</Typography>
    </Box>
  )
}

export default TripsList;