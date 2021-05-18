import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Paper,
  Divider,
  Grid,
  Hidden,
  withWidth,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import { useNotifications } from 'components/Misc/Notifications';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  getAllLocations,
  getLocationsByIdArrayAsync,
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
  getLocationsForDepartureTextField,
  getLocationsForDestinationTextField,
} from 'redux/LocationsSlice';
import {
  getTrips,
  getTripsByDepartureAndDestinationIdsAndDateAsync,
  getReturnTrips,
  getReturnTripsByReturnDateAsync,
  clearReturnTripsActionCreator,
} from 'redux/TripsSlice';
import { addToCartActionCreator } from 'redux/CartSlice';
import ResultsPageProps from 'types/Props/ResultsPage/ResultsPageProps';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import Trip from 'types/Objects/Trip';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';
import DepartureDestinationFormSmall from 'components/DepartureDestinationForm/DepartureDestinationFormSmall';
import FiltersMenu from './FiltersMenu';
import FiltersMobileSummary from './FiltersMobileSummary';
import TripsList from './TripsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
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
      height: "calc(100vh - 75px)",
    },
    bigMenuPaper: {
      height: "calc(100vh - 75px)",
      width: "100%",
      backgroundColor: "whitesmoke",
      position: "fixed",
      maxWidth: 'inherit',
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
    listsGrid: {
      flexWrap: 'nowrap'
    },
    formGrid: {
      zIndex: 3,
    },
    listsDivider: {
      position: 'fixed',
      left: 'auto',
      height: '100%',
      zIndex: 2,
    },
  }),
);

