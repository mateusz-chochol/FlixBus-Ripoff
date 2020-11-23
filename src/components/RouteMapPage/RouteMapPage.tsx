import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';

const RouteMapPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Typography variant='h1' align='center'>Route map</Typography>
    </Box>
  )
}

export default RouteMapPage;