// RequestOtp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function RequestOtp() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/request-otp-e', {
        email,
      });

      if (response.status === 200) {
        console.log("Otp sent successfully")
        // Navigate to verify OTP page and pass email as state
        navigate('/checkOtpEmail', { state: { email } });
      } else {
        console.error('Error sending OTP request');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <h2>Request OTP</h2>
      <form onSubmit={handleRequestOtp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Request OTP</button>
      </form>
    </div>
  );
}

export default RequestOtp;
