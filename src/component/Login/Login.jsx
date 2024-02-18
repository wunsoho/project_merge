import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [facilityData, setFacilityData] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://13.125.247.248:8080/api/v1/auth/login', {
        userId: userId,
        password: password
      });

      console.log('Response:', response.data);
      setFacilityData(response.data);
      const token = response.data.result.accessToken;

      localStorage.setItem('Token', token);
      loginButton();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const loginButton = () => {
    if (facilityData && facilityData.result && facilityData.result.accessToken) {
      console.log('AccessToken:', facilityData.result.accessToken);
      navigate(`/main`, {
        state: {
          Token: facilityData.result.accessToken,
        },
      });
    } else {
      console.error('AccessToken이 없습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        UserId:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" onClick={loginButton}>로그인</button>
    </form>
  );
}

export default Login;