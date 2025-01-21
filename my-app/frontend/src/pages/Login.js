import React, { useState } from 'react';
import { handleLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(username, password);

      if (response && response.status === 200) {
      
        const name = response.data.name;
        
        setIsLoggedIn(true);  // 로그인 상태 변경
        setUserName(name);
        alert('로그인 성공!');
        navigate('/dashboard');  // 대시보드로 이동
      } else {
        alert('로그인 실패. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
