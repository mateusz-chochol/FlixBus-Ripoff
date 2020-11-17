import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import SignupPage from './Account/SignupPage';
import LoginPage from './Account/LoginPage';
import MenuAppBar from './NavBar/MenuAppBar';
import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  removeNotificationActionCreator,
  selectNotifications
} from '../redux/NotificationsSlice';
import DefaultRoute from './Misc/DefaultRoute';
import PrivateRoute from './Misc/PrivateRoute';
import ForgotPasswordPage from './Account/ForgotPasswordPage';
import { routes } from '../routes';

const styles = {
  paperContainer: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img.jpg)`
  }
};

const App = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(notification => {
      const snackbarKey = enqueueSnackbar(notification.message, {
        id: notification.id,
        variant: notification.variant,
        onClick: () => { closeSnackbar(snackbarKey) },
        persist: notification.persist,
        onExited: () => { dispatch(removeNotificationActionCreator({ id: notification.id })) },
      });
    })
  }, [notifications, closeSnackbar, dispatch, enqueueSnackbar]);

  return (
    <Router>
      <MenuAppBar />
      <Paper style={styles.paperContainer} square>
        <Switch>
          <DefaultRoute exact path={routes.mainPage} component={MainPage} />
          <PrivateRoute path={routes.loginPage} component={LoginPage} shouldBeLogged={false} />
          <PrivateRoute path={routes.singupPage} component={SignupPage} shouldBeLogged={false} />
          <PrivateRoute path={routes.forgotPasswordPage} component={ForgotPasswordPage} shouldBeLogged={false} />
        </Switch>
      </Paper>
    </Router>
  );
}

export default App;
