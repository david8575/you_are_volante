import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error.error || '로그인에 실패했습니다.');
    }
    setLoading(false);
  };

  return (
    // 🎨 전체 배경: 초록색 그라데이션, 화면 전체 높이, 중앙 정렬
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4">
      {/* 📦 메인 컨테이너: 최대 너비 제한 */}
      <div className="max-w-md w-full">
        
        {/* ⚽ 로고/타이틀 섹션 */}
        <div className="text-center mb-8">
          {/* 흰색 원형 배경에 축구공 아이콘 */}
          <div className="inline-block bg-white rounded-full p-4 mb-4 shadow-lg">
            <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          {/* 타이틀 */}
          <h1 className="text-4xl font-bold text-white mb-2">You Are Volante</h1>
          <p className="text-primary-100">당신의 팀을 관리하세요</p>
        </div>

        {/* 📝 로그인 카드: 흰색 배경, 둥근 모서리, 그림자 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">로그인</h2>
          
          {/* ⚠️ 에러 메시지: 빨간색 배경 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* 📋 폼 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // 입력창: 전체 너비, 패딩, 테두리, 포커스 시 초록색 링
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="이메일을 입력하세요"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {/* 버튼: 초록색 배경, 호버 시 더 진한 초록색, 그림자 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                회원가입
              </Link>
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <p className="text-center text-primary-100 text-sm mt-8">
          © 2025 You Are Volante. All rights reserved.
        </p>
      </div>
    </div>
  );
}