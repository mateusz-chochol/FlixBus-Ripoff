import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'typeface-roboto';
import { AuthProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from 'redux/Store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();