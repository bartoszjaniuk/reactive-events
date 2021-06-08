import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import 'react-calendar/dist/Calendar.css';
import {history} from './app/redux/store';
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
