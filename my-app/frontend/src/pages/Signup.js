import React, { useState } from 'react';// React와 상태 관리를 위한 useState 가져오기
import { handleSignup } from '../api';// 회원가입 API 요청 함수
import { useNavigate } from 'react-router-dom';// 페이지 이동을 위한 React Router 훅

// Signup 컴포넌트
const Signup = () => {
  // 상태 선언: 이름, 아이디, 비밀번호 입력 값
  const [name, setname] = useState('');// 사용자 이름 상태
  const [username, setUsername] = useState(''); // 사용자 아이디 상태
  const [password, setPassword] = useState(''); // 사용자 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동 함수
  
  // 회원가입 폼 제출 함수
  const onSubmit = async (e) => {
    e.preventDefault();// 폼 기본 제출 동작 방지
    try {
       // API를 통해 회원가입 요청
      const response = await handleSignup(username, password,name);
      
      // 응답이 성공적일 경우
      if (response && response.status === 201) {
        alert('회원가입 성공! 🎉');
        navigate('/');  // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert('회원가입 실패. 다시 시도하세요.');
      }
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.status === 400) {
        alert('이미 존재하는 사용자입니다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 이름 입력 필드 */}
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setname(e.target.value)} // 입력 값 상태 업데이트
      />
      {/* 아이디 입력 필드 */}
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // 입력 값 상태 업데이트
      />
       {/* 비밀번호 입력 필드 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // 입력 값 상태 업데이트
      />
      {/* 회원가입 버튼 */}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
