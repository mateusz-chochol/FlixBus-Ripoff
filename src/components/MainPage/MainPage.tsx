import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Grid,
  Radio,
  Hidden,
  withWidth,
  WithWidth,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LoopIcon from '@material-ui/icons/Loop';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getLocations } from 'redux/LocationsSlice';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import Location from 'types/Location';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 0,
      width: '100%',
    }
  }),
);

const MainPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm';
  const locations = useSelector(getLocations);
  const [departure, setDeparture] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [tripType, setTripType] = useState<string>('one way');
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | undefined>(1);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-11-20T21:11:54'));

  const handleSwitchClick = () => {
    const tempDeparture = departure;
    setDeparture(destination);
    setDestination(tempDeparture);
  }

  const handlePassengersNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const max = 10;

    if (event.target.value) {
      const numberOfPassengers = Number(event.target.value);

      if (numberOfPassengers > max) {
        setNumberOfPassengers(max);
      }
      else if (numberOfPassengers < 0) {
        setNumberOfPassengers(0);
      }
      else {
        setNumberOfPassengers(numberOfPassengers);
      }
    }
    else {
      setNumberOfPassengers(undefined);
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={isSmallScreen ? "100vh" : "80vh"}
        width="100vw"
      >
        <Box width={isSmallScreen ? 2 / 5 : undefined} minWidth={300}>
          <Hidden smDown>
            <Typography variant='h2'>
              <Box ml={3} mb={1} fontWeight={500} letterSpacing={6} color="text.disabled">Low cost bus travel</Box>
            </Typography>
          </Hidden>
          <Paper elevation={4}>
            <Grid
              container
              direction='column'
              spacing={isSmallScreen ? 0 : 2}
              alignItems='center'
              className={classes.grid}
            >
              <Grid item container justify='center'>
                <Grid item md={1} />
                <Grid item md={2}>
                  <Box
                    display='flex'
                    justifyContent={isSmallScreen ? 'center' : 'flex-start'}
                    alignItems='center'
                    mt={1}
                  >
                    <FormControlLabel
                      value='one way'
                      control={<Radio
                        checked={tripType === 'one way'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTripType(event.target.value) }}
                      />}
                      name="one-way-radio"
                      label='One way'
                    />
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box
                    display='flex'
                    justifyContent={isSmallScreen ? 'center' : 'flex-start'}
                    alignItems='center'
                    mt={1}
                  >
                    <FormControlLabel
                      value='round trip'
                      control={<Radio
                        checked={tripType === 'round trip'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTripType(event.target.value) }}
                      />}
                      label='Round trip'
                      name="round-trip-radio"
                    />
                  </Box>
                </Grid>
                <Grid item xs={7} />
              </Grid>
              <Grid
                item
                container
                alignItems='center'
                justify='center'
                spacing={3}
                className={classes.grid}
              >
                <Grid
                  item
                  container
                  alignItems='stretch'
                  justify='center'
                  spacing={isSmallScreen ? 3 : 1}
                  md={tripType === 'one way' ? 7 : 5}
                  direction={isSmallScreen ? 'column' : 'row'}
                  className={classes.grid}
                >
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                      <TripPlaceForm
                        locations={locations}
                        place={departure}
                        setPlace={setDeparture}
                        label="From"
                        placeholder="Where do you start?"
                      />
                    </Box>
                  </Grid>
                  <Hidden smDown>
                    <Grid item container md={1}>
                      <Box display='flex' justifyContent='center' alignSelf='center'>
                        <IconButton size='small' onClick={handleSwitchClick}>
                          <LoopIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
                      <TripPlaceForm
                        locations={locations}
                        place={destination}
                        setPlace={setDestination}
                        label="To"
                        placeholder="Where are you going?"
                      />
                    </Box>
                  </Grid>
                  <Hidden mdUp>
                    <Grid item xs={12}>
                      <Box display='flex' justifyContent='center' alignItems='flex-end'>
                        <IconButton onClick={handleSwitchClick}>
                          <LoopIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid
                  item
                  container
                  alignItems='center'
                  justify='space-around'
                  spacing={3}
                  md={tripType === 'one way' ? 5 : 7}
                  direction={isSmallScreen ? 'column' : 'row'}
                  className={classes.grid}
                >
                  <Grid item xs={12} md={tripType === 'one way' ? 6 : 4}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <DateTimePicker
                        variant="inline"
                        label="Departure"
                        value={selectedDate}
                        onChange={(date: Date | null) => { setSelectedDate(date) }}
                        color='secondary'
                        inputVariant="outlined"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  {tripType === 'round trip' &&
                    <Grid item xs={12} md={4}>
                      <Box display='flex' justifyContent='center' alignItems='center'>
                        <DateTimePicker
                          variant="inline"
                          label="Return"
                          value={selectedDate}
                          onChange={(date: Date | null) => { setSelectedDate(date) }}
                          color='secondary'
                          inputVariant="outlined"
                          fullWidth
                        />
                      </Box>
                    </Grid>
                  }
                  <Grid item xs={12} md={tripType === 'one way' ? 3 : 2}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <TextField
                        id="passengers-number"
                        label="Passengers"
                        type="number"
                        value={numberOfPassengers}
                        onChange={handlePassengersNumberChange}
                        color='secondary'
                        inputProps={{ dir: "rtl", }}
                        InputLabelProps={{ shrink: true, }}
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  {tripType === 'one way' &&
                    <Grid item md={1} />
                  }
                  <Grid item xs={12} md={2}>
                    <Box display='flex' alignItems='flex-end' justifyContent='center'>
                      <IconButton color="secondary">
                        <SearchIcon fontSize='large' />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </MuiPickersUtilsProvider >
  )
}

export default withWidth()(MainPage);
