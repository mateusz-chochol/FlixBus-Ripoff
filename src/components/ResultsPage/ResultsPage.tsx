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
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
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
  getTripsByDepartureAndDestinationIdsAsync,
} from 'redux/TripsSlice';
import { setTab } from 'redux/TabsSlice';
import ResultsPageProps from 'types/Props/ResultsPageProps';
import Location from 'types/Objects/Location';
import TripType from 'types/Objects/TripType';
import DepartureDestinationFormFull from 'components/DepartureDestinationForm/DepartureDestinationFormFull';
import FullTripsList from 'components/RouteMapPage/FullTripsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentGrid: {
      flexWrap: 'nowrap',
      height: "calc(100vh - 75px)",
      width: "100vw"
    },
    menuPaper: {
      height: "calc(100vh - 75px)",
    },
  }),
);
const ResultsPage: React.FC<ResultsPageProps> = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allLocations = useSelector(getAllLocations);
  const departureLocations = useSelector(getLocationsForDepartureTextField);
  const destinationLocations = useSelector(getLocationsForDestinationTextField);
  const trips = useSelector(getTrips);
  const { departureIdAsString, destinationIdAsString } = match.params;
  const [departureId, destinationId] = [parseInt(departureIdAsString), parseInt(destinationIdAsString)]
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<TripType>(TripType.OneWay);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [departureDate, setDepartureDate] = useState<Date | null>(moment().toDate());
  const [returnDate, setReturnDate] = useState<Date | null>(moment().add(1, 'days').toDate());
  const [hasSetup, setHasSetup] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setTab(false));
  }, [dispatch])

  useEffect(() => {
    if (!isNaN(departureId) && !isNaN(destinationId)) {
      dispatch(getLocationsByIdArrayAsync([departureId, destinationId]))
      dispatch(getTripsByDepartureAndDestinationIdsAsync({ departureId: departureId, destinationId: destinationId }))
    }
  }, [departureId, destinationId, departureIdAsString, destinationIdAsString, dispatch])

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

  return (
    <Paper square>
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
          <Grid
            item
            container
            direction='column'
            xs={2}
          >
            <Paper elevation={0} square className={classes.menuPaper}>
              <Typography variant='h4' align='center'>
                <Box>Sliders and such</Box>
              </Typography>
            </Paper>
          </Grid>
          <Box height='100%'>
            <Divider orientation='vertical' />
          </Box>
          <Grid
            item
            container
            direction='column'
            justify='flex-end'
            xs={10}
          >
            <Grid item>
              <Box paddingTop={2}>
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
            </Grid>
            <Divider />
            <Grid item>
              <Typography variant='h1' align='center'>
                <Box>Results page (work in progress)</Box>
              </Typography>
              {/* <FullTripsList
                locations={allLocations}
                trips={trips}
                isSmallScreen={true}
                handleFullTripsListItemClick={() => { }}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default ResultsPage;