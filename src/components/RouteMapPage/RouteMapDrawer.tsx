import React from 'react';
import {
  Box,
  Drawer,
  Toolbar,
  Grid,
  Divider,
} from '@material-ui/core';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
} from 'redux/LocationsSlice';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import TripsList from './TripsList';
import RouteMapDrawerProps from 'types/Props/RouteMapDrawerProps';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: theme.zIndex.appBar - 1,
    },
    grid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
    list: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      }
    }
  }),
);

const RouteMapDrawer: React.FC<RouteMapDrawerProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  basicTrips,
  trips,
  allLocations,
  departureLocationsForTextFields,
  destinationLocationsForTextFields,
  isSmallScreen
}) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      <Toolbar />
      <Grid
        container
        direction='column'
        spacing={2}
        className={classes.grid}
      >
        <Grid item />
        <Grid item />
        <Grid item />
        <Grid item>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <TripPlaceForm
              locations={departureLocationsForTextFields}
              place={departure}
              setPlace={setDeparture}
              toDispatch={getDepartureLocationsBySubstringAsync}
              label="From"
              placeholder="Start from..."
              disableClearable={isSmallScreen}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <TripPlaceForm
              locations={destinationLocationsForTextFields}
              trips={basicTrips}
              place={destination}
              setPlace={setDestination}
              toDispatch={getDestinationLocationsBySubstringAsync}
              shouldHideOptions={departure === undefined}
              label="To"
              placeholder="Finish in..."
              disableClearable={isSmallScreen}
            />
          </Box>
        </Grid>
        <Grid
          item
          container
          spacing={1}
          className={classes.grid}
        >
          <Grid item xs={6}>
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
              <SwitchLocationsButton
                departure={departure}
                setDeparture={setDeparture}
                destination={destination}
                setDestination={setDestination}
                fontSize='large'
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' justifyContent='flex-start' alignItems='center'>
              <SearchButton departure={departure} destination={destination} />
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
      <TripsList
        departure={departure}
        destination={destination}
        locations={allLocations}
        basicTrips={basicTrips}
        trips={trips}
        isSmallScreen={isSmallScreen}
        listClassName={classes.list}
        typographyProps={{
          variant: 'h5',
        }}
        messageBoxProps={{
          height: '100%',
        }}
      />
    </Drawer>
  )
}

export default RouteMapDrawer;