import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CssBaseline,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';
import AccountOptions from './AccountOptions';
import { routes } from '../../routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    titleButton: {
      textTransform: 'none',
      '&&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }),
);

export default function MenuAppBar() {
  const classes = useStyles();
  const [openDrawerMenu, setOpenDrawerMenu] = useState<boolean>(false);
  const history = useHistory();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            disableRipple
            onClick={() => { setOpenDrawerMenu(true) }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawerMenu} setOpen={setOpenDrawerMenu} />
          <Typography className={classes.root}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.titleButton}
              disableRipple
              onClick={() => { history.push(routes.mainPage) }}
            >
              <Typography variant="h4">
                FlixBus
              </Typography>
            </Button>
          </Typography>
          <AccountOptions />
        </Toolbar>
      </AppBar>
    </>
  );
}