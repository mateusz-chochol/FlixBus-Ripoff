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
import {
  addTransaction,
  getTransactionsByUserId
} from 'redux/TransactionsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import { useAuth } from 'contexts/AuthContext';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SummaryProps from 'types/Props/CheckoutPage/SummaryProps';
import CartTrip from 'types/Objects/CartTrip';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Summary: React.FC<SummaryProps> = ({
  cart,
  locations,
  selectedCartTrip,
  setSelectedCartTrip,
  passengersForTrips,
  mail,
  phoneNumber,
  setErrors
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useAuth();
  const { showSuccess, showInfo, showError } = useNotifications();

  const handleProceedToPaymentButtonClick = async () => {
    const passengersNames = passengersForTrips
      .map(passengersForTrip => passengersForTrip.passengers
        .map(passenger => [passenger.firstName, passenger.lastName]))
      .flat(2);

    if (mail === '' || phoneNumber === '' || passengersNames.some(name => name === '')) {
      if (passengersNames.some(name => name === '')) {
        const badTrip = passengersForTrips.find(passengersForTrip => passengersForTrip.passengers
          .map(passenger => [passenger.firstName, passenger.lastName]).flat().includes(''));

        if (badTrip) {
          setSelectedCartTrip(badTrip.cartTrip);
        }
      }

      return showInfo('All fields must be filled out before proceeding further.');
    }

    const arePassengersFormsCorrect = !passengersNames.some(name => name.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/) === null);
    const isMailCorrect = mail.match(/^(.*)+@(.*)+\.[a-zA-Z]+$/) !== null;
    const isPhoneNumberCorrect = phoneNumber.match(/^[0-9]{9}$|^\+?[0-9]{11}$/) !== null;

    if (arePassengersFormsCorrect && isMailCorrect && isPhoneNumberCorrect) {
      if (currentUser) {
        dispatch(getTransactionsByUserId(currentUser.uid));
      }

      const tripPrice = passengersForTrips.map(passengersForTrip => passengersForTrip.cartTrip.trip.price * passengersForTrip.cartTrip.passengersCount).reduce((acc, cur) => acc + cur);

      dispatch(addTransaction({
        date: moment().format('YYYY-MM-DD'),
        price: tripPrice,
        tripIds: passengersForTrips.map(passengersForTrip => {
          return {
            tripId: passengersForTrip.cartTrip.trip.id,
            seats: passengersForTrip.cartTrip.passengersCount
          }
        }),
        userId: currentUser ? currentUser.uid : '',
        email: mail
      }))

      if (currentUser && setCurrentUser) {
        setCurrentUser({
          ...currentUser,
          balance: currentUser.balance - tripPrice,
        })
      }

      dispatch(emptyCartActionCreator());
      showSuccess('Payment done.');

      history.push(routes.mainPage);
    }

    if (!arePassengersFormsCorrect) {
      const badName = passengersNames.find(name => name.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/) === null);

      if (badName) {
        const badTrip = passengersForTrips.find(passengersForTrip => passengersForTrip.passengers
          .map(passenger => [passenger.firstName, passenger.lastName]).flat().includes(badName));

        if (badTrip) {
          setSelectedCartTrip(badTrip.cartTrip);
        }
      }

      setErrors(errors => errors.concat('passengers'));
      showError("First and last names can contain only letters.");
    }

    if (!isMailCorrect) {
      setErrors(errors => errors.concat('contact'));
      showError("Incorrect email.");
    }

    if (!isPhoneNumberCorrect) {
      setErrors(errors => errors.concat('contact'));
      showError("Incorrect phone number.");
    }
  }

  const handleListItemClick = (cartTrip: CartTrip) => {
    setSelectedCartTrip(cartTrip);

    if (cartTrip.trip.id !== selectedCartTrip?.trip.id) {
      setErrors(errors => errors.filter(error => error !== 'passengers'));
    }
  }

  return (
    <>
      <Box paddingBottom={3}>
        <Typography variant='h4'>Your order</Typography>
      </Box>
      <List
        className={classes.list}
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Trips ({cart.length}):
          </ListSubheader>
        }
      >
        {cart.map(({ trip, passengersCount }) => {
          return (
            <ListItem
              button
              onClick={() => handleListItemClick({ trip, passengersCount })}
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
                  <ListItemText secondary={
                    <Typography variant='body1' color='textSecondary'>
                      {trip.price * passengersCount}$, <b>{trip.hour}</b>, {trip.tripDuration}h, {trip.date}, <b>{passengersCount} seat(s)</b>`
                    </Typography>}
                  />
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
          onClick={async () => await handleProceedToPaymentButtonClick()}
        >
          Proceed to payment
        </Button>
      </Box>
    </>
  )
}

export default Summary;