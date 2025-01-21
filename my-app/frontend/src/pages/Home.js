import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = ({ setIsLoggedIn ,setUserName }) => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>AI 얼굴인식 출석 시스템</h1>
      <div>
        <button onClick={() => setShowLogin(true)}>로그인</button>
        <button onClick={() => setShowLogin(false)}>회원가입</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {showLogin ? <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/> : <Signup />}
      </div>
      <img
        src="/hangong.jpg"
        alt="로고"
        style={{ width: "50%", marginTop: "20px" }}
      />
    </div>
  );
};

export default Home;