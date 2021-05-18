import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Paper,
  Grid,
  Hidden,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { getCart } from 'redux/CartSlice';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import PassengersForTrip from 'types/Objects/PassengersForTrip';
import CartTrip from 'types/Objects/CartTrip';
import EmptyCart from './EmptyCart';
import Summary from './Summary';
import PassengersCard from './PassengersCard';
import ContactCard from './ContactCard';
import PaymentCard from './PaymentCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      minHeight: 'calc(100vh - 75px)',
      width: '100vw',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      backgroundColor: 'whitesmoke'
    },
    summaryBox: {
      height: "calc(100vh - 75px)",
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
  }),
);

const CheckoutPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const locations = useSelector(getAllLocations);
  const [selectedCartTrip, setSelectedCartTrip] = useState<CartTrip>();
  const [passengersForTrips, setPassengersForTrips] = useState<PassengersForTrip[]>(cart.map(({ trip, passengersCount }) => {
    return {
      cartTrip: {
        trip: trip,
        passengersCount: passengersCount
      },
      passengers: Array.from(new Array(passengersCount), (x, i) => i).map(index => {
        return {
          index: index,
          firstName: '',
          lastName: '',
        }
      })
    }
  }));

  useEffect(() => {
    dispatch(getLocationsByIdArrayAsync(cart.map(({ trip }) => trip.id)));
  }, [cart, dispatch])

  useEffect(() => {
    if (cart.length > 0) {
      setSelectedCartTrip(cart[0]);
    }
  }, [cart])

  if (cart.length === 0) {
    return (
      <Paper square className={classes.paper}>
        <EmptyCart />
      </Paper>
    )
  }

  return (
    <Paper square className={classes.paper}>
      <Hidden smDown>
        <Box position='relative' paddingTop={4}>
          <Grid container>
            <Grid item xs={2} />
            <Grid item container xs={6}>
              <Grid item xs={11}>
                <Box paddingY={2}>
                  <PassengersCard
                    selectedCartTrip={selectedCartTrip}
                    passengersForTrips={passengersForTrips}
                    setPassengersForTrips={setPassengersForTrips}
                  />
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Box paddingY={2}>
                  <ContactCard />
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Box paddingY={2}>
                  <PaymentCard />
                </Box>
              </Grid>
            </Grid>
            <Grid item container xs={3}>
              <Box className={classes.summaryBox}>
                <Summary cart={cart} locations={locations} selectedCartTrip={selectedCartTrip} setSelectedCartTrip={setSelectedCartTrip} />
              </Box>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Box>
      </Hidden>
    </Paper>
  )
}

export default CheckoutPage;