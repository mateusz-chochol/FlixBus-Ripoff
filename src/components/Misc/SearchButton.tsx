import React from 'react';
import { routes } from 'routes';
import { useHistory } from 'react-router-dom';
import { useNotifications } from 'components/Misc/Notifications';
import SearchButtonProps from 'types/Props/SearchButtonProps';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton: React.FC<SearchButtonProps> = ({ departure, destination }) => {
  const history = useHistory();
  const { showInfo } = useNotifications();

  const handleSearchButtonClick = () => {
    if (departure && destination) {
      if (departure !== destination) {
        history.push(routes.resultsPage.replace(':departureIdAsString', departure.id.toString()).replace(':destinationIdAsString', destination.id.toString()));
      }
      else {
        showInfo('Departure and destination cannot be the same')
      }
    }
    else {
      showInfo('You need to fill departure and destination fields first')
    }
  }

  return (
    <IconButton color="secondary" onClick={handleSearchButtonClick}>
      <SearchIcon fontSize='large' />
    </IconButton>
  )
}

export default SearchButton;