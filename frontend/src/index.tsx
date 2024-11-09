import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import API from './services/api';
import { setUser } from './redux/slices/authSlice';

const token = localStorage.getItem('token');
if (token) {
  // トークンを検証してユーザー情報を取得
  API.get('/api/auth/me')
    .then((res) => {
      store.dispatch(setUser(res.data));
    })
    .catch(() => {
      localStorage.removeItem('token');
    });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
