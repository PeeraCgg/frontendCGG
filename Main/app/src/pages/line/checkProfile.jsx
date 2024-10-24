import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        mobile: '',
        birthdate: '',
        email: '',
    });
    const [isNewUser, setIsNewUser] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const syncUserData = async () => {
        if (!phoneNumber) return;

        try {
            const response = await axios.post('http://localhost:3001/user/getuser', { mobile: phoneNumber });

            if (response.data.success) {
                const user = response.data.user;
                setUserData({
                    ...user,
                    birthdate: formatDate(user.birthdate),
                });
                setIsNewUser(false);
                setMessage('');
            } else {
                handleNoUserFound();
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            showMessage('ไม่พบผู้ใช้งานในระบบกรุณากรอกข้อมูลด้วยครับ');
        }
    };

    const handleNoUserFound = () => {
        setUserData({
            name: '',
            surname: '',
            mobile: phoneNumber,
            birthdate: '',
            email: '',
        });
        setIsNewUser(true);
        showMessage('ไม่พบข้อมูล กรุณากรอกข้อมูลด้วยครับ');
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user/add-or-update', userData);
            if (response.data.success) {
                console.log(response.data.message);
                setIsNewUser(false);
                navigate('/checkPdpa',{ state: { mobile: userData.mobile } });
            } else {
                showMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        } catch (error) {
            console.error('Error updating or adding user:', error);
            showMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
            setUserData({ ...userData, mobile: value });
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put('http://localhost:3001/user/update', userData);
            if (response.data.success) {
                console.log(response.data.message);
                navigate('/checkPdpa');
            } else {
                showMessage('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            showMessage('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Please check your profile</h2>
                <p className="mb-6">Enter your details below</p>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="border rounded-l-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={syncUserData}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sync Data
                    </button>
                </div>
                {message && (
                    <div className="mb-4 text-red-500 bg-red-100 p-2 rounded-md">
                        {message}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={userData.surname}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="date"
                        name="birthdate"
                        value={userData.birthdate}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <div className="flex space-x-4">
                        {!isNewUser && (
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                Update Data
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
