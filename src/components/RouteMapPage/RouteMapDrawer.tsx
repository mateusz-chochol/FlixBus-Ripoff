import React, {
  useState,
  useRef,
} from 'react';
import {
  Box,
  Drawer,
  Toolbar,
  Grid,
  Divider,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
} from 'redux/LocationsSlice';
import { useNotifications } from 'components/Misc/Notifications';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import TripsList from './TripsList';
import RouteMapDrawerProps from 'types/Props/RouteMapPage/RouteMapDrawerProps';
import moment from 'moment';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: theme.zIndex.appBar - 1
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
  departureDate,
  setDepartureDate,
  tripsDestinations,
  trips,
  allLocations,
  handleTripsSummariesListItemClick,
  handleFullTripsListItemClick,
  isLoading,
  shouldDisplayLoadingScreen,
}) => {
  const classes = useStyles();
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;
  const [isDepartureDateWindowOpen, setIsDepartureDateWindowOpen] = useState<boolean>(false);

  const handleDepartureDateChange = (date: Date | null) => {
    if (moment(date).isBefore(moment(), 'day')) {
      setIsDepartureDateWindowOpen(false);
      showInfo('Departure date cannot be from the past.');
    }
    else {
      setDepartureDate(date);
    }
  }

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
              locations={allLocations}
              place={departure}
              setPlace={setDeparture}
              toDispatch={getDepartureLocationsBySubstringAsync}
              requestToCheck={'locations/getDepartureLocationsBySubstringAsync'}
              label="From"
              placeholder="Start from..."
              disableClearable={false}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <TripPlaceForm
              locations={allLocations}
              place={destination}
              setPlace={setDestination}
              toDispatch={getDestinationLocationsBySubstringAsync}
              requestToCheck={'locations/getDestinationLocationsBySubstringAsync'}
              shouldHideOptions={departure === undefined}
              label="To"
              placeholder="Finish in..."
              disableClearable={false}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <DatePicker
              label="Departure"
              value={departureDate}
              onChange={(date: Date | null) => handleDepartureDateChange(date)}
              color='secondary'
              inputVariant="outlined"
              open={isDepartureDateWindowOpen}
              onOpen={() => setIsDepartureDateWindowOpen(true)}
              onClose={() => setIsDepartureDateWindowOpen(false)}
              fullWidth
              inputProps={{
                "aria-label": 'departure date'
              }}
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
              <SearchButton
                departure={departure}
                destination={destination}
                departureDate={departureDate}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
      <TripsList
        departure={departure}
        destination={destination}
        locations={allLocations}
        tripsDestinations={tripsDestinations}
        trips={trips}
        isSmallScreen={false}
        listClassName={classes.list}
        typographyProps={{
          variant: 'h5',
        }}
        messageBoxProps={{
          height: '100%',
        }}
        handleTripsSummariesListItemClick={handleTripsSummariesListItemClick}
        handleFullTripsListItemClick={handleFullTripsListItemClick}
        isLoading={isLoading}
        shouldDisplayLoadingScreen={shouldDisplayLoadingScreen}
      />
    </Drawer>
  )
}

export default RouteMapDrawer;