// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');  // 토큰 삭제
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_name');
    alert('로그아웃 되었습니다.');
    setIsLoggedIn(false);
    navigate('/');  // home 페이지로 이동
  };

  return (
    <nav style={styles.navbar}>
    <div style={styles.userInfo}>
      <h3>안녕하세요, {userName}님!</h3>
    </div>
    <ul style={styles.navList}>
      <li style={styles.navItem}><Link to="/dashboard">대시보드</Link></li>
      <li style={styles.navItem}><Link to="/camera">카메라</Link></li>
    </ul>
    <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
  </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
  },
  navItem: {
    marginRight: '20px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: 'none',
    color: 'black',
    cursor: 'pointer',
  },
};

export default Navbar;
