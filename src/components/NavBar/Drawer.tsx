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
import { useHistory } from 'react-router-dom';
import {
  getTab,
  setTab,
} from 'redux/TabsSlice';
import {
  SwipeableDrawer,
  Tabs,
  Tab,
  Box,
  Grid,
} from '@material-ui/core';
import DrawerProps from 'types/Props/NavBar/DrawerProps';
import AppBarMenuItem from 'types/Objects/AppBarMenuItem';

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

const Drawer: React.FC<DrawerProps> = ({
  items,
  open,
  setOpen
}) => {
  const classes = useStyles();
  const iOS = Boolean(process.env.browser && /iPad|iPhone|iPod/.test(navigator.userAgent));
  const tabIndex = useSelector(getTab)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTabChange = (item: AppBarMenuItem) => {
    setOpen(false);
    history.push(item.route);
  }

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
            onClick={() => { handleTabChange(item) }}
          />
        )}
      </Tabs>
    </SwipeableDrawer>
  )
}

export default Drawer
