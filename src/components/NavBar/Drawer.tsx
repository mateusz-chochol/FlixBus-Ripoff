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
  SwipeableDrawer,
} from '@material-ui/core';
import AppBarMenuItem from '../../types/AppBarMenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
  }),
);

const Drawer: React.FC<{
  items: AppBarMenuItem[],
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void
}> = ({ items, open, setOpen }) => {
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
        {items.map(item => {
          return (
            <ListItem button key={item.key}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        })}
      </List>
    </SwipeableDrawer>
  )
}

export default Drawer
