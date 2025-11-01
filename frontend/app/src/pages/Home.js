import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>You Are Volante</h1>
        <h2>환영합니다, {user?.username}님!</h2>

        <div style={styles.userInfo}>
          <p><strong>이메일:</strong> {user?.email}</p>
          <p><strong>가입일:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
        </div>

        <button onClick={handleLogout} style={styles.button}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  userInfo: {
    margin: '20px 0',
    textAlign: 'left',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Home;
