import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Link,
  Hidden,
  withWidth,
  WithWidth,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as CompanySvg } from 'svgs/company.svg';

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
    },
  }),
);

const MyInfo: React.FC = () => {
  return (
    <>
      <Typography variant='h4' gutterBottom>
        About me
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        My name is Mateusz Chochół and I come from Poland. You can contact me via mail: <Link href='mailto:mch.priv@gmail.com'>mch.priv@gmail.com</Link>. Bus travel website is my "do all" project where I try to implement everything I know about web development, starting from frontend going through writing backend on firebase, tests in cypress and building CI/CD pipelines on Google Cloud Platform. The project is ongoing so not every mentioned thing has been done but that's only yet.
      </Typography>
    </>
  )
}

const CompanyPage: React.FC<WithWidth> = ({ width }) => {
  const classes = useStyles();
  const isSmallScreen = width === 'xs' || width === 'sm';

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
                <CompanySvg width='95%' height={isSmallScreen ? '100%' : undefined} />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Paper>
  )
}

export default withWidth()(CompanyPage);