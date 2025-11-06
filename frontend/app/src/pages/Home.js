import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🎯 네비게이션 바: 상단 고정, 흰색 배경, 그림자 */}
      <nav className="bg-white shadow-md">
        {/* 컨테이너: 최대 너비 제한, 반응형 패딩 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 내비 내용: 양쪽 정렬, 높이 64px */}
          <div className="flex justify-between items-center h-16">
            {/* 왼쪽: 로고 + 타이틀 */}
            <div className="flex items-center">
              {/* 축구공 아이콘 */}
              <svg className="w-8 h-8 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-xl font-bold text-gray-800">You Are Volante</span>
            </div>
            {/* 오른쪽: 로그아웃 버튼 (빨간색) */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      {/* 📄 메인 컨텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 🎉 환영 섹션: 초록색 그라데이션 배너 */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">환영합니다, {user?.username}님! ⚽</h1>
          <p className="text-primary-100">당신의 팀을 완벽하게 관리하세요</p>
        </div>

        {/* 📊 사용자 정보 카드 (2열 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 사용자명 카드 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              {/* 아이콘 배경: 밝은 초록색 원 */}
              <div className="bg-primary-100 rounded-full p-3 mr-4">
                {/* 사용자 아이콘 */}
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">사용자명</p>
                <p className="text-lg font-semibold text-gray-800">{user?.username}</p>
              </div>
            </div>
          </div>

          {/* 이메일 카드 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              {/* 아이콘 배경: 밝은 골드색 원 */}
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                {/* 이메일 아이콘 */}
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">이메일</p>
                <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 📝 Bio 섹션 (bio가 있을 때만 표시) */}
        {user?.bio && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">소개</h3>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        )}

        {/* 🎯 퀵 액션 카드들 (3열 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 카드 1: 팀 관리 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            {/* 파란색 아이콘 */}
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">팀 관리</h3>
            <p className="text-gray-600 text-sm">팀원들을 추가하고 관리하세요</p>
          </div>

          {/* 카드 2: 포메이션 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            {/* 초록색 아이콘 */}
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">포메이션</h3>
            <p className="text-gray-600 text-sm">전술과 포메이션을 설정하세요</p>
          </div>

          {/* 카드 3: 통계 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            {/* 보라색 아이콘 */}
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">통계</h3>
            <p className="text-gray-600 text-sm">팀 성과를 분석하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
