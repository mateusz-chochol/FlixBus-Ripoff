import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListSubheader,
  Button,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import { useDispatch } from 'react-redux';
import { emptyCartActionCreator } from 'redux/CartSlice';
import { useNotifications } from 'components/Misc/Notifications';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SummaryProps from 'types/Props/CheckoutPage/SummaryProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainBox: {
      height: "calc(100% - 75px)",
      width: "100%",
      position: "fixed",
      maxWidth: 'inherit',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    },
    list: {
      maxHeight: 'calc(65% - 75px)',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    },
    listSubheader: {
      backgroundColor: 'whitesmoke'
    },
  }),
);

const Summary: React.FC<SummaryProps> = ({ cart, locations, selectedCartTrip, setSelectedCartTrip }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showSuccess } = useNotifications();

  const handleProcceedToPaymentButtonClick = () => {
    history.push(routes.mainPage);

    dispatch(emptyCartActionCreator());
    showSuccess('Payment done and cart has been emptied');
  }

  return (
    <Box className={classes.mainBox}>
      <Box paddingBottom={3}>
        <Typography variant='h4'>Your order</Typography>
      </Box>
      <List
        className={classes.list}
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Trips ({cart.length}):
          </ListSubheader>}
      >
        {cart.map(({ trip, passengersCount }) => {
          return (
            <ListItem
              button
              onClick={() => setSelectedCartTrip({ trip, passengersCount })}
              selected={selectedCartTrip?.trip.id === trip.id}
              key={trip.id}
            >
              <Grid container direction='row'>
                <Grid
                  item
                  container
                  alignItems='flex-end'
                  justify='space-evenly'
                >
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
                  <ListItemText secondary={`${trip.price * passengersCount}$, ${trip.hour}, ${trip.tripDuration}h, ${trip.date}, ${passengersCount} seat(s)`} />
                </Grid>
              </Grid>
            </ListItem>
          )
        })}
      </List>
      <Divider variant='middle' />
      <Box paddingY={3}>
        <Typography variant='h4'>
          <Grid container justify='space-between'>
            <Grid item>
              Total:
            </Grid>
            <Grid item>
              <b>{cart.map(({ trip, passengersCount }) => trip.price * passengersCount).reduce((acc, cur) => acc + cur)}$</b>
            </Grid>
          </Grid>
        </Typography>
      </Box>
      <Box>
        <Button
          variant='contained'
          fullWidth
          color='primary'
          onClick={handleProcceedToPaymentButtonClick}
        >
          Proceed to payment
        </Button>
      </Box>
    </Box>
  )
}

export default Summary;