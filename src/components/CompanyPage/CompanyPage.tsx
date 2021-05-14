import React from 'react';
import {
  Box,
  // Typography,
  Paper,
} from '@material-ui/core';
import { ReactComponent as CompanySvg } from 'svgs/company.svg';

const CompanyPage: React.FC = () => {
  return (
    <Paper square>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 75px)"
        width="100vw"
      >
        <CompanySvg />
        {/* <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Company page</Box>
        </Typography> */}
      </Box>
    </Paper>
  )
}

export default CompanyPage;