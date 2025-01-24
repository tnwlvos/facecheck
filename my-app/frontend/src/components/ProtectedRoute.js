import { Navigate } from 'react-router-dom';
// 리액트 라우터에서 제공하는 컴포넌트로, 사용자를 다른 경로로 리다이렉트함


// 인증 보호 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 JWT 액세스 토큰 가져오기
 
 
  // 토큰이 존재하면 children(보호된 컴포넌트)을 렌더링하고,
  // 그렇지 않으면 "/" 경로로 리다이렉트
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
