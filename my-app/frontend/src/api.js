import axios from 'axios'; // Axios 라이브러리로 HTTP 요청 처리

// CSRF 토큰을 가져오는 함수
const getCSRFToken = () => {
   // 브라우저 쿠키에서 CSRF 토큰 검색
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'csrftoken') return value; // CSRF 토큰 반환
  }
  return null; // CSRF 토큰이 없으면 null 반환
};
// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8000/api/accounts/', // API 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청 헤더: JSON 데이터
  },
  withCredentials: true, // 쿠키 전달
});

// 요청 인터셉터: Authorization 헤더 추가 및 CSRF 토큰 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 액세스 토큰 가져오기
  const csrfToken = getCSRFToken();// CSRF 토큰 가져오기
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
  }
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;// CSRF 헤더 추가
  }
  return config;
}, (error) => Promise.reject(error));// 요청 에러 처리

// 응답 인터셉터: 토큰 갱신 및 401 처리
api.interceptors.response.use(
  (response) => response,// 응답 성공 시 그대로 반환
  async (error) => {
    if (error.response?.status === 401) { // 401 에러 발생 시
      const refreshToken = localStorage.getItem('refresh_token');// 리프레시 토큰 가져오기
      if (refreshToken) {
        try {
          // 토큰 갱신 요청
          const refreshResponse = await axios.post('http://localhost:8000/api/accounts/token/refresh/', {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', refreshResponse.data.access); // 새 액세스 토큰 저장
          error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;// 갱신된 토큰으로 재요청 설정
          return axios(error.config);// 재요청
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          // 로그인 세션 만료 처리
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_name');
          alert('세션이 만료되었습니다. 다시 로그인하세요.');
          window.location.href = '/home';
        }
      }
    }
    return Promise.reject(error);// 다른 에러는 그대로 반환
  }
);

// 로그인 요청 함수
export const handleLogin = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });// 로그인 API 호출
    const { access, refresh, name } = response.data;

    // 토큰과 사용자 정보 로컬 스토리지에 저장
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_name', name);

    console.log('로그인 성공:', response.data);
    return response;// 응답 반환
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;  // 에러를 호출한 곳으로 전달
  }
};

// 회원가입 요청 함수
export const handleSignup = async (username, password, name) => {
  try {
    const response = await api.post('register/', { username, password, name });// 회원가입 API 호출
    console.log('회원가입 성공:', response.data);
    return response; // 응답 반환
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
// 출석 처리 요청 함수
export const markAttendance = async (studentId) => {
  try {
      const response = await api.post('attendance/', {
          student_id: studentId,// 출석 처리할 학생 ID
      });
      return response.data; // 출석 처리 결과 반환
  } catch (error) {
      throw error; // 에러를 호출한 곳으로 전달
  }
};

// 기본 export
export default api;
