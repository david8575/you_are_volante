import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors = {};

    if (!formData.username.trim()) {
      errors.username = '사용자명을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }

    if (!formData.passwordCheck) {
      errors.passwordCheck = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.passwordCheck) {
      errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.passwordCheck
    );

    setIsLoading(false);

    if (result.success) {
      alert(`환영합니다, ${result.user.username}님!`);
      navigate('/');
    } else {
      if (typeof result.error === 'object') {
        setFieldErrors(result.error);
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>회원가입</h2>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>사용자명</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="사용자명을 입력하세요"
            />
            {fieldErrors.username && (
              <span style={styles.fieldError}>{fieldErrors.username}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="email@example.com"
            />
            {fieldErrors.email && (
              <span style={styles.fieldError}>{fieldErrors.email}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="8자 이상 입력하세요"
            />
            {fieldErrors.password && (
              <span style={styles.fieldError}>{fieldErrors.password}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>비밀번호 확인</label>
            <input
              type="password"
              name="passwordCheck"
              value={formData.passwordCheck}
              onChange={handleChange}
              style={styles.input}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {fieldErrors.passwordCheck && (
              <span style={styles.fieldError}>{fieldErrors.passwordCheck}</span>
            )}
          </div>

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p style={styles.footer}>
          이미 계정이 있으신가요?{' '}
          <a href="/login" style={styles.link}>
            로그인
          </a>
        </p>
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
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  errorBox: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  fieldError: {
    color: '#c33',
    fontSize: '12px',
    marginTop: '5px',
    display: 'block',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Register;
