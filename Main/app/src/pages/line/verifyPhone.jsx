import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const PhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3001/user/request-otp', { phone_number: phoneNumber });
          const token = response.data.token; // สมมุติว่า token ได้มาจาก response
          setMessage('OTP has been sent to your phone.');

          // ส่งผู้ใช้ไปยัง VerifyOTPPage พร้อมกับส่ง token ไปด้วย
          navigate('/checkOtp', { state: { token , phoneNumber } });
      } catch (error) {
          setMessage('Error: ' + error.response?.data?.errors[0]?.msg || 'Something went wrong.');
      }
  };
            const handleChange = (e) => {
              const value = e.target.value;
              // ตรวจสอบว่ามีแต่ตัวเลขและไม่เกิน 10 ตัว
              if (/^\d{0,10}$/.test(value)) {
                setPhoneNumber(value);
              }
             
  };
          const handleVerifyEmail = () => {
          navigate('/verifyEmail'); // เปลี่ยน path ไปยังหน้า verify email ตามที่ต้องการ
           };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button
        onClick={handleVerifyEmail}
        className="absolute top-2 right-2"
      >
        <img
          src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
          alt="Verify Email"
          className="h-8 w-8"
        />
      </button>
      <div className="flex justify-center mb-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s"
          alt="Logo"
          className="h-50"
        />
      </div>
      <h1 className="text-center text-l font-bold mb-2">CHEE CHAN GOLF RESORT</h1>
      <h2 className="text-center text-ls font-semibold mb-4">Enter your phone number</h2>
      <p className="text-center text-sm mb-6 text-gray-500">We will send an OTP Verification to you.</p>
      <form onSubmit={handleRequestOTP} className="flex flex-col">
        <input
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-3 mb-4 rounded-md focus:outline-none focus:border-green-500"
        />
        <button type="submit" className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition">
          Request OTP
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  </div>
  );
};


export default PhoneNumberForm;
