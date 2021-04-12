import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@material-ui/core';

const HelpPage: React.FC = () => {
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
          <Box alignSelf='center' justifySelf='center'>Help page</Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default HelpPage;