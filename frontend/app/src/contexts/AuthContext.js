import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../lib/api';

// Context 생성
const AuthContext = createContext(null);

// Context를 쉽게 사용하기 위한 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용 가능합니다.');
  }
  return context;
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  // 상태 관리
  const [user, setUser] = useState(null);           // 현재 로그인한 사용자 정보
  const [token, setToken] = useState(null);         // 인증 토큰
  const [loading, setLoading] = useState(true);     // 로딩 상태 (초기 로그인 체크 중)

  // 컴포넌트 마운트 시 localStorage에서 복원
  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }

      setLoading(false); // 로딩 완료
    };

    initAuth();
  }, []);

  // 회원가입 함수
  const register = async (username, email, password, passwordCheck) => {
    try {
      const response = await authAPI.register({
        username,
        email,
        password,
        password_check: passwordCheck,
      });

      const { user: newUser, token: newToken } = response.data;

      // 상태 업데이트
      setUser(newUser);
      setToken(newToken);

      // localStorage에 저장
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true, user: newUser };
    } catch (error) {
      console.error('회원가입 실패:', error);
      return {
        success: false,
        error: error.response?.data || '회원가입에 실패했습니다.',
      };
    }
  };

  // 로그인 함수
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });

      const { user: loggedInUser, token: newToken } = response.data;

      // 상태 업데이트
      setUser(loggedInUser);
      setToken(newToken);

      // localStorage에 저장
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error('로그인 실패:', error);
      return {
        success: false,
        error: error.response?.data?.error || '로그인에 실패했습니다.',
      };
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 (Token 삭제)
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      // 에러가 나도 로컬 상태는 삭제
    } finally {
      // 상태 초기화
      setUser(null);
      setToken(null);

      // localStorage 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // 사용자 정보 업데이트 함수
  const updateUser = async (data) => {
    try {
      const response = await authAPI.updateMe(data);
      const updatedUser = response.data;

      // 상태 업데이트
      setUser(updatedUser);

      // localStorage 업데이트
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('정보 수정 실패:', error);
      return {
        success: false,
        error: error.response?.data || '정보 수정에 실패했습니다.',
      };
    }
  };

  // 비밀번호 변경 함수
  const changePassword = async (oldPassword, newPassword, newPasswordCheck) => {
    try {
      const response = await authAPI.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_check: newPasswordCheck,
      });

      const { token: newToken } = response.data;

      // 새 Token으로 업데이트
      setToken(newToken);
      localStorage.setItem('token', newToken);

      return { success: true, message: '비밀번호가 변경되었습니다.' };
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      return {
        success: false,
        error: error.response?.data?.error || '비밀번호 변경에 실패했습니다.',
      };
    }
  };

  // Context에 제공할 값
  const value = {
    user,           // 현재 사용자 정보
    token,          // 현재 토큰
    loading,        // 로딩 상태
    isAuthenticated: !!user,  // 로그인 여부 (user가 있으면 true)
    register,       // 회원가입 함수
    login,          // 로그인 함수
    logout,         // 로그아웃 함수
    updateUser,     // 정보 수정 함수
    changePassword, // 비밀번호 변경 함수
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
