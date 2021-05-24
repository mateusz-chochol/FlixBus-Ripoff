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
  Collapse,
  Divider
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TripIdWithTransactionIdListItem from 'types/Objects/TripIdWithTransactionIdListItem';
import TripsListProps from 'types/Props/TripsPage/TripsListProps';

const TripsList: React.FC<TripsListProps> = ({
  list,
  locations,
  title,
  emptyListMessage,
}) => {
  const [listOpenState, setListOpenState] = useState<TripIdWithTransactionIdListItem[]>([]);

  const handleListItemClick = (transactionId: string, tripId?: string) => {
    setListOpenState(listOpenState => listOpenState.map(listItem => {
      if (listItem.tripId === tripId && listItem.transactionId === transactionId) {
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
    setListOpenState(list.map(tripWithTransaction => {
      return {
        transactionId: tripWithTransaction.transaction.id,
        tripId: tripWithTransaction.trip?.id,
        open: true,
      }
    }));
  }, [list])

  if (list.length > 0) {
    return (
      <Box width='100%'>
        <Typography variant='h3' gutterBottom color='textSecondary' align='center'>{title}</Typography>
        <List>
          {list.map(tripWithTransaction => {
            const listItem = listOpenState.find(listItem => listItem.transactionId === tripWithTransaction.transaction.id && listItem.tripId === tripWithTransaction.trip?.id);
            const isOpen = listItem?.open;
            const seats = tripWithTransaction.transaction.tripIds.find(tripId => tripId.tripId === tripWithTransaction.trip?.id)?.seats;

            return (
              <Box key={`${tripWithTransaction.trip?.id}_${tripWithTransaction.transaction.id}`}>
                <ListItem button onClick={() => handleListItemClick(tripWithTransaction.transaction.id, tripWithTransaction.trip?.id)}>
                  <Grid
                    item
                    container
                    alignItems='center'
                    justify='space-between'
                  >
                    <Grid item>
                      <Typography variant='button' align='left'>{locations.find(location => location.id === tripWithTransaction.trip?.startLocationId)?.name}</Typography>
                    </Grid>
                    <Grid item>
                      <ArrowRightAltIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant='button' align='right'>{locations.find(location => location.id === tripWithTransaction.trip?.endLocationId)?.name}</Typography>
                    </Grid>
                    <Grid item>
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </Grid>
                  </Grid>
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <Box paddingBottom={1} paddingLeft={4}>
                    <Typography color='textSecondary'>Departure date: <b>{tripWithTransaction.trip?.date}</b></Typography>
                    <Typography color='textSecondary'>Departure hour: <b>{tripWithTransaction.trip?.hour}</b></Typography>
                    <Typography color='textSecondary'>Trip duration: <b>{tripWithTransaction.trip?.tripDuration}h</b></Typography>
                    <Typography color='textSecondary'>Price per seat: <b>{tripWithTransaction.trip?.price}$</b></Typography>
                    <Typography color='textSecondary'>Seats: <b>{seats}</b></Typography>
                    <Typography color='textSecondary'>Total price: <b>{seats && tripWithTransaction.trip?.price && seats * tripWithTransaction.trip?.price}$</b></Typography>
                    <Typography color='textSecondary'>Trip id: <b>{tripWithTransaction.trip?.id}</b></Typography>
                    <Typography color='textSecondary'>Transaction id: <b>{tripWithTransaction.transaction.id}</b></Typography>
                  </Box>
                  <Divider />
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