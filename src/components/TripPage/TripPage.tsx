import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@material-ui/core';
import TripPageProps from 'types/Props/TripPageProps';

const TripPage: React.FC<TripPageProps> = ({ match }) => {
  const { tripId } = match.params;

  return (
    <Paper square>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 75px)"
        width="100vw"
      >
        <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Trip page, id: {tripId}</Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default TripPage;