import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromLocalStorage , saveEmailToLocalStorage } from '../../utils/localStorageUtils';
const ConsentForm = () => {
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // เมื่อหน้าโหลด เราจะตั้งค่า mobile จาก state ที่ถูกส่งมา
    useEffect(() => {
        // ดึง email จาก Local Storage
        const emailFromStorage = getEmailFromLocalStorage();
        if (emailFromStorage) {
            setEmail(emailFromStorage);
        } else {
            alert('No email provided');
            navigate('/');
        }

        // ดึง mobile จาก state หรือ Local Storage
        const mobileFromState = location.state?.mobile;
        if (mobileFromState) {
            setMobile(mobileFromState);
        } else {
            alert('No phone number provided');
            navigate('/');
        }
    }, [location, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // ตรวจสอบว่ามีอย่างน้อยหนึ่งใน checkbox ถูกเลือก
        if (!checkbox1 || !checkbox2) {
            alert('Please check both conditions to proceed.');
            return;
        }
    
        // ตรวจสอบว่ามี mobile หรือ email อย่างน้อยหนึ่งค่า
        if (!mobile && !email) {
            alert('Either mobile number or email is required.');
            return;
        }
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/saveConsent`, {
                mobile,
                email,
                checkbox1,
                checkbox2,
            });
    
            if (response.status === 201) {
                  // Save email to Local Storage for next page usage
                saveEmailToLocalStorage(email);
                navigate('/viewProfile', { state: { mobile } });
            } else {
                alert(response.data.message || 'Failed to save consent.');
            }
        } catch (error) {
            if (error.response) {
                // จัดการกับข้อผิดพลาดจาก backend
                console.error('Backend returned status:', error.response.status);
                alert(error.response.data.message || 'An error occurred.');
            } else {
                // จัดการกับข้อผิดพลาดที่ไม่ใช่การตอบกลับจาก backend (เช่น ปัญหาเครือข่าย)
                console.error('Network or unexpected error:', error);
                alert('Failed to connect to the server. Please try again later.');
            }
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Consent PDPA</h2>
                <p className="text-gray-600 mb-4">
                    Please review and accept the conditions.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checkbox1}
                                onChange={() => setCheckbox1(!checkbox1)}
                                className="form-checkbox text-green-500 h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">I agree to the first condition</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checkbox2}
                                onChange={() => setCheckbox2(!checkbox2)}
                                className="form-checkbox text-green-500 h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">I agree to the second condition</span>
                        </label>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded ${
                                checkbox1 && checkbox2 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
                            } text-white`}
                            disabled={!checkbox1 || !checkbox2}
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsentForm;
