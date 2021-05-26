import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton,
  Slider,
  Select,
  MenuItem,
  ListItemIcon,
  FormControl,
} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import FiltersMenuProps from 'types/Props/ResultsPage/FiltersMenuProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const FiltersMenu: React.FC<FiltersMenuProps> = ({
  sortBySetting,
  setSortBySetting,
  priceFilter,
  setPriceFilter,
  durationFilter,
  setDurationFilter,
  departureHourFilter,
  setDepartureHourFilter,
  returnHourFilter,
  setReturnHourFilter,
  passengersCount,
  setPassengersCount,
  displayReturnHour,
  isSmallScreen,
}) => {
  const classes = useStyles();

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

  return (
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
              max={200}
              min={0}
              marks={[
                {
                  value: 0,
                  label: '0$'
                },
                {
                  value: 200,
                  label: '200$'
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
      {displayReturnHour &&
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
      }
      <Grid item>
        <Box padding={3}>
          <Typography variant='h6'>
            Duration range:
          </Typography>
          <Box paddingTop={6}>
            <Slider
              value={durationFilter}
              onChange={(event, newValue) => setDurationFilter(newValue as number[])}
              max={24}
              min={0}
              marks={[
                {
                  value: 0,
                  label: '0h'
                },
                {
                  value: 24,
                  label: '24h'
                }
              ]}
              valueLabelDisplay="on"
              aria-labelledby="duration slider"
              color='secondary'
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FiltersMenu;