import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  removeNotificationActionCreator,
  getNotifications
} from 'redux/NotificationsSlice';
import DateFnsUtils from '@date-io/date-fns';
import { routes } from 'routes';
import {
  Paper,
  Box
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  getRequestsState,
  removeRejectedActionCreator,
} from 'redux/RequestsStateSlice';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  createMuiTheme,
  ThemeProvider,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import MainPage from './MainPage/MainPage';
import SignupPage from './Account/SignupPage';
import LoginPage from './Account/LoginPage';
import MenuAppBar from './NavBar/MenuAppBar';
import RouteMapPage from './RouteMapPage/RouteMapPage';
import DefaultRoute from './Misc/DefaultRoute';
import PrivateRoute from './Misc/PrivateRoute';
import ForgotPasswordPage from './Account/ForgotPasswordPage';
import ResultsPage from './ResultsPage/ResultsPage';
import ServicesPage from './ServicesPage/ServicesPage';
import CompanyPage from './CompanyPage/CompanyPage';
import NewsetterPage from './NewsletterPage/NewsetterPage';
import SendFeedbackPage from './SendFeedbackPage/SendFeedbackPage';
import HelpPage from './HelpPage/HelpPage';
import CheckoutPage from './CheckoutPage/CheckoutPage';
import ProfilePage from './ProfilePage/ProfilePage';
import TripsPage from './TripsPage/TripsPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperContainer: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/main_page.svg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: 'whitesmoke'
    }
  }),
);

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2'
    },
  },
})

const App: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notifications = useSelector(getNotifications);
  const hasRequestBeenRejected = useSelector(getRequestsState)['rejected'] === 'rejected';
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(notification => {
      const snackbarKey = enqueueSnackbar(notification.message, {
        id: notification.id,
        variant: notification.variant,
        onClick: () => closeSnackbar(snackbarKey),
        persist: notification.persist,
        onExited: () => dispatch(removeNotificationActionCreator({ id: notification.id })),
      });
    })
  }, [notifications, closeSnackbar, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (hasRequestBeenRejected) {
      const snackbarKey = enqueueSnackbar('Server error. Please comeback later.', {
        variant: 'error',
        onClick: () => closeSnackbar(snackbarKey)
      });

      dispatch(removeRejectedActionCreator());
    }
  }, [hasRequestBeenRejected, dispatch, enqueueSnackbar, closeSnackbar])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Paper className={classes.paperContainer} square>
          <Box
            display="flex"
            flexDirection='column'
            justifyContent="flex-start"
            alignItems="flex-start"
            height="100vh"
            width="100vw"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MenuAppBar />
              <Switch>
                <DefaultRoute exact path={routes.resultsPage} component={ResultsPage} />
                <DefaultRoute exact path={routes.routeMapPage} component={RouteMapPage} tabIndex={0} />
                <DefaultRoute exact path={routes.servicesPage} component={ServicesPage} tabIndex={1} />
                <DefaultRoute exact path={routes.companyPage} component={CompanyPage} tabIndex={2} />
                <DefaultRoute exact path={routes.newsletterPage} component={NewsetterPage} tabIndex={3} />
                <DefaultRoute exact path={routes.sendFeedbackPage} component={SendFeedbackPage} tabIndex={4} />
                <DefaultRoute exact path={routes.helpPage} component={HelpPage} tabIndex={5} />
                <DefaultRoute exact path={routes.checkoutPage} component={CheckoutPage} />
                <PrivateRoute exact path={routes.loginPage} component={LoginPage} shouldBeLogged={false} tabIndex={6} />
                <PrivateRoute exact path={routes.signupPage} component={SignupPage} shouldBeLogged={false} tabIndex={7} />
                <PrivateRoute exact path={routes.forgotPasswordPage} component={ForgotPasswordPage} shouldBeLogged={false} />
                <PrivateRoute exact path={routes.profilePage} component={ProfilePage} shouldBeLogged={true} />
                <PrivateRoute exact path={routes.tripsPage} component={TripsPage} shouldBeLogged={true} />
                <DefaultRoute path={routes.mainPage} component={MainPage} />
              </Switch>
            </MuiPickersUtilsProvider>
          </Box>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
