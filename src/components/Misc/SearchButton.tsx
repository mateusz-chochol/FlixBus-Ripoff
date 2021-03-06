import React from 'react';
import { routes } from 'routes';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNotifications } from 'components/Misc/Notifications';
import { getReturnTripsByReturnDateAsync } from 'redux/TripsSlice';
import SearchButtonProps from 'types/Props/Misc/SearchButtonProps';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton: React.FC<SearchButtonProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  shouldGetReturnTrips
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { showInfo } = useNotifications();

  const handleSearchButtonClick = () => {
    if (departure && destination) {
      if (departure !== destination) {
        let newRoute = routes.resultsPage.replace(':departureIdFromUrl', departure.id.toString()).replace(':destinationIdFromUrl', destination.id.toString());

        if (departureDate) {
          newRoute = newRoute.replace(':departureDateAsString', moment(departureDate.toISOString()).format('YYYY-MM-DD'));
        }
        else {
          newRoute = newRoute.replace(':departureDateAsString', moment().format('YYYY-MM-DD'));
        }

        if (returnDate) {
          newRoute = newRoute.replace(':returnDateAsString', moment(returnDate.toISOString()).format('YYYY-MM-DD'));

          if (shouldGetReturnTrips) {
            dispatch(getReturnTripsByReturnDateAsync({ departureId: departure.id, destinationId: destination.id, returnDate: moment(returnDate.toISOString()).toDate() }));
          }
        }
        else {
          newRoute = newRoute.replace(':returnDateAsString', '');
        }

        history.push(newRoute);
      }
      else {
        showInfo('Departure and destination cannot be the same.')
      }
    }
    else {
      showInfo('You need to fill departure and destination fields first.')
    }
  }

  return (
    <IconButton color="secondary" onClick={handleSearchButtonClick} aria-label='search button'>
      <SearchIcon fontSize='large' />
    </IconButton>
  )
}

export default SearchButton;