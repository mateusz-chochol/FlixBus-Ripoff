import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  getTab,
  setTab,
} from '../../redux/TabsSlice';
import {
  SwipeableDrawer,
  Tabs,
  Tab,
  Box,
  Grid,
} from '@material-ui/core';
import AppBarMenuItem from '../../types/AppBarMenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      width: 250,
      marginTop: 15,
    },
    tabBox: {
      fontSize: 15
    }
  }),
);

const Drawer: React.FC<{
  items: AppBarMenuItem[],
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void
}> = ({ items, open, setOpen }) => {
  const classes = useStyles();
  const iOS = Boolean(process.env.browser && /iPad|iPhone|iPod/.test(navigator.userAgent));
  const tabIndex = useSelector(getTab)
  const dispatch = useDispatch();

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={() => { setOpen(false) }}
      onOpen={() => { setOpen(true) }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        value={tabIndex}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        scrollButtons="on"
        onChange={(event: React.ChangeEvent<{}>, tabIndex: number) => dispatch(setTab(tabIndex))}
      >
        {items.map(item =>
          <Tab
            key={item.key}
            label={
              <Grid container justify='flex-start' alignItems="center">
                <Grid item xs={3}>
                  <Box display='flex'>{item.icon}</Box>
                </Grid>
                <Grid item xs={9}>
                  <Box display='flex' className={classes.tabBox}>{item.text}</Box>
                </Grid>
              </Grid>
            }
            onClick={() => { setOpen(false) }}
          />
        )}
      </Tabs>
    </SwipeableDrawer>
  )
}

export default Drawer
