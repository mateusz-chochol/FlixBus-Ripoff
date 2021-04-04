import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const history = useHistory();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Typography variant='h1'>
        <Box alignSelf='center' justifySelf='center'>Results page</Box>
      </Typography>
    </Box>
  )
}

export default ResultsPage;