// Dashboard.js (React Component)
import React, { useState, useEffect } from 'react';
import api from '../api'; // 백엔드 API와 통신하기 위한 커스텀 Axios 인스턴스

const Dashboard = () => {
    const [students, setStudents] = useState([]); // 학생 데이터를 저장할 상태
    const [file, setFile] = useState(null); // 업로드할 파일 상태
    const [faceDetected, setFaceDetected] = useState(null); // 얼굴 인식된 학생 ID

    // 학생 데이터를 가져오는 함수
    const fetchStudents = async () => {
        try {
            const response = await api.get('dashboard/');// 백엔드에서 학생 데이터 가져오기
            setStudents(response.data);// 상태에 데이터 저장
        } catch (error) {
            console.error('학생 데이터를 불러오는 데 실패했습니다:', error);
        }
    };
    // 컴포넌트가 처음 렌더링될 때 학생 데이터를 가져옴
    useEffect(() => {
        fetchStudents();
        
    }, []);
    // 엑셀 파일 업로드 함수
    const handleFileUpload = async () => {
        if (!file) {
            alert('파일을 선택하세요.');// 파일이 없으면 경고
            return;
        }
        const formData = new FormData(); // 폼 데이터를 생성
        formData.append('file', file); // 파일 추가

        try {
            await api.post('upload-students/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, 
            });
            alert('파일 업로드 성공!');// 성공 메시지
            fetchStudents();// 업로드 후 학생 데이터 새로고침
        } catch (error) {
            console.error('파일 업로드 실패:', error);
        }
    };

    // 얼굴 인식(출석 처리) 함수
    const handleFaceRecognition = async (studentId) => {
      try {
        
        const response = await api.post("attendance/", {
          student_id: studentId, // 얼굴로 인식된 학생 ID
          timestamp: new Date().toISOString(), // 현재 시간
        });
        console.log('출석 처리 응답:', response.data);
        alert(response.data.message);// 백엔드 응답 메시지
        
        fetchStudents(); // 업데이트된 데이터를 다시 가져옵니다.
      } catch (error) {
        console.error("출석 기록에 실패했습니다:", error);
        alert("출석 기록에 실패했습니다. 다시 시도해주세요.");
      } 
    };
    // 출석 기록 다운로드 함수
    const handleDownload = async () => {
      try {
          const response = await api.get('export-attendance/', {
              responseType: 'blob', // 파일 데이터를 받기 위해 blob 설정
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 인증 토큰 추가
            },
          });

          // 다운로드 링크 생성
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;

          // 다운로드 파일 이름 설정
          link.setAttribute('download', 'attendance.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          alert('출석 기록 다운로드 성공!');
      }catch (error) {
          console.error('Failed to download attendance data:', error);
          alert('다운로드에 실패했습니다. 다시 시도해주세요.');
        }
    };



    
   
  
    return (
        <div>
            <h1>Dashboard</h1>
            {/* 파일 업로드 버튼 */}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload Excel</button>
            {/* 출석 기록 다운로드 버튼 */}
            <button onClick={handleDownload}>Download Attendance</button>
           
            {/* 학생 데이터 테이블 */}
            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>학번</th>
              <th>이름</th>
              <th>출석상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.is_present ? "출석" : "결석"}</td>
                <td>{student.attendance_time ? new Date(student.attendance_time).toLocaleString() : 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleFaceRecognition(student.student_id)} // 얼굴 인식으로 출석 처리
                    disabled={student.is_present}// 이미 출석된 학생은 비활성화
                  >
                    {student.is_present ? "출석 완료" : "출석 처리"}
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      
       {/* 얼굴 인식 버튼 (시뮬레이션용) */}
       <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            const detectedId = "12345"; // 예시: 감지된 얼굴 ID
            setFaceDetected(detectedId);
            handleFaceRecognition(detectedId);
          }}
        >
          얼굴 인식 시뮬레이션 (테스트용)
        </button>
        {faceDetected && <p>인식된 학번: {faceDetected}</p>}
      </div>
        </div>
    );
};

export default Dashboard;
