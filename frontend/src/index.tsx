import React from 'react';
import ReactDOM from 'react-dom/client'; // react-dom/client をインポート
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import API from './services/api';
import { setUser } from './redux/slices/authSlice';
import ErrorBoundary from './components/ErrorBoundary'; // オプション: エラーバウンダリーの追加

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary> {/* オプション: エラーバウンダリー */}
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
