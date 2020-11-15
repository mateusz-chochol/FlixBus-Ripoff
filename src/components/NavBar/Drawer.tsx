import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  SwipeableDrawer,
} from '@material-ui/core';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import StreetviewRoundedIcon from '@material-ui/icons/StreetviewRounded';
import DevicesRoundedIcon from '@material-ui/icons/DevicesRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
  }),
);

const Drawer: React.FC<{ open: boolean, setOpen: (value: React.SetStateAction<boolean>) => void }> = ({ open, setOpen }) => {
  const classes = useStyles();
  const iOS = Boolean(process.env.browser && /iPad|iPhone|iPod/.test(navigator.userAgent));

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={() => { setOpen(false) }}
      onOpen={() => { setOpen(true) }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <List className={classes.list}>
        <ListItem button key="Route Map">
          <ListItemIcon>
            <ExploreRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Route Map" />
        </ListItem>
        <ListItem button key="Plan Your Journey">
          <ListItemIcon>
            <StreetviewRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Plan Your Journey" />
        </ListItem>
        <ListItem button key="Services">
          <ListItemIcon>
            <DevicesRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button key="Company">
          <ListItemIcon>
            <BusinessRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Company" />
        </ListItem>
        <ListItem button key="Newsletter">
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Newsletter" />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list}>
        <ListItem button key="Send Feedback">
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary="Send Feedback" />
        </ListItem>
        <ListItem button key="Help">
          <ListItemIcon>
            <HelpRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

export default Drawer
