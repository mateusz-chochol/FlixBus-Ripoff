import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './redux/Store';

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