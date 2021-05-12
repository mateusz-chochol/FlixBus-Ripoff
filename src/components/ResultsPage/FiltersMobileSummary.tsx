import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TuneIcon from '@material-ui/icons/Tune';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import FiltersMenu from './FiltersMenu';
import FiltersMobileSummaryProps from 'types/Props/FiltersMobileSummaryProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

const FiltersMobileSummary: React.FC<FiltersMobileSummaryProps> = ({
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

  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isSmallScreen) {
      setIsFiltersDialogOpen(false);
    }
  }, [isSmallScreen])

  return (
    <>
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
            {displayReturnHour &&
              <Grid container>
                <Grid item xs={5}>
                  <Typography align='left'>Return</Typography>
                </Grid>
                <Grid item xs={2}>
                  <KeyboardArrowRightIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography align='right'>{moment(returnHourFilter).format('HH:mm')}</Typography>
                </Grid>
              </Grid>
            }
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
              displayReturnHour={displayReturnHour}
              isSmallScreen={isSmallScreen}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsFiltersDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default FiltersMobileSummary;