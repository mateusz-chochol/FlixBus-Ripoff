import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Hidden,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getCart } from 'redux/CartSlice';
import EmptyCart from './EmptyCart';

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
    }
  }),
);

const CheckoutPage: React.FC = () => {
  const classes = useStyles();
  const cart = useSelector(getCart);

  if (cart.length === 0) {
    return (
      <Paper square className={classes.paper}>
        <EmptyCart />
      </Paper>
    )
  }

  return (
    <Paper square className={classes.paper}>

    </Paper>
  )
}

export default CheckoutPage;