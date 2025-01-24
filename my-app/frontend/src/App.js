import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import api from "./api";
import Login from './pages/Login';         // 로그인 페이지
import Signup from './pages/Signup';       // 회원가입 페이지
import Dashboard from './components/Dashboard'; // 대시보드 페이지
import Camera from './components/Camera'; // 카메라 페이지 컴포넌트
import Home from './pages/Home'; // 홈 페이지 컴포넌트
import Navbar from './components/Navbar';  // 네비게이션 바 컴포넌트

const App = () => {
   // 로그인 상태와 사용자 이름 상태를 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [userName,setUserName]=useState('');  // 사용자 이름 상태
   // 로그인 상태 확인
  useEffect(() => {
    api.get("get-csrf-token/")
    .then((response) => console.log("CSRF Token Set"))
    .catch((error) => console.error("CSRF Token Error:", error));
    const token = localStorage.getItem('access_token');// 로컬 스토리지에서 토큰 가져오기
    const user= localStorage.getItem('user_name'); // 로컬 스토리지에서 사용자 이름 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태
      setUserName(user || ''); // 사용자 이름 설정 (없으면 빈 문자열)
    } else {
      setIsLoggedIn(false);  // 없으면 로그아웃 상태
      setUserName('');
    }
  }, []);
 
  return (
    <Router>
    {/* 로그인 상태일 때만 Navbar 표시 */}
    {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} userName={userName}  />}  {/* 로그인 상태일 때만 Navbar 보이게 */}
    <Routes>
        {/* 홈 페이지 라우트 */}
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} />
         {/* 회원가입 페이지 라우트 */}
        <Route path="/signup" element={<Signup />} />
        {/* 로그인 페이지 라우트 */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} />
        {/* 대시보드 페이지 라우트 (로그인 상태일 때만 접근 가능) */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        {/* 카메라 페이지 라우트 (로그인 상태일 때만 접근 가능) */}
        <Route path="/camera" element={isLoggedIn ? <Camera /> : <Navigate to="/" />} />
    </Routes>
  </Router>
);
};

export default App;
