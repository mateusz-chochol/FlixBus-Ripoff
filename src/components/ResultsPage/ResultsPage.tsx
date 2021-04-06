import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ResultsPageProps from 'types/Props/ResultsPageProps';

const ResultsPage: React.FC<ResultsPageProps> = ({ match }) => {
  // eslint-disable-next-line
  const { departureId, destinationId } = match.params;
  // eslint-disable-next-line
  const history = useHistory();

  //above warning removed temporarily

  return (
    <Paper square>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="92vh"
        width="100vw"
      >
        <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Results page</Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default ResultsPage;