import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/Store/configureStore';

import 'fontsource-roboto';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
 </BrowserRouter>
 </Provider>,

  document.getElementById('root')
);

