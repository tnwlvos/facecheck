import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';

import Login from './pages/Login';         // 로그인 페이지
import Signup from './pages/Signup';       // 회원가입 페이지
import Dashboard from './components/Dashboard'; // 대시보드 페이지
import Camera from './components/Camera';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,setUserName]=useState('');
   // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user= localStorage.getItem('user_name');
    if (token) {
      setIsLoggedIn(true); 
      setUserName(user || ''); // 토큰이 있으면 로그인 상태
    } else {
      setIsLoggedIn(false);  // 없으면 로그아웃 상태
      setUserName('');
    }
  }, []);
 
  return (
    <Router>
    {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} userName={userName}  />}  {/* 로그인 상태일 때만 Navbar 보이게 */}
    <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/camera" element={isLoggedIn ? <Camera /> : <Navigate to="/" />} />
    </Routes>
  </Router>
);
};

export default App;
