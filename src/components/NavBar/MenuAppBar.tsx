import React, {
  useState,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  getTab,
  setTab,
} from '../../redux/TabsSlice';
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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';
import AccountOptions from './AccountOptions';
import { routes } from '../../routes';
import AppBarMenuItem from '../../types/AppBarMenuItem';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import StreetviewRoundedIcon from '@material-ui/icons/StreetviewRounded';
import DevicesRoundedIcon from '@material-ui/icons/DevicesRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FeedbackIcon from '@material-ui/icons/Feedback';

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
    },
  }),
);

const menuItems: AppBarMenuItem[] = [
  {
    index: 0,
    key: 'Route Map',
    text: 'Route Map',
    icon: <ExploreRoundedIcon />,
    route: routes.mainPage,
  },
  {
    index: 1,
    key: 'Plan Your Journey',
    text: 'Plan Your Journey',
    icon: <StreetviewRoundedIcon />,
    route: routes.mainPage,
  },
  {
    index: 2,
    key: 'Services',
    text: 'Services',
    icon: <DevicesRoundedIcon />,
    route: routes.mainPage,
  },
  {
    index: 3,
    key: 'Company',
    text: 'Company',
    icon: <BusinessRoundedIcon />,
    route: routes.mainPage,
  },
  {
    index: 4,
    key: 'Newsletter',
    text: 'Newsletter',
    icon: <LibraryBooksIcon />,
    route: routes.mainPage,
  },
  {
    index: 5,
    key: 'Send Feedback',
    text: 'Send Feedback',
    icon: <FeedbackIcon />,
    route: routes.mainPage,
  },
  {
    index: 6,
    key: 'Help',
    text: 'Help',
    icon: <HelpRoundedIcon />,
    route: routes.mainPage,
  },
]

const MenuAppBar: React.FC<WithWidth> = ({ width }) => {
  const isSmallScreen = width === 'xs' || width === 'sm';
  const classes = useStyles();
  const [openDrawerMenu, setOpenDrawerMenu] = useState<boolean>(false);
  const history = useHistory();
  const tabIndex = useSelector(getTab)
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
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            {isSmallScreen &&
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
                <Drawer items={menuItems} open={openDrawerMenu} setOpen={setOpenDrawerMenu} />
              </Grid>
            }
            <Grid item xs={8} md={2}>
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
                    FlixBus
                  </Typography>
                </Button>
              </Typography>
            </Grid>
            {!isSmallScreen &&
              <Grid item md={6}>
                <Tabs
                  value={tabIndex}
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="on"
                  onChange={(event: React.ChangeEvent<{}>, tabIndex: number) => dispatch(setTab(tabIndex))}
                >
                  {menuItems.map(item => <Tab key={item.key} label={item.text} icon={item.icon} />)}
                </Tabs>
              </Grid>
            }
            <Grid item xs={3} md={2}>
              <AccountOptions />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withWidth()(MenuAppBar);