const ResultsPage: React.FC<ResultsPageProps> = ({ match, width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm' || width === 'md';
  const { departureIdAsString, destinationIdAsString, departureDateAsString, returnDateAsString } = match.params;
  const dispatch = useDispatch();
  const { showSuccess } = useNotifications();
  const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const trips = useSelector(getTrips);
  const returnTrips = useSelector(getReturnTrips);
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(returnDateAsString ? TripType.RoundTrip : TripType.OneWay);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment(departureDateAsString).isSameOrAfter(moment()) ?
    moment.utc(departureDateAsString).toDate() :
    moment().toDate()
  );
  const [returnDate, setReturnDate] = useState<Date | null>(returnDateAsString && moment(returnDateAsString).isSameOrAfter(departureDate) ?
    moment.utc(returnDateAsString).toDate() :
    moment(departureDate).add(1, 'days').toDate()
  );
  const [hasSetup, setHasSetup] = useState<boolean>(false);
  const [tripsToDisplay, setTripsToDisplay] = useState<Trip[]>(trips);
  const [returnTripsToDisplay, setReturnTripsToDisplay] = useState<Trip[]>(returnTrips);
  const [sortBySetting, setSortBySetting] = useState<string>("Departure hour-increasing");
  const [priceFilter, setPriceFilter] = useState<number[]>([20, 80]);
  const [durationFilter, setDurationFilter] = useState<number[]>([0, 6]);
  const [departureHourFilter, setDepartureHourFilter] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [returnHourFilter, setReturnHourFilter] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [passengersCount, setPassengersCount] = useState<number>(1);

  const handleAddToCartButtonClick = (trip: Trip) => {
    dispatch(addToCartActionCreator({ trip: trip, passengersCount: passengersCount }));
    showSuccess(`Trip has been added to your cart (id: ${trip.id}).`);
  }

  useEffect(() => {
    if (!isNaN(departureId) && !isNaN(destinationId)) {
      dispatch(getLocationsByIdArrayAsync([departureId, destinationId]))
      dispatch(getTripsByDepartureAndDestinationIdsAndDateAsync({
        departureId: departureId,
        destinationId: destinationId,
        departureDate: moment.utc(departureDateAsString).toDate(),
        shouldZeroLastProperties: true,
      }))

      if (returnDateAsString) {
        dispatch(getReturnTripsByReturnDateAsync({ departureId: departureId, destinationId: destinationId, returnDate: moment.utc(returnDateAsString).toDate() }))
      }
      else {
        dispatch(clearReturnTripsActionCreator());
      }
    }
  }, [departureId, destinationId, departureDateAsString, returnDateAsString, dispatch])

  useEffect(() => {
    if (!hasSetup) {
      const allLocationsIds = allLocations.map(location => location.id);

      if (allLocationsIds.includes(departureId) && allLocationsIds.includes(destinationId)) {
        setDeparture(allLocations.find(location => location.id === departureId));
        setDestination(allLocations.find(location => location.id === destinationId));
        setHasSetup(true);
      }
    }
  }, [departureId, destinationId, allLocations, hasSetup])

  useEffect(() => {
    if (departure) {
      dispatch(getDepartureLocationsBySubstringAsync(departure.name))
    }
    if (destination) {
      dispatch(getDestinationLocationsBySubstringAsync(destination.name))
    }
  }, [departure, destination, dispatch])

  useEffect(() => {
    const filterTrips = (tripsToFilter: Trip[]) => {
      return tripsToFilter.filter(trip =>
        trip.price <= priceFilter[1] && trip.price >= priceFilter[0] &&
        trip.tripDuration <= durationFilter[1] && trip.tripDuration >= durationFilter[0] &&
        trip.seatsLeft >= passengersCount
      )
    }

    const compareHours = (current: string, toCompare: string) => {
      const [currentHour, currentMinutes] = current.split(':');
      const [toCompareHour, toCompareMinutes] = toCompare.split(':');

      if (currentHour > toCompareHour) {
        return true;
      }

      if (currentHour === toCompareHour) {
        if (currentMinutes >= toCompareMinutes) {
          return true;
        }

        return false;
      }

      return false;
    }

    setTripsToDisplay(filterTrips(trips).filter(trip => compareHours(trip.hour, `${departureHourFilter.getHours()}:${departureHourFilter.getMinutes()}`)));
    setReturnTripsToDisplay(filterTrips(returnTrips).filter(trip => compareHours(trip.hour, `${returnHourFilter.getHours()}:${returnHourFilter.getMinutes()}`)));
  }, [priceFilter, durationFilter, departureHourFilter, returnHourFilter, passengersCount, trips, returnTrips])

  useEffect(() => {
    const sortTrips = (tripsToSort: Trip[], sortBy: string, factor: number) => {
      switch (sortBy) {
        case 'Price':
          return tripsToSort.slice().sort((a, b) => a.price > b.price ? 1 * factor : -1 * factor);
        case 'Duration':
          return tripsToSort.slice().sort((a, b) => a.tripDuration > b.tripDuration ? 1 * factor : -1 * factor);
        case 'Departure hour':
          return tripsToSort.slice().sort((a, b) => a.hour.split(':').join() > b.hour.split(':').join() ? 1 * factor : -1 * factor);
        case 'Seats left':
          return tripsToSort.slice().sort((a, b) => a.seatsLeft > b.seatsLeft ? 1 * factor : -1 * factor);
        default:
          return tripsToSort;
      }
    }

    const [sortBy, direction] = sortBySetting.split('-');

    if (tripsToDisplay.length > 1) {
      setTripsToDisplay(tripsToDisplay => sortTrips(tripsToDisplay, sortBy, direction === 'increasing' ? 1 : -1));
    }

    if (returnTripsToDisplay.length > 1) {
      setReturnTripsToDisplay(returnTripsToDisplay => sortTrips(returnTripsToDisplay, sortBy, direction === 'increasing' ? 1 : -1));
    }
  }, [sortBySetting, tripsToDisplay.length, returnTripsToDisplay.length, trips, returnTrips])

  return (
    <Paper square className={classes.paper}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Grid
          container
          className={classes.parentGrid}
          alignItems='flex-start'
        >
          <Hidden mdDown>
            <Grid
              item
              container
              direction='column'
              xs={2}
            >
              <Paper elevation={0} square className={classes.bigMenuPaper}>
                <Grid
                  item
                  container
                  direction='row'
                  justify='flex-end'
                  className={classes.parentGrid}
                >
                  <FiltersMenu
                    sortBySetting={sortBySetting}
                    setSortBySetting={setSortBySetting}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    durationFilter={durationFilter}
                    setDurationFilter={setDurationFilter}
                    departureHourFilter={departureHourFilter}
                    setDepartureHourFilter={setDepartureHourFilter}
                    returnHourFilter={returnHourFilter}
                    setReturnHourFilter={setReturnHourFilter}
                    passengersCount={passengersCount}
                    setPassengersCount={setPassengersCount}
                    displayReturnHour={tripType === TripType.RoundTrip}
                    isSmallScreen={isSmallScreen}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Hidden>
          <Grid
            item
            container
            direction='column'
            justify='flex-end'
            xs={isSmallScreen ? 12 : 10}
          >
            <Grid item className={classes.formGrid}>
              <Paper square elevation={0}>
                <Hidden smDown>
                  <Box paddingTop={2} color='white'>
                    <DepartureDestinationFormFull
                      departure={departure}
                      setDeparture={setDeparture}
                      destination={destination}
                      setDestination={setDestination}
                      departureDate={departureDate}
                      setDepartureDate={setDepartureDate}
                      returnDate={returnDate}
                      setReturnDate={setReturnDate}
                      tripType={tripType}
                      setTripType={setTripType}
                      departureLocations={departureLocations}
                      destinationLocations={destinationLocations}
                      fullWidth
                    />
                  </Box>
                </Hidden>
                <Hidden mdUp>
                  <Box paddingTop={2}>
                    <DepartureDestinationFormSmall
                      departure={departure}
                      setDeparture={setDeparture}
                      destination={destination}
                      setDestination={setDestination}
                      departureDate={departureDate}
                      setDepartureDate={setDepartureDate}
                      returnDate={returnDate}
                      setReturnDate={setReturnDate}
                      tripType={tripType}
                      setTripType={setTripType}
                      departureLocations={departureLocations}
                      destinationLocations={destinationLocations}
                      fullWidth
                    />
                  </Box>
                </Hidden>
                <Hidden lgUp>
                  <FiltersMobileSummary
                    sortBySetting={sortBySetting}
                    setSortBySetting={setSortBySetting}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    durationFilter={durationFilter}
                    setDurationFilter={setDurationFilter}
                    departureHourFilter={departureHourFilter}
                    setDepartureHourFilter={setDepartureHourFilter}
                    returnHourFilter={returnHourFilter}
                    setReturnHourFilter={setReturnHourFilter}
                    passengersCount={passengersCount}
                    setPassengersCount={setPassengersCount}
                    displayReturnHour={tripType === TripType.RoundTrip}
                    isSmallScreen={isSmallScreen}
                  />
                </Hidden>
              </Paper>
            </Grid>
            <Divider />
            <Box paddingBottom={2}>
              <Grid item container className={classes.listsGrid}>
                <Grid item xs={tripType === TripType.OneWay ? 12 : 6}>
                  <TripsList
                    title='Departure trips'
                    tripsToDisplay={tripsToDisplay}
                    allLocations={allLocations}
                    departure={departure}
                    destination={destination}
                    departureDate={departureDate}
                    departureDateAsString={departureDateAsString}
                    departureId={departureId}
                    destinationId={destinationId}
                    handleAddToCartButtonClick={handleAddToCartButtonClick}
                    isSmallScreen={isSmallScreen}
                  />
                </Grid>
                {tripType === TripType.RoundTrip &&
                  <>
                    <Grid item>
                      <Divider orientation='vertical' absolute className={classes.listsDivider} />
                    </Grid>
                    <Grid item xs={6}>
                      <TripsList
                        title='Return trips'
                        tripsToDisplay={returnTripsToDisplay}
                        allLocations={allLocations}
                        departure={destination}
                        destination={departure}
                        departureDate={returnDate}
                        departureDateAsString={returnDateAsString}
                        departureId={destinationId}
                        destinationId={departureId}
                        handleAddToCartButtonClick={handleAddToCartButtonClick}
                        isSmallScreen={isSmallScreen}
                      />
                    </Grid>
                  </>
                }
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default withWidth()(ResultsPage);