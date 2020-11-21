import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Radio,
  Typography,
  Button,
  Hidden,
  withWidth,
  WithWidth,
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
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100vw"
      >
        <Box width={3 / 5} minWidth={300}>
          <Paper elevation={4}>
            <Grid container direction='column' spacing={3} alignItems='center'>
              <Grid item container justify={isSmallScreen ? 'center' : 'flex-start'} direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item md={2}>
                  <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
                    <Radio
                      checked={tripType === 'one way'}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTripType(event.target.value) }}
                      value='one way'
                      name="one-way-radio"
                    />
                    <Typography>One way</Typography>
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
                    <Radio
                      checked={tripType === 'round trip'}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTripType(event.target.value) }}
                      value='round trip'
                      name="round-trip-radio"
                    />
                    <Typography>Round Trip</Typography>
                  </Box>
                </Grid>
                <Hidden smDown>
                  <Grid item md={6} />
                  <Grid item md={2}>
                    <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
                      <Button
                        variant="text"
                        color="primary"
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
                alignItems='flex-end'
                justify='center'
                spacing={3}
              >
                <Grid
                  item
                  container
                  alignItems={isSmallScreen ? 'center' : 'flex-end'}
                  justify={isSmallScreen ? 'center' : 'flex-end'}
                  spacing={isSmallScreen ? 3 : 1}
                  md={6}
                  direction={isSmallScreen ? 'column' : 'row'}
                >
                  <Hidden mdUp>
                    <Grid item xs={12}>
                      <Box display='flex' justifyContent='center' alignItems='flex-end'>
                        <IconButton>
                          <LoopIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                      <TextField
                        id="departure-search-bar"
                        label="From"
                        placeholder="Where do you start?"
                        color="secondary"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={1}>
                      <Box display='flex' justifyContent='center' alignItems='flex-end'>
                        <IconButton size='small'>
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  alignItems='center'
                  justify='center'
                  spacing={3}
                  md={6}
                  direction={isSmallScreen ? 'column' : 'row'}
                >
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <DateTimePicker
                        variant="inline"
                        label="Departure"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                      <DateTimePicker
                        variant="inline"
                        label="Arrival"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden mdUp>
                <Grid item xs={12} md={2}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <Button
                      variant="text"
                      color="primary"
                      size="large"
                      endIcon={<SearchIcon />}
                    >
                      Search
                        </Button>
                  </Box>
                </Grid>
              </Hidden>
              <Grid item />
            </Grid>
          </Paper>
        </Box>
      </Box>
    </MuiPickersUtilsProvider >
  )
}

export default withWidth()(MainPage);
