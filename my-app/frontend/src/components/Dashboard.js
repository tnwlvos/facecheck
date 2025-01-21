// Dashboard.js (React Component)
import React, { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [file, setFile] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await api.get('dashboard/');
            setStudents(response.data);
        } catch (error) {
            console.error('학생 데이터를 불러오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleFileUpload = async () => {
        if (!file) {
            alert('파일을 선택하세요.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('upload-students/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('파일 업로드 성공!');
            fetchStudents();
        } catch (error) {
            console.error('파일 업로드 실패:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload Excel</button>
            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>학번</th>
              <th>이름</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
        </div>
    );
};

export default Dashboard;
