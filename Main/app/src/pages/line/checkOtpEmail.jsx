// VerifyOtp.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from location state
  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/verify-otp-e', {
        email,
        otp,
      });

      if (response.status === 200) {
        // Navigate to the success page or dashboard if OTP verification is successful
        navigate('/checkProfile', { state: { email } });
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOtp;
