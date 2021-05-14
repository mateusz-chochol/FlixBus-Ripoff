import React from 'react';
import {
  Box,
  // Typography,
  Paper,
} from '@material-ui/core';
import { ReactComponent as ServicesSvg } from 'svgs/services.svg';

const ServicesPage: React.FC = () => {
  return (
    <Paper square>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 75px)"
        width="100vw"
      >
        <ServicesSvg />
        {/* <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Services page</Box>
        </Typography> */}
      </Box>
    </Paper>
  )
}

export default ServicesPage;