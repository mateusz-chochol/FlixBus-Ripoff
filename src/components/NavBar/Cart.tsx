import React, {
  useState,
  useEffect,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Badge,
  Popper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Tooltip,
  Grid,
  Typography,
  Grow,
  Paper,
  ClickAwayListener
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  getCart,
  removeFromCartActionCreator,
} from 'redux/CartSlice';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
} from 'redux/LocationsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import Trip from 'types/Objects/Trip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      maxHeight: '40vh',
      position: 'relative',
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
    emptyCartInfo: {
      padding: theme.spacing(2),
    },
  }),
);

const Cart: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const locations = useSelector(getAllLocations);
  const { showSuccess } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleRemoveFromCartButtonClick = (trip: Trip) => {
    dispatch(removeFromCartActionCreator(trip));
    showSuccess(`Trip has been removed from your cart (id: ${trip.id})`)
  }

  const handleCheckoutButtonClick = () => {
    history.push(routes.checkoutPage);
    setAnchorEl(null);
  }

  useEffect(() => {
    dispatch(getLocationsByIdArrayAsync(cart.map(cartTrip => cartTrip.trip.id)));
  }, [cart, dispatch])

  return (
    <Box display='flex' justifyContent='flex-end'>
      <IconButton color="inherit" onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
        <Badge badgeContent={cart.length} color="secondary">
          <Box display='flex' color={cart.length === 0 ? 'rgba(255, 255, 255, 0.65)' : 'white'}>
            <ShoppingCartIcon />
          </Box>
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        disablePortal
        transition
        placement='bottom'
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)} mouseEvent='onMouseUp'>
                {cart.length > 0 ?
                  <Box>
                    <List className={classes.list}>
                      {cart.map(({ trip, passengersCount }) => {
                        return (
                          <ListItem key={trip.id}>
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
                                <ListItemText secondary={`${trip.price * passengersCount}$, ${trip.hour}, ${trip.date}, ${passengersCount} seat(s)`} />
                              </Grid>
                            </Grid>
                            <ListItemSecondaryAction>
                              <Tooltip title='Remove from cart'>
                                <IconButton edge="end" aria-label="remove from cart" onClick={() => handleRemoveFromCartButtonClick(trip)}>
                                  <RemoveCircleIcon color='secondary' />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )
                      })}
                    </List>
                    <Divider />
                    <Button fullWidth color='secondary' onClick={handleCheckoutButtonClick}>
                      Checkout (total: {cart.map(({ trip, passengersCount }) => trip.price * passengersCount).reduce((accelerator, current) => accelerator + current)}$)
                    </Button>
                  </Box> :
                  <Box color='text.secondary'>
                    <Typography className={classes.emptyCartInfo}>Your cart is empty.</Typography>
                  </Box>
                }
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box >
  )
}

export default Cart;