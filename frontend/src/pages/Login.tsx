import React, { useState } from 'react';
import API from '../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      // トークンとユーザー情報を保存
      localStorage.setItem('token', res.data.token);
      dispatch(setUser(res.data.user));
      // ダッシュボードへリダイレクト
      navigate('/dashboard');
    } catch (error: any) {
      console.error('ログインエラー', error.response?.data?.message || error.message);
      // エラーメッセージを表示する処理を追加
      alert(error.response?.data?.message || 'ログインに失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ログイン</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        required
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default Login;
