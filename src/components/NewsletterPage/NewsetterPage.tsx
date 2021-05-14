import React from 'react';
import {
  Box,
  // Typography,
  Paper,
} from '@material-ui/core';
import { ReactComponent as NewsletterSvg } from 'svgs/newsletter.svg';

const NewsetterPage: React.FC = () => {
  return (
    <Paper square>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 75px)"
        width="100vw"
      >
        <NewsletterSvg />
        {/* <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Newsletter page</Box>
        </Typography> */}
      </Box>
    </Paper>
  )
}

export default NewsetterPage;