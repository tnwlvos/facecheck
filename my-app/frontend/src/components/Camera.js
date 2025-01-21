import React, { useRef } from "react";

const Camera = () => {
  const videoRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("카메라 연결 실패:", err);
      });
  };

  return (
    <div>
      <h2>얼굴 촬영</h2>
      <video ref={videoRef} autoPlay style={{ width: "500px" }}></video>
      <br />
      <button onClick={startCamera}>카메라 시작</button>
    </div>
  );
};

export default Camera;