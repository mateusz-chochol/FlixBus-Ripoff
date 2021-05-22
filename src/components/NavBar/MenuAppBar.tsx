import React, {
  useState,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import {
  getTab,
  setTab,
} from 'redux/TabsSlice';
import { useAuth } from 'contexts/AuthContext';
import {
  useSelector,
  useDispatch
} from 'react-redux';
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
  withWidth,
  WithWidth,
  Tabs,
  Tab,
  Grid,
  Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Drawer from './Drawer';
import AccountOptions from './AccountOptions';
import Cart from './Cart';
import AppBarMenuItem from 'types/Objects/AppBarMenuItem';
import menuItems from './menuItems';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    titleButton: {
      textTransform: 'none',
      '&&:hover': {
        backgroundColor: 'transparent',
      },
      padding: 0,
    },
    toolbar: {
      height: '75px'
    },
  }),
);

const mobileTabsIfNotLoggedIn: AppBarMenuItem[] = menuItems.concat([
  {
    index: 6,
    key: 'Login',
    text: 'Login',
    icon: <AccountBoxIcon />,
    route: routes.loginPage,
  },
  {
    index: 7,
    key: 'Singup',
    text: 'Singup',
    icon: <CreateIcon />,
    route: routes.signupPage,
  },
])

const MenuAppBar: React.FC<WithWidth> = ({ width }) => {
  const isSmallScreen = width === 'xs' || width === 'sm';
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [openDrawerMenu, setOpenDrawerMenu] = useState<boolean>(false);
  const history = useHistory();
  const tabIndex = useSelector(getTab);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenDrawerMenu(false);
  }, [isSmallScreen]);

  const handleLogoClick = () => {
    dispatch(setTab(false));
    history.push(routes.mainPage);
  }

  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Grid container justify="space-between" alignItems="center">
            <Hidden mdUp>
              <Grid item xs={1}>
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
                <Drawer
                  items={currentUser ? menuItems : mobileTabsIfNotLoggedIn}
                  open={openDrawerMenu}
                  setOpen={setOpenDrawerMenu}
                />
              </Grid>
            </Hidden>
            <Grid item xs={7} md={2}>
              <Typography align='left'>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.titleButton}
                  disableRipple
                  onClick={handleLogoClick}
                >
                  <Typography variant="h4">
                    BusTravel
                  </Typography>
                </Button>
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item md={currentUser ? 8 : 7} >
                <Tabs
                  value={tabIndex <= menuItems.map(item => item.index).sort((a, b) => b - a)[0] ? tabIndex : false}
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="on"
                >
                  {menuItems.map(item =>
                    <Tab
                      key={item.key}
                      label={item.text}
                      icon={item.icon}
                      onClick={() => history.push(item.route)}
                    />
                  )}
                </Tabs>
              </Grid>
            </Hidden>
            <Grid item container xs={3} md={currentUser ? 2 : 3} justify='flex-end' alignItems='center'>
              <Grid item>
                <Cart />
              </Grid>
              {(currentUser || !isSmallScreen) &&
                <Grid item>
                  <AccountOptions />
                </Grid>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withWidth()(MenuAppBar);