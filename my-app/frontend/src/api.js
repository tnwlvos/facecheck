import axios from 'axios';

const getCSRFToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'csrftoken') return value;
  }
  return null;
};

const api = axios.create({
  baseURL: 'http://localhost:8000/api/accounts/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전달
});

// 요청 인터셉터: Authorization 헤더 추가 및 CSRF 토큰 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const csrfToken = getCSRFToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => Promise.reject(error));

// 응답 인터셉터: 토큰 갱신 및 401 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // 토큰 갱신 요청
          const refreshResponse = await axios.post('http://localhost:8000/api/accounts/token/refresh/', {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', refreshResponse.data.access);
          error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_name');
          alert('세션이 만료되었습니다. 다시 로그인하세요.');
          window.location.href = '/home';
        }
      }
    }
    return Promise.reject(error);
  }
);

// 로그인 요청
export const handleLogin = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });
    const { access, refresh, name } = response.data;

    // 토큰 및 사용자 정보 저장
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_name', name);

    console.log('로그인 성공:', response.data);
    return response;
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 회원가입 요청
export const handleSignup = async (username, password, name) => {
  try {
    const response = await api.post('register/', { username, password, name });
    console.log('회원가입 성공:', response.data);
    return response;
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 기본 export
export default api;
