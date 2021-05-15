import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Hidden,
  Grid,
  Divider,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as NewsletterSvg } from 'svgs/newsletter.svg';
import ItemsList from './ItemsList';
import components from './components';

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
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundColor: 'whitesmoke'
    },
    fixedItem: {
      pointerEvents: 'none'
    },
    nestedListItem: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const NewsetterPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Grid container className={classes.parentGrid} alignItems='center' justify='center'>
        <Hidden smDown>
          <Grid item xs={6}>
            <Box display='flex' position='fixed' top='18%' left='5%' className={classes.fixedItem}>
              <Typography variant='h1' color='textSecondary' gutterBottom>
                Newsletter
              </Typography>
            </Box>
            <Box display='flex' position='fixed' top='37%' left='5%' width='45%' className={classes.fixedItem}>
              <NewsletterSvg />
            </Box>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={5}>
            <Box paddingY={5}>
              <Typography variant='h4' gutterBottom>
                What has been done so far
              </Typography>
              <ItemsList components={components} toDisplay='done' />
            </Box>
            <Divider />
            <Box paddingY={5}>
              <Typography variant='h4' gutterBottom>
                What still waits as todo
              </Typography>
              <ItemsList components={components} toDisplay='todo' />
            </Box>
            <Box paddingY={5}>
              <Typography gutterBottom>
                This info might not be up to date but I'll try to update it as frequently as possible.
              </Typography>
            </Box>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Box paddingY={5} paddingX={8}>
              <Typography variant='h4' gutterBottom>
                What has been done so far
              </Typography>
              <ItemsList components={components} toDisplay='done' />
            </Box>
            <Box paddingX={8}>
              <Divider />
            </Box>
            <Box paddingY={5} paddingX={8}>
              <Typography variant='h4' gutterBottom>
                What still waits as todo
              </Typography>
              <ItemsList components={components} toDisplay='todo' />
            </Box>
            <Box paddingY={3} paddingX={8}>
              <Typography gutterBottom>
                This info might not be up to date but I'll try to update it as frequently as possible.
              </Typography>
            </Box>
            <Box display='flex' justifyContent='center' paddingTop={5} paddingBottom={3}>
              <NewsletterSvg width='95%' height='100%' />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  )
}

export default NewsetterPage;