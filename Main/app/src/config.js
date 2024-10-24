const config = {

apiPath: 'http://localhost:3001',
headers: ()=> {
return{
    headers :{
        Authorization: localStorage.getItem('token') // ต้องตั้งค่าให้ตรงกับ token ใน sign in
    } // const token = req.headers['authorization']; เชื่อมกับไฟล์ usercontroller function checkSingIn ,getUserId
}


}

}

export default config


import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate }from 'react-router-dom';

const VerifyOTPPage = () => {
    const [otpCode, setOtpCode] = useState();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // รับ token จาก state ที่ส่งมาจาก RequestOTPPage
    const location = useLocation();
    const token = location.state?.token || ''; // ถ้าไม่มี token ให้ใช้ค่าเป็น '' (ว่าง)

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user/verify-otp', { token, otp_code: otpCode });
            const data = response.data; 
            setMessage('OTP verified successfully.');

            // นำทางไปหน้าอื่นเมื่อ OTP ยืนยันถูกต้อง
            navigate('/checkprofile');

        } catch (error) {
            setMessage('Error: ' + error.response?.data?.errors[0]?.msg || 'Verification failed.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
            <form onSubmit={handleVerifyOTP} className="flex flex-col">
                <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter OTP"
                    className="border p-2 mb-4"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Verify OTP</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default VerifyOTPPage;
