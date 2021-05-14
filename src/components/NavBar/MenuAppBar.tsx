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
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import DevicesRoundedIcon from '@material-ui/icons/DevicesRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CreateIcon from '@material-ui/icons/Create';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Drawer from './Drawer';
import AccountOptions from './AccountOptions';
import Cart from './Cart';
import AppBarMenuItem from 'types/Objects/AppBarMenuItem';

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

const menuItems: AppBarMenuItem[] = [
  {
    index: 0,
    key: 'Route Map',
    text: 'Route Map',
    icon: <ExploreRoundedIcon />,
    route: routes.routeMapPage,
  },
  {
    index: 1,
    key: 'Services',
    text: 'Services',
    icon: <DevicesRoundedIcon />,
    route: routes.servicesPage,
  },
  {
    index: 2,
    key: 'Company',
    text: 'Company',
    icon: <BusinessRoundedIcon />,
    route: routes.companyPage,
  },
  {
    index: 3,
    key: 'Newsletter',
    text: 'Newsletter',
    icon: <LibraryBooksIcon />,
    route: routes.newsletterPage,
  },
  {
    index: 4,
    key: 'Send Feedback',
    text: 'Send Feedback',
    icon: <FeedbackIcon />,
    route: routes.sendFeedbackPage,
  },
  {
    index: 5,
    key: 'Help',
    text: 'Help',
    icon: <HelpRoundedIcon />,
    route: routes.helpPage,
  },
]

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
    route: routes.singupPage,
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
            <Grid item xs={9} md={2}>
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
              <Grid item md={7}>
                <Tabs
                  value={tabIndex}
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="on"
                  centered
                >
                  {menuItems.map(item =>
                    <Tab
                      key={item.key}
                      label={item.text}
                      icon={item.icon}
                      onClick={() => { history.push(item.route) }}
                    />
                  )}
                </Tabs>
              </Grid>
            </Hidden>
            <Grid item md={1}>
              <Cart />
            </Grid>
            {/* TODO: show logged in icon on mobile*/}
            <Hidden smDown>
              <Grid item xs={4} md={2} >
                <AccountOptions />
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withWidth()(MenuAppBar);