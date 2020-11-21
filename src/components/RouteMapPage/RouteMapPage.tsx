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
      minHeight="100vh"
      minWidth="100vw"
    >
      <Typography variant='h1'>Route map</Typography>
    </Box>
  )
}

export default RouteMapPage;