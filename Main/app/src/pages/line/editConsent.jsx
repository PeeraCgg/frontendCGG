import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromLocalStorage, saveEmailToLocalStorage } from '../../utils/localStorageUtils';

const EditConsent = () => {
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const emailFromStorage = getEmailFromLocalStorage();
        if (emailFromStorage) {
            checkExistingConsent(emailFromStorage); // ตรวจสอบ consent
        } else {
            alert('No email provided');
            navigate('/');
        }
    }, [navigate]);

    // ตรวจสอบว่ามี consent PDPA ในฐานข้อมูลอยู่แล้วหรือไม่
    const checkExistingConsent = async (email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/check-consent`, { email });
            if (response.data.success && response.data.consent) {
                setCheckbox1(response.data.consent.checkbox1);
                setCheckbox2(response.data.consent.checkbox2);
            }
        } catch (error) {
            console.error('Error checking consent:', error);
            alert('Failed to load consent information.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkbox1 || !checkbox2) {
            alert('Please check both conditions to proceed.');
            return;
        }

        const email = getEmailFromLocalStorage();

        if (!email) {
            alert('Email is required.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/saveConsent`, {
                email,
                checkbox1,
                checkbox2,
            });

            if (response.status === 201) {
                saveEmailToLocalStorage(email); // Save email to Local Storage
                navigate('/profilePage');
            } else {
                alert(response.data.message || 'Failed to save consent.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Backend returned status:', error.response.status);
                alert(error.response.data.message || 'An error occurred.');
            } else {
                console.error('Network or unexpected error:', error);
                alert('Failed to connect to the server. Please try again later.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Consent PDPA</h2>
                <p className="text-gray-600 mb-4">Please review and accept the conditions.</p>
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
                            onClick={() => navigate('/profilePage')}
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

export default EditConsent;
