import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={user.id ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user.id ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user.id ? <Dashboard /> : <Navigate to="/login" />} />
        {/* その他のルート */}
      </Routes>
    </Router>
  );
};

export default App;
