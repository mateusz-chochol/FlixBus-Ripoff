import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Hidden,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as CompanySvg } from 'svgs/company.svg';
import MyInfo from './MyInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentGrid: {
      height: "calc(100vh - 75px)",
      maxWidth: '100vw'
    },
    paper: {
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      backgroundColor: 'whitesmoke'
    }
  }),
);

const CompanyPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Box display="flex">
        <Grid container alignItems='center' justify='center' className={classes.parentGrid}>
          <Hidden smDown>
            <Grid item xs={12}>
              <Box paddingTop={3}>
                <Typography variant='h1' color='textSecondary' gutterBottom align='center'>Company</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box paddingX={10}>
                <MyInfo />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='center'>
                <CompanySvg width='95%' />
              </Box>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Box paddingX={10} paddingTop={4}>
                <MyInfo />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='center' paddingY={3} paddingX={3}>
                <CompanySvg width='95%' height='100%' />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CompanyPage;