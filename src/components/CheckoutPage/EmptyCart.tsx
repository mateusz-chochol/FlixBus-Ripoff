import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as EmptyCartSvg } from 'svgs/empty_cart.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      height: "calc(100vh - 75px)",
      maxWidth: '100vw'
    },
    svg: {
      height: "50vh",
      pointerEvents: 'none'
    }
  })
);

const EmptyCart: React.FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Grid container className={classes.grid} justify='center'>
        <Grid item xs={12} container alignContent='center' justify='center'>
          <Box paddingX={5} paddingTop={5}>
            <Typography color='textSecondary' variant='h2' gutterBottom align='center'>
              Your cart is empty.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' paddingX={5}>
            <EmptyCartSvg className={classes.svg} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmptyCart;