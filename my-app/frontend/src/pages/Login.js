import React, { useState } from 'react'; // React와 상태 관리를 위한 useState 가져오기
import { handleLogin } from '../api'; // 로그인 API 호출 함수
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 React Router 훅

// Login 컴포넌트
const Login = ({ setIsLoggedIn, setUserName }) => {
   // 상태 선언: 아이디와 비밀번호 입력 값
  const [username, setUsername] = useState(''); // 사용자 아이디 상태
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태
  const navigate = useNavigate();// 페이지 이동 함수
  // 로그인 폼 제출 함수
  const onSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    try {
       // API를 통해 로그인 요청
      const response = await handleLogin(username, password);
      // 응답이 성공적일 경우
      if (response && response.status === 200) {
      
        const name = response.data.name;// 응답 데이터에서 사용자 이름 가져오기
        
        setIsLoggedIn(true);   // 로그인 상태 true로 변경
        setUserName(name); // 사용자 이름 설정
        alert('로그인 성공!'); // 성공 메시지
        navigate('/dashboard');  // 대시보드로 이동
      } else {
        alert('로그인 실패. 다시 시도하세요.');// 로그인 실패 메시지
      }
    } catch (error) {
      // 에러 처리
      console.error('로그인 오류:', error);
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');// 에러 메시지
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>로그인</h2>
      {/* 아이디 입력 필드 */}
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}// 입력 값 상태 업데이트
        required
      />
       {/* 비밀번호 입력 필드 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // 입력 값 상태 업데이트
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
