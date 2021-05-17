import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Hidden,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as HelpSvg } from 'svgs/help.svg';
import HelpInfo from './HelpInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentGrid: {
      height: "calc(100vh - 75px)",
      maxWidth: '100vw'
    },
    paper: {
      width: '100vw',
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
    fixedItem: {
      pointerEvents: 'none'
    },
  }),
);

const HelpPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Box display="flex">
        <Grid container alignItems='center' justify='flex-end' className={classes.parentGrid}>
          <Hidden smDown>
            <Grid item xs={6}>
              <Box display='flex' position='fixed' top='17%' left='19%' className={classes.fixedItem}>
                <Typography variant='h1' color='textSecondary' gutterBottom>
                  FAQ
                </Typography>
              </Box>
              <Box display='flex' position='fixed' top='30%' left='5%' width='45%' className={classes.fixedItem}>
                <HelpSvg />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box paddingX={10} paddingY={5}>
                <HelpInfo />
              </Box>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Box paddingX={8} paddingY={4}>
                <HelpInfo />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='center' paddingY={3} paddingX={3}>
                <HelpSvg width='95%' height='100%' />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Paper>
  )
}

export default HelpPage;