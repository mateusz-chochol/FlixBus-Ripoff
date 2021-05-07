import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  Slider,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  ListItemIcon,
  FormControl,
  withWidth,
} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TuneIcon from '@material-ui/icons/Tune';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
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
import { setTab } from 'redux/TabsSlice';
import ResultsPageProps from 'types/Props/ResultsPageProps';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import Trip from 'types/Objects/Trip';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';
import DepartureDestinationFormSmall from 'components/DepartureDestinationForm/DepartureDestinationFormSmall';

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
    smallMenuPaper: {
      backgroundColor: "whitesmoke",
      width: "100%",
    },
    listsGrid: {
      flexWrap: 'nowrap'
    },
    listItem: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    list: {
      padding: 0,
      height: '100%',
      backgroundColor: theme.palette.background.paper
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
    filtersButton: {
      textTransform: 'none',
      display: 'block'
    },
    filtersDialog: {
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
    sortSelectInput: {
      whiteSpace: 'break-spaces',
    },
    sortSelectIcon: {
      minWidth: '25%',
    },
    sortSelectPopoverPaper: {
      width: '20%'
    },
    sortSelectGrid: {
      flexWrap: 'nowrap'
    }
  }),
);

const ResultsPage: React.FC<ResultsPageProps> = ({ match, width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm' || width === 'md';
  const { departureIdAsString, destinationIdAsString, departureDateAsString, returnDateAsString } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const trips = useSelector(getTrips);
  const returnTrips = useSelector(getReturnTrips);
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(returnDateAsString ? TripType.RoundTrip : TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment(departureDateAsString).isSameOrAfter(moment()) ?
    moment.utc(departureDateAsString).toDate() :
    moment().toDate()
  );
  const [returnDate, setReturnDate] = useState<Date | null>(returnDateAsString && moment(returnDateAsString).isSameOrAfter(departureDate) ?
    moment.utc(returnDateAsString).toDate() :
    moment(departureDate).add(1, 'days').toDate()
  );
  const [hasSetup, setHasSetup] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<number[]>([20, 80]);
  const [durationFilter, setDurationFilter] = useState<number[]>([0, 6]);
  const [departureHourFilter, setDepartureHourFilter] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [returnHourFilter, setReturnHourFilter] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [tripsToDisplay, setTripsToDisplay] = useState<Trip[]>(trips);
  const [returnTripsToDisplay, setReturnTripsToDisplay] = useState<Trip[]>(returnTrips);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
  const [sortBySetting, setSortBySetting] = useState<string>("Departure hour-increasing");

  const handleFullTripsListItemClick = (trip: Trip) => {
    history.push(routes.tripPage.replace(':tripId', trip.id.toString()));
  }

  const handleRemovePassenger = () => {
    if (passengersCount > 1) {
      setPassengersCount(passengersCount - 1);
    }
  }

  const handleAddPassenger = () => {
    if (passengersCount < 99) {
      setPassengersCount(passengersCount + 1);
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value !== undefined) {
      setSortBySetting(event.target.value as string);
    }
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

  useEffect(() => {
    dispatch(setTab(false));
  }, [dispatch])

  useEffect(() => {
    if (!isNaN(departureId) && !isNaN(destinationId)) {
      dispatch(getLocationsByIdArrayAsync([departureId, destinationId]))
      dispatch(getTripsByDepartureAndDestinationIdsAndDateAsync({ departureId: departureId, destinationId: destinationId, departureDate: moment.utc(departureDateAsString).toDate() }))

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

  useEffect(() => {
    if (!isSmallScreen) {
      setIsFiltersDialogOpen(false);
    }
  }, [isSmallScreen])

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
                  <Grid
                    item
                    container
                    direction='column'
                    justify='space-evenly'
                    className={classes.sortSelectGrid}
                  >
                    <Grid item >
                      <Box paddingTop={3}>
                        <Box paddingLeft={3} paddingRight={3}>
                          <Typography variant='h6'>
                            Sort by ({sortBySetting.split('-')[1]}):
                          </Typography>
                          <Box paddingTop={3} paddingBottom={3}>
                            <FormControl variant="outlined" size="small" fullWidth color='secondary'>
                              <Select
                                MenuProps={{
                                  PopoverClasses: {
                                    paper: isSmallScreen ? undefined : classes.sortSelectPopoverPaper
                                  }
                                }}
                                inputProps={{
                                  className: classes.sortSelectInput
                                }}
                                value={sortBySetting}
                                fullWidth
                                onChange={(event) => handleSelectChange(event)}
                              >
                                <ListSubheader>Increasing</ListSubheader>
                                <MenuItem value={"Price-increasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Price' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Duration-increasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Duration' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Departure hour-increasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <DirectionsCarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Departure hour' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Seats left-increasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <SupervisorAccountIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Seats left' />
                                  </ListItem>
                                </MenuItem>
                                <Divider variant="fullWidth" />
                                <ListSubheader>Decreasing</ListSubheader>
                                <MenuItem value={"Price-decreasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Price' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Duration-decreasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Duration' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Departure hour-decreasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <DirectionsCarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Departure hour' />
                                  </ListItem>
                                </MenuItem>
                                <MenuItem value={"Seats left-decreasing"}>
                                  <ListItem disableGutters>
                                    <ListItemIcon className={classes.sortSelectIcon}>
                                      <SupervisorAccountIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Seats left' />
                                  </ListItem>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                      <Box padding={3}>
                        <Typography variant='h6'>
                          Price range:
                        </Typography>
                        <Box paddingTop={6}>
                          <Slider
                            value={priceFilter}
                            onChange={(event, newValue) => setPriceFilter(newValue as number[])}
                            max={100}
                            min={0}
                            marks={[
                              {
                                value: 0,
                                label: '0$'
                              },
                              {
                                value: 100,
                                label: '100$'
                              }
                            ]}
                            valueLabelDisplay="on"
                            aria-labelledby="price slider"
                            color='secondary'
                          />
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                      <Box padding={3}>
                        <Typography variant='h6'>
                          Duration range:
                        </Typography>
                        <Box paddingTop={6}>
                          <Slider
                            value={durationFilter}
                            onChange={(event, newValue) => setDurationFilter(newValue as number[])}
                            max={10}
                            min={0}
                            marks={[
                              {
                                value: 0,
                                label: '0h'
                              },
                              {
                                value: 10,
                                label: '10h'
                              }
                            ]}
                            valueLabelDisplay="on"
                            aria-labelledby="duration slider"
                            color='secondary'
                          />
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                      <Box padding={3}>
                        <Typography variant='h6'>
                          Departure hour:
                        </Typography>
                        <Box paddingTop={3}>
                          <TimePicker
                            ampm={false}
                            value={departureHourFilter}
                            onChange={(newDate) => setDepartureHourFilter(newDate as Date)}
                            inputVariant='outlined'
                            color='secondary'
                            views={['hours', 'minutes']}
                            minutesStep={5}
                            fullWidth
                          />
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                      <Box padding={3}>
                        <Typography variant='h6'>
                          Return hour:
                        </Typography>
                        <Box paddingTop={3}>
                          <TimePicker
                            ampm={false}
                            value={returnHourFilter}
                            onChange={(newDate) => setReturnHourFilter(newDate as Date)}
                            inputVariant='outlined'
                            color='secondary'
                            views={['hours', 'minutes']}
                            minutesStep={5}
                            fullWidth
                          />
                        </Box>
                      </Box>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                      <Box paddingTop={3} paddingBottom={3}>
                        <Box paddingLeft={3} paddingRight={3}>
                          <Typography variant='h6'>
                            Passengers:
                          </Typography>
                        </Box>
                        <Box paddingTop={2} display='flex' flexWrap='noWrap' justifyContent='space-evenly' alignItems='center'>
                          <IconButton color='secondary' aria-label="remove passenger" onClick={handleRemovePassenger}>
                            <RemoveCircleIcon fontSize='large' />
                          </IconButton>
                          <Typography variant='h2'>{passengersCount}</Typography>
                          <IconButton color='secondary' aria-label="add passenger" onClick={handleAddPassenger}>
                            <AddCircleIcon fontSize='large' />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
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
                      numberOfPassengers={numberOfPassengers}
                      setNumberOfPassengers={setNumberOfPassengers}
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
                      numberOfPassengers={numberOfPassengers}
                      setNumberOfPassengers={setNumberOfPassengers}
                      tripType={tripType}
                      setTripType={setTripType}
                      departureLocations={departureLocations}
                      destinationLocations={destinationLocations}
                      fullWidth
                    />
                  </Box>
                </Hidden>
                <Hidden lgUp>
                  <Divider />
                  <Box display='flex' justifyContent='center'>
                    <Button className={classes.filtersButton} fullWidth variant="text" onClick={() => setIsFiltersDialogOpen(true)}>
                      <Box paddingTop={1} paddingLeft={4} paddingRight={4}>
                        <Grid container>
                          <Grid item xs={5}>
                            <Typography align='left'>Sorting by</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <KeyboardArrowRightIcon />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography align='right'>{sortBySetting.split('-')[0]}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={5}>
                            <Typography align='left'>Price</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <KeyboardArrowRightIcon />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography align='right'>{priceFilter[0]}$ - {priceFilter[1]}$</Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={5}>
                            <Typography align='left'>Duration</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <KeyboardArrowRightIcon />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography align='right'>{durationFilter[0]}h - {durationFilter[1]}h</Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={5}>
                            <Typography align='left'>Departure</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <KeyboardArrowRightIcon />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography align='right'>{moment(departureHourFilter).format('HH:mm')}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={5}>
                            <Typography align='left'>Passengers</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <KeyboardArrowRightIcon />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography align='right'>{passengersCount}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Button>
                    <Dialog open={isFiltersDialogOpen} onClose={() => setIsFiltersDialogOpen(false)} aria-labelledby="form-dialog-title">
                      <DialogTitle >
                        <Grid item xs={7}>
                          <Box display='flex' alignItems='center' justifyContent='space-evenly'>
                            <TuneIcon fontSize='large' />
                            <Typography variant='h4'>Filters</Typography>
                          </Box>
                        </Grid>
                      </DialogTitle>
                      <Divider variant='middle' />
                      <DialogContent className={classes.filtersDialog}>
                        <Grid
                          item
                          container
                          direction='column'
                          justify='space-evenly'
                          className={classes.sortSelectGrid}
                        >
                          <Grid item>
                            <Box paddingTop={3}>
                              <Box paddingLeft={3} paddingRight={3}>
                                <Typography variant='h6'>
                                  Sort by ({sortBySetting.split('-')[1]}):
                                </Typography>
                                <Box paddingTop={3} paddingBottom={3}>
                                  <FormControl variant="outlined" size="small" fullWidth color='secondary'>
                                    <Select
                                      MenuProps={{
                                        PopoverClasses: {
                                          paper: isSmallScreen ? undefined : classes.sortSelectPopoverPaper
                                        }
                                      }}
                                      inputProps={{
                                        className: classes.sortSelectInput
                                      }}
                                      value={sortBySetting}
                                      fullWidth
                                      onChange={(event) => handleSelectChange(event)}
                                    >
                                      <ListSubheader>Increasing</ListSubheader>
                                      <MenuItem value={"Price-increasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <AttachMoneyIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Price' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Duration-increasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <AccessTimeIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Duration' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Departure hour-increasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <DirectionsCarIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Departure hour' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Seats left-increasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <SupervisorAccountIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Seats left' />
                                        </ListItem>
                                      </MenuItem>
                                      <Divider variant="fullWidth" />
                                      <ListSubheader>Decreasing</ListSubheader>
                                      <MenuItem value={"Price-decreasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <AttachMoneyIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Price' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Duration-decreasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <AccessTimeIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Duration' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Departure hour-decreasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <DirectionsCarIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Departure hour' />
                                        </ListItem>
                                      </MenuItem>
                                      <MenuItem value={"Seats left-decreasing"}>
                                        <ListItem disableGutters>
                                          <ListItemIcon className={classes.sortSelectIcon}>
                                            <SupervisorAccountIcon />
                                          </ListItemIcon>
                                          <ListItemText primary='Seats left' />
                                        </ListItem>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                            </Box>
                            <Divider variant="middle" />
                          </Grid>
                          <Grid item>
                            <Box padding={3}>
                              <Typography variant='h6'>
                                Price range:
                              </Typography>
                              <Box paddingTop={6}>
                                <Slider
                                  value={priceFilter}
                                  onChange={(event, newValue) => setPriceFilter(newValue as number[])}
                                  max={100}
                                  min={0}
                                  marks={[
                                    {
                                      value: 0,
                                      label: '0$'
                                    },
                                    {
                                      value: 100,
                                      label: '100$'
                                    }
                                  ]}
                                  valueLabelDisplay="on"
                                  aria-labelledby="price slider"
                                  color='secondary'
                                />
                              </Box>
                            </Box>
                            <Divider variant="middle" />
                          </Grid>
                          <Grid item>
                            <Box padding={3}>
                              <Typography variant='h6'>
                                Duration range:
                              </Typography>
                              <Box paddingTop={6}>
                                <Slider
                                  value={durationFilter}
                                  onChange={(event, newValue) => setDurationFilter(newValue as number[])}
                                  max={10}
                                  min={0}
                                  marks={[
                                    {
                                      value: 0,
                                      label: '0h'
                                    },
                                    {
                                      value: 10,
                                      label: '10h'
                                    }
                                  ]}
                                  valueLabelDisplay="on"
                                  aria-labelledby="duration slider"
                                  color='secondary'
                                />
                              </Box>
                            </Box>
                            <Divider variant="middle" />
                          </Grid>
                          <Grid item>
                            <Box padding={3}>
                              <Typography variant='h6'>
                                Departure hour:
                              </Typography>
                              <Box paddingTop={3}>
                                <TimePicker
                                  ampm={false}
                                  value={departureHourFilter}
                                  onChange={(newDate) => setDepartureHourFilter(newDate as Date)}
                                  inputVariant='outlined'
                                  color='secondary'
                                  views={['hours', 'minutes']}
                                  minutesStep={5}
                                  fullWidth
                                />
                              </Box>
                            </Box>
                            <Divider variant="middle" />
                          </Grid>
                          <Grid item>
                            <Box padding={3}>
                              <Typography variant='h6'>
                                Return hour:
                              </Typography>
                              <Box paddingTop={3}>
                                <TimePicker
                                  ampm={false}
                                  value={returnHourFilter}
                                  onChange={(newDate) => setReturnHourFilter(newDate as Date)}
                                  inputVariant='outlined'
                                  color='secondary'
                                  views={['hours', 'minutes']}
                                  minutesStep={5}
                                  fullWidth
                                />
                              </Box>
                            </Box>
                            <Divider variant="middle" />
                          </Grid>
                          <Grid item>
                            <Box paddingTop={3}>
                              <Box paddingLeft={3} paddingRight={3}>
                                <Typography variant='h6'>
                                  Passengers:
                                </Typography>
                              </Box>
                              <Box paddingTop={2} display='flex' flexWrap='noWrap' justifyContent='space-evenly' alignItems='center'>
                                <IconButton color='secondary' aria-label="remove passenger" onClick={handleRemovePassenger}>
                                  <RemoveCircleIcon fontSize='large' />
                                </IconButton>
                                <Typography variant='h2'>{passengersCount}</Typography>
                                <IconButton color='secondary' aria-label="add passenger" onClick={handleAddPassenger}>
                                  <AddCircleIcon fontSize='large' />
                                </IconButton>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setIsFiltersDialogOpen(false)} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Hidden>
              </Paper>
            </Grid>
            <Divider />
            <Box paddingBottom={2}>
              <Grid item container className={classes.listsGrid}>
                <Grid item xs={tripType === TripType.OneWay ? 12 : 6}>
                  <List className={classes.list} subheader={<ListSubheader component="div">Departure trips</ListSubheader>}>
                    {departure?.id === departureId && destination?.id === destinationId && departureDateAsString === moment(departureDate).format('YYYY-MM-DD') ?
                      (tripsToDisplay.length > 0 ? tripsToDisplay.map(trip => (
                        <React.Fragment key={trip.id}>
                          <ListItem button className={isSmallScreen ? undefined : classes.listItem} key={trip.id} onClick={() => handleFullTripsListItemClick(trip)}>
                            <Grid container direction='row'>
                              <Grid item container alignItems='flex-end' justify='space-evenly'>
                                <Grid item>
                                  <ListItemText primary={allLocations.find(location => location.id === trip.startLocationId)?.name} />
                                </Grid>
                                <Grid item>
                                  <ArrowRightAltIcon />
                                </Grid>
                                <Grid item>
                                  <ListItemText primary={allLocations.find(location => location.id === trip.endLocationId)?.name} />
                                </Grid>
                              </Grid>
                              <Grid item>
                                <ListItemText secondary={`Date: ${trip.hour} - ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}, duration: ${trip.tripDuration}h`} />
                              </Grid>
                            </Grid>
                            <ListItemSecondaryAction>
                              <Tooltip title='Add to cart'>
                                <IconButton edge="end" aria-label="add to cart">
                                  <AddCircleIcon color='secondary' />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </React.Fragment>
                      )) :
                        <Box>
                          <Typography variant='h5' align='center'>
                            <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                              {departureDateAsString === moment(departureDate).format('YYYY-MM-DD') ?
                                `Sorry, no trips from ${departure.name} to ${destination.name} found on ${departureDateAsString}` :
                                "Press search to search for the results"
                              }
                            </Box>
                          </Typography>
                        </Box>
                      ) :
                      <Box>
                        <Typography variant='h5' align='center'>
                          <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                            {departure && destination ?
                              "Press search to search for the results" :
                              "Fill the forms above to search for the trips"
                            }
                          </Box>
                        </Typography>
                      </Box>
                    }
                  </List>
                </Grid>
                {tripType === TripType.RoundTrip &&
                  <>
                    <Grid item>
                      <Divider orientation='vertical' absolute className={classes.listsDivider} />
                    </Grid>
                    <Grid item xs={6}>
                      <List className={classes.list} subheader={<ListSubheader component="div">Return trips</ListSubheader>}>
                        {departure?.id === departureId && destination?.id === destinationId && returnDateAsString === moment(returnDate).format('YYYY-MM-DD') ?
                          (returnTripsToDisplay.length > 0 ? returnTripsToDisplay.map(trip => (
                            <React.Fragment key={trip.id}>
                              <ListItem button className={isSmallScreen ? undefined : classes.listItem} key={trip.id} onClick={() => handleFullTripsListItemClick(trip)}>
                                <Grid container direction='row'>
                                  <Grid item container alignItems='flex-end' justify='space-evenly'>
                                    <Grid item>
                                      <ListItemText primary={allLocations.find(location => location.id === trip.startLocationId)?.name} />
                                    </Grid>
                                    <Grid item>
                                      <ArrowRightAltIcon />
                                    </Grid>
                                    <Grid item>
                                      <ListItemText primary={allLocations.find(location => location.id === trip.endLocationId)?.name} />
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <ListItemText secondary={`Date: ${trip.hour} - ${trip.date}, price: ${trip.price}$, seats left: ${trip.seatsLeft}, duration: ${trip.tripDuration}h`} />
                                  </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                  <Tooltip title='Add to cart'>
                                    <IconButton edge="end" aria-label="add to cart">
                                      <AddCircleIcon color='secondary' />
                                    </IconButton>
                                  </Tooltip>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </React.Fragment>
                          )) :
                            <Box>
                              <Typography variant='h5' align='center'>
                                <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                                  {returnDateAsString ?
                                    returnDateAsString === moment(returnDate).format('YYYY-MM-DD') ?
                                      `Sorry, no trips from ${destination.name} to ${departure.name} found on ${returnDateAsString}` :
                                      "Press search to search for the results" :
                                    "Press search to search for the results"
                                  }
                                </Box>
                              </Typography>
                            </Box>
                          ) :
                          <Box>
                            <Typography variant='h5' align='center'>
                              <Box padding={isSmallScreen ? 2 : 8} color="text.disabled">
                                {departure && destination ?
                                  "Press search to search for the results" :
                                  "Fill the forms above to search for the trips"
                                }
                              </Box>
                            </Typography>
                          </Box>
                        }
                      </List>
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