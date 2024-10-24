import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '','','']); // สร้าง state สำหรับช่อง OTP ทั้ง 4 ช่อง
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // รับ token จาก state ที่ส่งมาจาก RequestOTPPage
    const location = useLocation();
    const token = location.state?.token || ''; // ถ้าไม่มี token ให้ใช้ค่าเป็น '' (ว่าง)

    // ฟังก์ชันจัดการการเปลี่ยนค่าในช่อง OTP
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') { // ตรวจสอบว่าค่าที่กรอกเป็นตัวเลข
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // เลื่อนไปช่องถัดไปถ้ายังไม่ใช่ช่องสุดท้าย
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpCode = otp.join(''); // รวมค่าในช่อง OTP เป็น string เดียว
        try {
            const response = await axios.post('http://localhost:3001/user/verify-otp', { token, otp_code: otpCode });
            const data = response.data; 
            setMessage('OTP verified successfully.');

            // นำทางไปหน้าอื่นเมื่อ OTP ยืนยันถูกต้อง
            navigate('/checkprofile');

        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.errors[0]?.msg || 'Verification failed.'));
        }
    };

    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s" alt="Logo" className="mb-6 mx-auto" /> 
          <h1 className="text-2xl font-bold mb-4 text-center">Confirm your code</h1>
          <p className="text-gray-600 mb-6 text-center">Enter the code we sent to the number ending XXXX</p>
          <form onSubmit={handleVerifyOTP} className="flex flex-col items-center">
              <div className="flex space-x-2 mb-4">
                  {otp.map((value, index) => (
                      <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={value}
                          onChange={(e) => handleChange(e, index)}
                          className="border rounded w-12 h-12 text-center text-lg"
                      />
                  ))}
              </div>
              <button type="submit" className="bg-green-500 text-white p-2 rounded w-full max-w-xs">Confirm</button>
          </form>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
          <button className="mt-4 text-blue-500 w-full max-w-xs mx-auto">Send code again</button> 
      </div>
  </div>
  
  
    );
};

export default VerifyOTPPage;
