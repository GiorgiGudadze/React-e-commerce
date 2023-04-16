import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = legacy_createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);