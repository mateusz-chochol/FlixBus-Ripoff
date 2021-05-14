import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Hidden,
  withWidth,
  WithWidth,
  Divider,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as ServicesSvg } from 'svgs/services.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentGrid: {
      height: "calc(100vh - 75px)",
      maxWidth: '100vw'
    },
    paper: {
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
    fixedItem: {
      pointerEvents: 'none'
    },
  }),
);

const ServicesPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm';

  return (
    <Paper square className={classes.paper}>
      <Box paddingTop={2} paddingBottom={2}>
        <Grid container className={classes.parentGrid} alignItems='center' justify='center'>
          <Grid item xs={isSmallScreen ? 12 : 5}>
            <Box paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5}>
              <Typography variant='h4' gutterBottom>
                User
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                App allows to register a user via email and password and then log in as one. After logging in user grants access to changing their profile info, looking at their history and syncing carts between muttiple browsers and tabs.
              </Typography>
            </Box>
            <Box paddingX={3}>
              <Divider variant='middle' />
            </Box>
            <Box paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5}>
              <Typography variant='h4' gutterBottom>
                Searching
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                User can either use main page search bar to search for trips with given date and departure and destination places or they might use route map page to display all accessible locations and select them via clicking on map markers (or by using search box that behaves similary to the main page one)
              </Typography>
            </Box>
            <Box paddingX={3}>
              <Divider variant='middle' />
            </Box>
            <Box paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5}>
              <Typography variant='h4' gutterBottom>
                Main flow
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                After finding appropriate trips user can add them to their cart (which is going to be saved on their user profile granted that they are logged in) and from there by clicking the checkout button user can proceed to simulate seats reservation on the selected trips.
              </Typography>
            </Box>
            <Box paddingX={3}>
              <Divider variant='middle' />
            </Box>
            <Box paddingTop={3} paddingBottom={3} paddingLeft={5} paddingRight={5}>
              <Typography variant='h4' gutterBottom>
                Data
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                Website uses firebase as a backend service for both authentication and for storing any user data. If you can see error snackbars showing after trying to logged in it means that API keys have probably expired and the site cannot contact the backend.
              </Typography>
            </Box>
            <Hidden mdUp>
              <Box display='flex' justifyContent='center' paddingTop={3} paddingBottom={3} paddingRight={3}>
                <ServicesSvg width='95%' height='100%' />
              </Box>
            </Hidden>
          </Grid>
          <Hidden smDown>
            <Grid item xs={7}>
              <Box display='flex' position='fixed' top='15%' left='60%' className={classes.fixedItem}>
                <Typography variant='h1' color='textSecondary' gutterBottom>
                  Services
                </Typography>
              </Box>
              <Box display='flex' position='fixed' top='30%' width='55%' className={classes.fixedItem}>
                <ServicesSvg />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Paper>
  )
}

export default withWidth()(ServicesPage);