import React from 'react';
import { routes } from 'routes';
import { useHistory } from 'react-router-dom';
import { useNotifications } from 'components/Misc/Notifications';
import SearchButtonProps from 'types/SearchButtonProps';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton: React.FC<SearchButtonProps> = ({ departure, destination }) => {
  const history = useHistory();
  const { showInfo } = useNotifications();

  const handleSearchButtonClick = () => {
    if (departure && destination) {
      history.push(routes.resultsPage.replace(':departureId', departure.id.toString()).replace(':destinationId', destination.id.toString()));
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