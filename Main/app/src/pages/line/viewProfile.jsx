import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const handleViewProfile = () => {
    navigate('/profilePage'); // เปลี่ยนเส้นทางไปยังหน้า "/profile"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* White Box Container */}
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s"
            alt="Chee Chan Golf Resort Logo" 
            className="h-20" 
          />
        </div>

        {/* Congratulation Message */}
        <h1 className="text-xl font-bold text-green-600 mb-2">Congratulation!</h1>
        <p className="text-gray-600 mb-8">Privilege registration successfully done.</p>

        {/* View Profile Button */}
        <button 
          onClick={handleViewProfile}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
