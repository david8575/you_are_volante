import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

// 로그인 필요한 페이지 보호
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 이미 로그인한 사람은 접근 불가 (회원가입, 로그인 페이지)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return isAuthenticated ? <Navigate to="/" /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (로그인 필요) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 회원가입 페이지 (로그인 안 한 사람만) */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* 로그인 페이지 (로그인 안 한 사람만) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;