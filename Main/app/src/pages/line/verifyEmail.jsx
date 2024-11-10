// RequestOtp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveEmailToLocalStorage } from '../../utils/localStorageUtils';
function RequestOtp() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/request-otp-e`, {
        email,
      });

      if (response.status === 200) {
        console.log("Otp sent successfully")
        // บันทึก email ไว้ใน Local Storage
        saveEmailToLocalStorage(email);

        
        // Navigate to verify OTP page and pass email as state
        navigate('/checkOtpEmail');
      } else {
        console.error('Error sending OTP request');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleVerifyphone = () => {
    navigate('/verifyPhone'); // เปลี่ยน path ไปยังหน้า verify email ตามที่ต้องการ
     };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative max-w-md w-full p-6 bg-white shadow-md rounded-lg text-center">
      <button
        onClick={handleVerifyphone}
        className="absolute top-2 right-2"
      >
        <img
          src="https://i.pinimg.com/736x/8e/01/60/8e016003420aea51e9646b6b3b8f4bc2.jpg"
          alt="Verify Email"
          className="h-8 w-8"
        />
      </button>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s" // Replace with the path to your logo
        alt="Logo"
        className="mx-auto mb-6 h-50"
        
      />
  
      <h1 className="text-2xl font-bold mb-2">CHEE CHAN GOLF RESORT</h1>
      <p className="text-gray-700 mb-4">Enter your email</p>
      <p className="text-sm text-gray-500 mb-6">We will send an OTP Verification to you.</p>
  
      <form onSubmit={handleRequestOtp} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Request OTP
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default RequestOtp;
