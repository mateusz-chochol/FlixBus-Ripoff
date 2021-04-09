import React from 'react';
import {
  Box,
  Grid,
  Divider,
  Paper,
} from '@material-ui/core';
import {
  getDepartureLocationsBySubstringAsync,
  getDestinationLocationsBySubstringAsync,
} from 'redux/LocationsSlice';
import SearchButton from 'components/Misc/SearchButton';
import SwitchLocationsButton from 'components/Misc/SwitchLocationsButton';
import TripPlaceForm from 'components/Misc/TripPlaceForm';
import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import TripsList from './TripsList';
import FooterMenuProps from 'types/Props/FooterMenuProps';

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
    smallList: {
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      '&::-webkit-scrollbar': {
        height: '1em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    },
    smallListItem: {
      minWidth: '220px',
      minHeight: '80px',
      overflow: 'hidden'
    },
    divider: {
      width: '100%',
      height: '1px',
      alignSelf: 'flex-start'
    }
  }),
);

const FooterMenu: React.FC<FooterMenuProps> = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  basicTrips,
  trips,
  allLocations,
  departureLocationsForTextFields,
  destinationLocationsForTextFields,
  smallScreenFormsHeight,
  isSmallScreen
}) => {
  const classes = useStyles();

  return (
    <Box width='100vw' height={smallScreenFormsHeight}>
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
            <Grid item xs={4}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={departureLocationsForTextFields}
                  place={departure}
                  setPlace={setDeparture}
                  toDispatch={getDepartureLocationsBySubstringAsync}
                  label="From"
                  placeholder="Start from..."
                  disableClearable={isSmallScreen}
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
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
            <Grid item xs={4}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TripPlaceForm
                  locations={destinationLocationsForTextFields}
                  trips={basicTrips}
                  place={destination}
                  setPlace={setDestination}
                  toDispatch={getDestinationLocationsBySubstringAsync}
                  shouldHideOptions={departure === undefined}
                  label="To"
                  placeholder="Finish in..."
                  disableClearable={isSmallScreen}
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <SearchButton departure={departure} destination={destination} />
              </Box>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item container xs={12} justify='center'>
            <Box height='100%' width='100%'>
              <TripsList
                departure={departure}
                destination={destination}
                locations={allLocations}
                basicTrips={basicTrips}
                trips={trips}
                isSmallScreen={isSmallScreen}
                listClassName={classes.smallList}
                listItemClassName={classes.smallListItem}
                typographyProps={{
                  variant: 'subtitle1',
                  align: 'center',
                }}
                messageBoxProps={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default FooterMenu;