import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getEmailFromLocalStorage } from '../../utils/localStorageUtils';

const EditProfile = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        phonenumber: '',
        birthdate: '',
        email: '',
        startPrivilegeDate: ''
    });

    const navigate = useNavigate();
    const email = getEmailFromLocalStorage(); // ดึง email จาก Local Storage

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (email) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/get-profile`, { email });
                    if (response.data.success) {
                        setUserData(response.data.user); // ตั้งค่า userData จากข้อมูลในฐานข้อมูล
                    } else {
                        console.error(response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            } else {
                console.error('No email found in local storage');
            }
        };
        
        fetchUserProfile();
    }, [email]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/update-profile`, userData);
            if (response.data.success) {
                console.log(response.data.message);
                navigate('/profilePage');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        navigate('/profilePage'); // ย้อนกลับไปหน้าข้อมูลโปรไฟล์โดยไม่บันทึกการเปลี่ยนแปลง
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <p className="mb-6">Update your details below</p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Full Name:</label>
                        <input
                            type="text"
                            name="fullname"
                            value={userData.fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone Number:</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={userData.phonenumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            readOnly

                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Start Privilege Date:</label>
                        <input
                            type="text"
                            name="startPrivilegeDate"
                            value={userData.startPrivilegeDate ? userData.startPrivilegeDate.split('T')[0] : ''}
                            readOnly
                            className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Birth Date:</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={userData.birthdate ? userData.birthdate.split('T')[0] : ''}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Done
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default EditProfile;
