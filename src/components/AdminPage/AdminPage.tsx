import React from 'react';
import {
  Paper,
  Box,
  Hidden,
  Divider,
  Grid,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import LocationsForm from './LocationsForm';
import TripsForm from './TripsForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: "calc(90vh - 75px)",
      width: "90vw",
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
    paperBackground: {
      height: "calc(100vh - 75px)",
      width: "100vw",
      backgroundColor: 'whitesmoke'
    },
    paperMobile: {
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
      }
    },
    parentGrid: {
      flexWrap: 'nowrap'
    },
  }),
);

const AdminPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperBackground} square elevation={0}>
      <Box
        height='calc(100vh - 75px)'
        width='100vw'
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='relative'
      >
        <Hidden smDown>
          <Paper className={classes.paper} elevation={4}>
            <Grid className={classes.parentGrid} container>
              <Grid item xs={6}>
                <LocationsForm />
              </Grid>
              <Grid item xs={6}>
                <TripsForm />
              </Grid>
            </Grid>
          </Paper>
        </Hidden>
        <Hidden mdUp>
          <Paper className={classes.paperMobile} elevation={0} square>
            <Grid className={classes.parentGrid} container direction='column'>
              <Grid item xs={12}>
                <LocationsForm />
              </Grid>
              <Box paddingBottom={2}>
                <Divider />
              </Box>
              <Grid item xs={12}>
                <Box paddingBottom={4}>
                  <TripsForm />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Hidden>
      </Box>
    </Paper>
  )
}

export default AdminPage;