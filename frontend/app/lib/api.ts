import axios from 'axios';

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// axios 인스턴스
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// 요청 인터셉터 -> 모든 요청에 Token 자동 추가
api.interceptors.request.use(
    (config) => {
        
        if (typeof window !== 'undefined'){
            const token = localStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Token ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 응답 인터셉터 -> 에러 처리
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined'){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
)


// API 함수들
export const authAPI = {
  // 회원가입
  register: (data: {
    username: string;
    email: string;
    password: string;
    password_check: string;
  }) => {
    return api.post('/accounts/register/', data);
  },

  // 로그인
  login: (data: { email: string; password: string }) => {
    return api.post('/accounts/login/', data);
  },

  // 로그아웃
  logout: () => {
    return api.post('/accounts/logout/');
  },

  // 내 정보 조회
  getMe: () => {
    return api.get('/accounts/me/');
  },

  // 내 정보 수정
  updateMe: (data: { username?: string; email?: string; bio?: string }) => {
    return api.patch('/accounts/me/', data);
  },

  // 비밀번호 변경
  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_check: string;
  }) => {
    return api.post('/accounts/change-password/', data);
  },
};

export default api;