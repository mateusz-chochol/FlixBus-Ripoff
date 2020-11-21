import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Grid,
  Radio,
  Button,
  Hidden,
  withWidth,
  WithWidth,
  FormControlLabel
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LoopIcon from '@material-ui/icons/Loop';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

const MainPage: React.FC<WithWidth> = ({ width }) => {
  const isSmallScreen = width === 'xs' || width === 'sm';
  const [tripType, setTripType] = useState<string>('one way');
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
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
        minHeight="100vh"
        minWidth="100vw"
      >
        <Box width={isSmallScreen ? 2 / 5 : 3 / 5} minWidth={300}>
          <Paper elevation={4}>
            <Grid
              container
              direction='column'
              spacing={3}
              alignItems='center'
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
                <Hidden xsUp>
                  <Grid item md={5} />
                  <Grid item md={2}>
                    <Box
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      mt={1}
                    >
                      <Button
                        variant="text"
                        color="secondary"
                        size="large"
                        endIcon={<SearchIcon />}
                        fullWidth
                      >
                        Search
                      </Button>
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
              <Grid
                item
                container
                alignItems='center'
                justify='center'
                spacing={3}
              >
                <Grid
                  item
                  container
                  alignItems={isSmallScreen ? 'center' : 'flex-end'}
                  justify='center'
                  spacing={isSmallScreen ? 3 : 1}
                  md={5}
                  direction={isSmallScreen ? 'column' : 'row'}
                >
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                      <TextField
                        id="departure-search-bar"
                        label="From"
                        placeholder="Where do you start?"
                        color="secondary"
                        value={departure}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDeparture(event.target.value) }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={1}>
                      <Box display='flex' justifyContent='center' alignItems='flex-end'>
                        <IconButton size='small' onClick={handleSwitchClick}>
                          <LoopIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
                      <TextField
                        id="destination-search-bar"
                        label="To"
                        placeholder="Where are you going?"
                        color="secondary"
                        value={destination}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDestination(event.target.value) }}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                  justify='center'
                  spacing={3}
                  md={7}
                  direction={isSmallScreen ? 'column' : 'row'}
                >
                  <Grid item xs={12} md={4}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <DateTimePicker
                        variant="inline"
                        label="Departure"
                        value={selectedDate}
                        onChange={(date: Date | null) => { setSelectedDate(date) }}
                        color='secondary'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <DateTimePicker
                        variant="inline"
                        label="Arrival"
                        value={selectedDate}
                        onChange={(date: Date | null) => { setSelectedDate(date) }}
                        color='secondary'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <TextField
                        id="passengers-number"
                        label="Passengers"
                        type="number"
                        value={numberOfPassengers}
                        onChange={handlePassengersNumberChange}
                        color='secondary'
                        inputProps={{ dir: "rtl" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box display='flex' alignItems='flex-end' justifyItems='flex-end'>
                      <IconButton color="secondary" edge='end'>
                        <SearchIcon fontSize='large' />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item />
            </Grid>
          </Paper>
        </Box>
      </Box>
    </MuiPickersUtilsProvider >
  )
}

export default withWidth()(MainPage);
