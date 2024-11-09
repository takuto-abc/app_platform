import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      // トークンとユーザー情報を保存
      localStorage.setItem('token', res.data.token);
      // ユーザー情報を状態管理に保存
    } catch (error: any) {
      console.error('登録エラー', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新規登録</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ユーザー名" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button type="submit">登録</button>
    </form>
  );
};

export default Register;
