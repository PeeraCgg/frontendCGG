
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/checkProfile'); // นำทางไปยังหน้าอื่น เช่น หน้า Home
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      {/* Container for image and content */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg bg-white shadow-md rounded-lg p-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWALG5llGqOBpVrtqnUc7_rlmEBJ-_BaDsow&s"
          alt="Chee Chan Golf Resort Logo"
          className="w-24 sm:w-28 md:w-32 lg:w-36 mx-auto mb-4"
        />
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Welcome to Chee Chan Golf
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-6">
          Become our member to receive special privileges.
        </p>
        
        {/* Button with link */}
        
          <button 
          onClick={handleClick} 
          className="bg-green-700 text-white py-2 px-4 rounded-full w-full hover:bg-green-600" >
            Let's go
          </button>
        
      </div>
    </div>
  );
};

export default WelcomePage;
