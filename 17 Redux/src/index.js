import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Here, we have wrapped the highest level of the component tree, i.e, the app component with the redux provider component. And we give our store to the provider component as an argument.

  <Provider store={store}>
    <App />
  </Provider>,
);
