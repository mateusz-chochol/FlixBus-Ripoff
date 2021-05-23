import React from 'react';
import {
  Paper,
  Box,
  Hidden,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as TripsSvg } from 'svgs/trips.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: "calc(100vh - 75px)",
      width: "100vw",
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
  }),
);

const TripsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Box position='relative'>
      <Paper className={classes.paper} square elevation={0}>
        <Hidden smDown>
          <Box position='absolute' right='5%' top='12%'>
            <Box padding={3}>
              <Typography variant='h1' color='textSecondary'>
                Trips history
              </Typography>
            </Box>
            <TripsSvg />
          </Box>
        </Hidden>
      </Paper>
    </Box>
  )
}

export default TripsPage;