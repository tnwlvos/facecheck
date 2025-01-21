import React, { useState } from 'react';
import { handleSignup } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSignup(username, password,name);

      if (response && response.status === 201) {
        alert('회원가입 성공! 🎉');
        navigate('/');  // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert('회원가입 실패. 다시 시도하세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('이미 존재하는 사용자입니다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
