import React from "react";
import api from "../api"; // Axios 인스턴스

const Camera = () => {
  const handleStartFaceRecognition = async () => {
    try {
      const response = await api.post("detect-face/"); // 실시간 얼굴 인식 API 호출
      console.log('✅ 얼굴 인식 성공:', response.data);
      alert(response.data.message || "얼굴 인식이 완료되었습니다!");
    } catch (error) {
      console.error("얼굴 인식 오류:", error.response || error.message);
      alert("얼굴 인식 중 오류가 발생했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div>
      <h1>Camera Page</h1>
      <button onClick={handleStartFaceRecognition}>실시간 얼굴 인식 시작</button>
    </div>
  );
};

export default Camera;

