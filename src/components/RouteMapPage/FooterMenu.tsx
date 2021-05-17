import React, {
  useState,
  useRef,
} from 'react';
import {
  Box,
  Grid,
  Paper,
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
import FooterMenuProps from 'types/Props/RouteMapPage/FooterMenuProps';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerPaper: {
      height: '100%'
    },
    footerGrid: {
      height: '100%',
      padding: 0
    },
    formsGrid: {
      margin: 0,
      width: '100%',
      paddingTop: 4,
    },
  }),
);

const FooterMenu: React.FC<FooterMenuProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  departureDate,
  setDepartureDate,
  allLocations,
  footerMenuHeight,
}) => {
  const classes = useStyles();
  const notificationsFunctionsRef = useRef(useNotifications());
  const { showInfo } = notificationsFunctionsRef.current;
  const [isDepartureDateWindowOpen, setIsDepartureDateWindowOpen] = useState<boolean>(false);

  const handleDepartureDateChange = (date: Date | null) => {
    if (moment(date).isBefore(moment(), 'day')) {
      setIsDepartureDateWindowOpen(false);
      showInfo('Departure date cannot be from the past');
    }
    else {
      setDepartureDate(date);
    }
  }

  return (
    <Box width='100vw' height={footerMenuHeight}>
      <Paper square className={classes.footerPaper}>
        <Grid
          container
          direction='row'
          className={classes.footerGrid}
        >
          <Grid
            item
            container
            spacing={2}
            className={classes.formsGrid}
            alignItems='center'
            justify='center'
            xs={12}
          >
            <Grid item xs={5}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={allLocations}
                  place={departure}
                  setPlace={setDeparture}
                  toDispatch={getDepartureLocationsBySubstringAsync}
                  label="From"
                  placeholder="Start from..."
                  disableClearable={true}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={allLocations}
                  place={destination}
                  setPlace={setDestination}
                  toDispatch={getDestinationLocationsBySubstringAsync}
                  shouldHideOptions={departure === undefined}
                  label="To"
                  placeholder="Finish in..."
                  disableClearable={true}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <SwitchLocationsButton
                  departure={departure}
                  setDeparture={setDeparture}
                  destination={destination}
                  setDestination={setDestination}
                  fontSize='large'
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            className={classes.formsGrid}
          >
            <Grid item xs={10}>
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
            <Grid item xs={2}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <SearchButton
                  departure={departure}
                  destination={destination}
                  departureDate={departureDate}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default FooterMenu;