// VerifyOtp.js
import React, { useState , useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromLocalStorage } from '../../utils/localStorageUtils';
import { saveEmailToLocalStorage } from '../../utils/localStorageUtils';
function VerifyOtp() {
  const [otp, setOtp] = useState(['','','','','','']);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  
  // Get email from location state
  const email = getEmailFromLocalStorage();
  useEffect(() => {
    if (!email) {
      // ถ้าไม่มี email ใน Local Storage ให้กลับไปที่หน้า RequestOtp
      navigate('/requestOtp');
    }
  }, [email, navigate]);


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') { // ตรวจสอบให้แน่ใจว่าเป็นตัวเลข
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        // เลื่อนไปช่องถัดไปถ้ากรอกครบในช่องปัจจุบัน
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    } else if (e.key === 'ArrowRight' && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(''); // รวมค่า OTP ให้เป็น string เดียว

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-otp-e`, {
        email,
        otp: otpCode,
      });

      if (response.status === 200) {
        saveEmailToLocalStorage(email);
        // Navigate to the success page or dashboard if OTP verification is successful
        navigate('/checkProfile');
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleSendCodeAgain = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/request-otp-e`, {
        email,
      });
  
      if (response.status === 200) {
        setMessage('A new OTP has been sent to your email.');
        setCountdown(60); // ตั้งเวลานับถอยหลัง 60 วินาที (1 นาที)
      } else {
        console.error('Failed to send OTP');
        setMessage('Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Please try again later.');
    }
  };
  useEffect(() => {
    // เริ่มนับถอยหลังเมื่อ countdown มีค่าและมากกว่า 0
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      // ล้าง timer เมื่อ countdown หมดหรือ component ถูกล้าง
      return () => clearInterval(timer);
    }
  }, [countdown]);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s"
        alt="Logo"
        className="mb-6 mx-auto"
        style={{ width: '80px', height: '80px' }}
      />
      <h1 className="text-2xl font-bold mb-4">Confirm your code</h1>
      <p className="text-gray-600 mb-6">Enter the code we sent to your email</p>
      
      <form onSubmit={handleVerifyOtp} className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="border rounded w-12 h-12 text-center text-lg"
              required
            />
          ))}
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 rounded w-full max-w-xs">
          Confirm
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
      <button
        type="button"
        className="mt-4 text-blue-500"
        onClick={handleSendCodeAgain}
        disabled={countdown > 0} // ปุ่มจะ disable ขณะนับถอยหลัง
      >
        {countdown > 0 ? `Send code again in ${countdown}s` : 'Send code again'}
      </button>
    </div>
  </div>
  );
}

export default VerifyOtp;
