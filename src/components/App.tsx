import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
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

const styles = {
  paperContainer: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img.jpg)`
  }
};

function App() {
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
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </Paper>
    </Router>
  );
}

export default App;
