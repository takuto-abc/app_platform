// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { clearUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ようこそ、{user.username}さん！</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Dashboard;
